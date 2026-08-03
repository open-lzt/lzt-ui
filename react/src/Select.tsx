import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from './cx';
import { PORTAL_ROOT_ATTR, useAnchored } from './useAnchored';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'button'>, 'value' | 'onChange' | 'defaultValue'> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  name?: string;
  size?: 'sm' | 'md';
}

const TYPEAHEAD_RESET_MS = 700;

function labelToText(label: ReactNode): string {
  return typeof label === 'string' ? label : '';
}

/** Own listbox: a native `<select>` hands its open list to the OS, which no CSS reaches. */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    options,
    value,
    defaultValue,
    onChange,
    placeholder = 'выберите…',
    disabled,
    readOnly,
    required,
    invalid,
    name,
    size = 'md',
    className,
    id,
    ...props
  },
  ref,
) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '');
  const current = value ?? uncontrolled;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const hiddenRef = useRef<HTMLInputElement>(null);
  const typed = useRef({ text: '', at: 0 });

  const { anchorRef: triggerRef, floatRef, style } = useAnchored<HTMLButtonElement, HTMLDivElement>(
    open,
    { matchWidth: true },
  );
  useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement, [triggerRef]);

  const empty = options.length === 0;
  const selected = options.find((o) => o.value === current) ?? null;

  const commit = useCallback(
    (next: string) => {
      if (readOnly) return;
      if (value === undefined) setUncontrolled(next);
      onChange?.(next);
    },
    [onChange, readOnly, value],
  );

  // Form reset writes the hidden input directly; without this the visible control disagrees with it.
  useEffect(() => {
    const input = hiddenRef.current;
    const form = input?.form;
    if (!input || !form) return;
    const onReset = () => {
      const fallback = defaultValue ?? '';
      if (value === undefined) setUncontrolled(fallback);
      onChange?.(fallback);
    };
    form.addEventListener('reset', onReset);
    return () => form.removeEventListener('reset', onReset);
  }, [defaultValue, onChange, value]);

  const openList = useCallback(() => {
    if (disabled || empty) return;
    const at = options.findIndex((o) => o.value === current);
    setActive(at >= 0 ? at : 0);
    setOpen(true);
  }, [current, disabled, empty, options]);

  const close = useCallback((focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (from: number, direction: 1 | -1) => {
      for (let i = 1; i <= options.length; i += 1) {
        const at = (from + direction * i + options.length * i) % options.length;
        if (!options[at]?.disabled) return at;
      }
      return from;
    },
    [options],
  );

  const typeahead = useCallback(
    (char: string) => {
      const now = Date.now();
      typed.current = {
        text: now - typed.current.at > TYPEAHEAD_RESET_MS ? char : typed.current.text + char,
        at: now,
      };
      const needle = typed.current.text.toLowerCase();
      const at = options.findIndex(
        (o) => !o.disabled && labelToText(o.label).toLowerCase().startsWith(needle),
      );
      if (at >= 0) setActive(at);
    },
    [options],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'Tab':
        close(false);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (options[active] && !options[active].disabled) commit(options[active].value);
        close();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setActive((at) => step(at, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((at) => step(at, -1));
        break;
      case 'Home':
        e.preventDefault();
        setActive(step(-1, 1));
        break;
      case 'End':
        e.preventDefault();
        setActive(step(options.length, -1));
        break;
      default:
        if (e.key.length === 1) typeahead(e.key);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || floatRef.current?.contains(target)) return;
      setOpen(false);
    };
    // Escape belongs to the open list wherever the focus sits, and it stops here: a surrounding
    // modal listening on the document must not close the form because a dropdown was dismissed.
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [close, floatRef, open]);

  useEffect(() => {
    if (!open) return;
    const node = floatRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    // jsdom has no scrollIntoView; the kit must not require a polyfill from its consumers' tests.
    node?.scrollIntoView?.({ block: 'nearest' });
  }, [active, floatRef, open]);

  return (
    <>
      <button
        {...props}
        ref={triggerRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && options[active] ? `${listId}-${active}` : undefined}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-disabled={empty || undefined}
        disabled={disabled}
        className={cx(
          'lzt-select-btn',
          size === 'sm' && 'lzt-select-btn--sm',
          invalid && 'lzt-select-btn--invalid',
          open && 'is-open',
          className,
        )}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onKeyDown}
      >
        {/* Value with no matching option shows the placeholder and is NOT cleared. */}
        <span className={cx('lzt-select-btn__text', !selected && 'is-placeholder')}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="lzt-select-btn__caret" aria-hidden="true" />
      </button>

      {name ? <input ref={hiddenRef} type="hidden" name={name} value={current} readOnly /> : null}

      {open
        ? createPortal(
            <div {...{ [PORTAL_ROOT_ATTR]: '' }} className="lzt-select-pop" ref={floatRef} style={style}>
              <div id={listId} role="listbox" className="lzt-select-list" tabIndex={-1}>
                {options.map((option, index) => (
                  <div
                    key={option.value}
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={option.value === current}
                    aria-disabled={option.disabled || undefined}
                    data-active={index === active}
                    className={cx(
                      'lzt-select-opt',
                      index === active && 'is-active',
                      option.value === current && 'is-selected',
                      option.disabled && 'is-disabled',
                    )}
                    onPointerEnter={() => setActive(index)}
                    onClick={() => {
                      if (option.disabled) return;
                      commit(option.value);
                      close();
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
});
