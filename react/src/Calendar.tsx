import { useEffect, useMemo, useRef, useState, type ComponentPropsWithoutRef, type KeyboardEvent } from 'react';
import { cx } from './cx';

export interface CalendarProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  /** ISO 'YYYY-MM-DD'. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  min?: string;
  max?: string;
  weekStart?: 0 | 1;
  locale?: string;
}

export function toIso(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Local, not UTC: `new Date('2026-03-01')` parses as UTC and lands a day early west of Greenwich. */
export function fromIso(iso: string | undefined): Date | null {
  if (!iso) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return Number.isNaN(date.getTime()) || date.getMonth() !== Number(m) - 1 ? null : date;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/** Via the constructor, not milliseconds: a day that changes DST is 23 or 25 hours long, so a fixed
 *  86 400 000 ms lands back on the same date — the grid then renders that day twice and drops one. */
function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function outOfRange(date: Date, min?: string, max?: string): boolean {
  const iso = toIso(date);
  return (min !== undefined && iso < min) || (max !== undefined && iso > max);
}

function weekdayNames(locale: string, weekStart: 0 | 1): string[] {
  const format = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  // 2024-01-07 is a Sunday.
  return Array.from({ length: 7 }, (_, i) => format.format(new Date(2024, 0, 7 + i + weekStart)));
}

export function Calendar({
  value,
  defaultValue,
  onChange,
  min,
  max,
  weekStart = 1,
  locale = 'ru-RU',
  className,
  ...props
}: CalendarProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '');
  const current = value ?? uncontrolled;
  const selected = fromIso(current);
  const [cursor, setCursor] = useState<Date>(() => selected ?? new Date());
  const gridRef = useRef<HTMLDivElement>(null);
  const focusWanted = useRef(false);

  useEffect(() => {
    if (selected) setCursor((c) => (c.getMonth() === selected.getMonth() && c.getFullYear() === selected.getFullYear() ? c : selected));
  }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(cursor),
    [cursor, locale],
  );
  const weekdays = useMemo(() => weekdayNames(locale, weekStart), [locale, weekStart]);

  const days = useMemo(() => {
    const first = startOfMonth(cursor);
    const lead = (first.getDay() - weekStart + 7) % 7;
    const start = addDays(first, -lead);
    return Array.from({ length: 42 }, (_, i) => addDays(start, i));
  }, [cursor, weekStart]);

  const today = toIso(new Date());

  const pick = (date: Date) => {
    if (outOfRange(date, min, max)) return;
    const iso = toIso(date);
    if (value === undefined) setUncontrolled(iso);
    onChange?.(iso);
  };

  // A cursor outside min/max lands on a disabled button, which refuses focus — the focus falls to
  // the body and the grid, whose only tabbable cell is the cursor, can no longer be reached by
  // keyboard at all. So the cursor stops at the edge instead of stepping over it.
  const clamp = (date: Date): Date => {
    const lower = fromIso(min);
    const upper = fromIso(max);
    if (lower && date < lower) return lower;
    if (upper && date > upper) return upper;
    return date;
  };

  const moveCursor = (days_: number) => {
    focusWanted.current = true;
    setCursor((c) => clamp(addDays(c, days_)));
  };

  const moveMonth = (months: number) => {
    focusWanted.current = true;
    setCursor((c) =>
      clamp(new Date(c.getFullYear(), c.getMonth() + months, Math.min(c.getDate(), 28))),
    );
  };

  useEffect(() => {
    if (!focusWanted.current) return;
    focusWanted.current = false;
    gridRef.current?.querySelector<HTMLElement>('[data-cursor="true"]')?.focus();
  }, [cursor]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowLeft': e.preventDefault(); moveCursor(-1); break;
      case 'ArrowRight': e.preventDefault(); moveCursor(1); break;
      case 'ArrowUp': e.preventDefault(); moveCursor(-7); break;
      case 'ArrowDown': e.preventDefault(); moveCursor(7); break;
      case 'PageUp': e.preventDefault(); moveMonth(-1); break;
      case 'PageDown': e.preventDefault(); moveMonth(1); break;
      case 'Home': e.preventDefault(); moveCursor(-((cursor.getDay() - weekStart + 7) % 7)); break;
      case 'End': e.preventDefault(); moveCursor(6 - ((cursor.getDay() - weekStart + 7) % 7)); break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        pick(cursor);
        break;
      default:
    }
  };

  return (
    <div className={cx('lzt-cal', className)} {...props}>
      <div className="lzt-cal__head">
        <button type="button" className="lzt-cal__nav" aria-label="Предыдущий месяц" onClick={() => moveMonth(-1)}>
          ‹
        </button>
        <div className="lzt-cal__month" aria-live="polite">{monthLabel}</div>
        <button type="button" className="lzt-cal__nav" aria-label="Следующий месяц" onClick={() => moveMonth(1)}>
          ›
        </button>
      </div>

      <div className="lzt-cal__weekdays" aria-hidden="true">
        {weekdays.map((name) => (
          <span key={name} className="lzt-cal__weekday">{name}</span>
        ))}
      </div>

      <div ref={gridRef} role="grid" className="lzt-cal__grid" onKeyDown={onKeyDown}>
        {days.map((date) => {
          const iso = toIso(date);
          const isCursor = iso === toIso(cursor);
          const disabled = outOfRange(date, min, max);
          return (
            <button
              key={iso}
              type="button"
              role="gridcell"
              tabIndex={isCursor ? 0 : -1}
              data-cursor={isCursor}
              aria-selected={iso === current}
              aria-current={iso === today ? 'date' : undefined}
              disabled={disabled}
              className={cx(
                'lzt-cal__day',
                date.getMonth() !== cursor.getMonth() && 'is-outside',
                iso === current && 'is-selected',
                iso === today && 'is-today',
              )}
              onClick={() => { focusWanted.current = false; setCursor(date); pick(date); }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
