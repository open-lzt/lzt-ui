import { useCallback, useRef, useState, type ComponentPropsWithoutRef, type KeyboardEvent, type PointerEvent } from 'react';
import { cx } from './cx';

export interface SliderProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
}

function quantise(raw: number, min: number, max: number, step: number): number {
  const clamped = Math.min(max, Math.max(min, raw));
  const snapped = min + Math.round((clamped - min) / step) * step;
  // step is often fractional; the rounding keeps 0.30000000000000004 out of the value.
  const decimals = (String(step).split('.')[1] ?? '').length;
  return Number(Math.min(max, Math.max(min, snapped)).toFixed(decimals));
}

export function Slider({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit,
  disabled,
  readOnly,
  name,
  className,
  id,
  ...props
}: SliderProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? min);
  const current = quantise(value ?? uncontrolled, min, max, step);
  const trackRef = useRef<HTMLDivElement>(null);

  const commit = useCallback(
    (next: number) => {
      if (disabled || readOnly) return;
      const snapped = quantise(next, min, max, step);
      if (snapped === current) return;
      if (value === undefined) setUncontrolled(snapped);
      onChange?.(snapped);
    },
    [current, disabled, max, min, onChange, readOnly, step, value],
  );

  const fromPointer = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return;
    commit(min + ((clientX - rect.left) / rect.width) * (max - min));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled || readOnly) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    fromPointer(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    fromPointer(e.clientX);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const big = Math.max(step, (max - min) / 10);
    const moves: Record<string, number> = {
      ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step,
      PageDown: -big, PageUp: big,
    };
    if (e.key in moves) {
      e.preventDefault();
      commit(current + moves[e.key]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      commit(min);
    } else if (e.key === 'End') {
      e.preventDefault();
      commit(max);
    }
  };

  const filled = max === min ? 0 : ((current - min) / (max - min)) * 100;

  return (
    <div className={cx('lzt-slider', disabled && 'is-disabled', className)} {...props}>
      <div
        ref={trackRef}
        role="slider"
        id={id}
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-valuetext={unit ? `${current} ${unit}` : undefined}
        aria-disabled={disabled || undefined}
        aria-readonly={readOnly || undefined}
        className="lzt-slider__track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
      >
        <div className="lzt-slider__fill" style={{ width: `${filled}%` }} />
        <div className="lzt-slider__thumb" style={{ left: `${filled}%` }} />
      </div>
      <span className="lzt-slider__value">
        {current}
        {unit ? <span className="lzt-slider__unit">{unit}</span> : null}
      </span>
      {name ? <input type="hidden" name={name} value={current} readOnly /> : null}
    </div>
  );
}
