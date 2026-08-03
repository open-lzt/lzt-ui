import { useCallback, useEffect, useId, useRef, useState, type ComponentPropsWithoutRef } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, fromIso, type CalendarProps } from './Calendar';
import { cx } from './cx';
import { PORTAL_ROOT_ATTR, useAnchored } from './useAnchored';

export interface DatePickerProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'>,
    Pick<CalendarProps, 'min' | 'max' | 'weekStart' | 'locale'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  name?: string;
}

export interface DateTimePickerProps extends DatePickerProps {
  /** Seconds; 60 keeps the time field at minutes. */
  step?: number;
}

function splitDateTime(value: string): [string, string] {
  const [date = '', time = ''] = value.split('T');
  return [date, time];
}

function usePopover(open: boolean) {
  return useAnchored<HTMLDivElement, HTMLDivElement>(open, { matchWidth: false });
}

export function DatePicker({
  value, defaultValue, onChange, placeholder = 'дд.мм.гггг',
  disabled, readOnly, required, invalid, name,
  min, max, weekStart, locale, className, id, ...props
}: DatePickerProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '');
  const current = value ?? uncontrolled;
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState<string | null>(null);
  const popId = useId();
  const { anchorRef, floatRef, style } = usePopover(open);

  const commit = useCallback(
    (next: string) => {
      if (readOnly) return;
      if (value === undefined) setUncontrolled(next);
      onChange?.(next);
    },
    [onChange, readOnly, value],
  );

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (anchorRef.current?.contains(target) || floatRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [anchorRef, floatRef, open]);

  const text = typing ?? (current ? current.split('-').reverse().join('.') : '');

  const acceptTyped = (raw: string) => {
    setTyping(null);
    if (raw.trim() === '') return commit('');
    const match = /^(\d{2})[.\-/](\d{2})[.\-/](\d{4})$/.exec(raw.trim());
    if (!match) return;
    const iso = `${match[3]}-${match[2]}-${match[1]}`;
    if (fromIso(iso)) commit(iso);
  };

  return (
    <div ref={anchorRef} className={cx('lzt-datefield', className)} {...props}>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        className={cx('lzt-input', invalid && 'lzt-input--invalid')}
        value={text}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-invalid={invalid || undefined}
        aria-expanded={open}
        aria-controls={open ? popId : undefined}
        onChange={(e) => setTyping(e.target.value)}
        onBlur={(e) => acceptTyped(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') acceptTyped(e.currentTarget.value);
        }}
      />
      <button
        type="button"
        className="lzt-datefield__open"
        aria-label="Открыть календарь"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      />
      {name ? <input type="hidden" name={name} value={current} readOnly /> : null}

      {open
        ? createPortal(
            <div {...{ [PORTAL_ROOT_ATTR]: '' }} id={popId} ref={floatRef} style={style} className="lzt-datepop">
              <Calendar
                value={current}
                onChange={(next) => {
                  commit(next);
                  setOpen(false);
                }}
                min={min}
                max={max}
                weekStart={weekStart}
                locale={locale}
              />
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

export function DateTimePicker({ value, defaultValue, onChange, step = 60, ...rest }: DateTimePickerProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '');
  const current = value ?? uncontrolled;
  const [date, time] = splitDateTime(current);
  const timeRef = useRef<HTMLInputElement>(null);

  const emit = (nextDate: string, nextTime: string) => {
    const joined = nextDate ? `${nextDate}T${nextTime || '00:00'}` : '';
    if (value === undefined) setUncontrolled(joined);
    onChange?.(joined);
  };

  return (
    <div className="lzt-datetime">
      <DatePicker {...rest} value={date} onChange={(next) => emit(next, time)} />
      <input
        ref={timeRef}
        type="time"
        step={step}
        className="lzt-input lzt-datetime__time"
        value={time}
        disabled={rest.disabled}
        readOnly={rest.readOnly}
        onChange={(e) => emit(date, e.target.value)}
      />
    </div>
  );
}
