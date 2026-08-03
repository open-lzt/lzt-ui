import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from './Slider';

const track = () => screen.getByRole('slider');

describe('Slider', () => {
  it('arrow keys move by step, PageUp/PageDown by the big step', async () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={50} min={0} max={100} step={5} onChange={onChange} />);
    track().focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenLastCalledWith(55);

    await userEvent.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenLastCalledWith(50);

    await userEvent.keyboard('{PageUp}');
    expect(onChange).toHaveBeenLastCalledWith(60);

    await userEvent.keyboard('{PageDown}');
    expect(onChange).toHaveBeenLastCalledWith(50);
  });

  it('Home and End jump to min and max', async () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={50} min={0} max={100} onChange={onChange} />);
    track().focus();

    await userEvent.keyboard('{End}');
    expect(onChange).toHaveBeenLastCalledWith(100);

    await userEvent.keyboard('{Home}');
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it('the value never leaves [min, max]', async () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={99} min={0} max={100} onChange={onChange} />);
    track().focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenLastCalledWith(100);

    const calls = onChange.mock.calls.length;
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange.mock.calls.length).toBe(calls);
    expect(track().getAttribute('aria-valuenow')).toBe('100');
  });

  it('a fractional step does not leave floating-point noise', async () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={0.2} min={0} max={1} step={0.1} onChange={onChange} />);
    track().focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenLastCalledWith(0.3);
  });

  it('readOnly blocks keyboard changes', async () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={50} readOnly onChange={onChange} />);
    track().focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disabled blocks keyboard changes', async () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={50} disabled onChange={onChange} />);
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).not.toHaveBeenCalled();
    expect(track().getAttribute('tabindex')).toBe('-1');
  });

  it('carries the current value in a hidden input by name', () => {
    render(<Slider defaultValue={42} name="volume" />);
    expect(document.querySelector<HTMLInputElement>('input[name="volume"]')?.value).toBe('42');
  });

  it('exposes aria-valuenow/min/max', () => {
    render(<Slider defaultValue={30} min={10} max={90} />);
    expect(track().getAttribute('aria-valuenow')).toBe('30');
    expect(track().getAttribute('aria-valuemin')).toBe('10');
    expect(track().getAttribute('aria-valuemax')).toBe('90');
  });
});
