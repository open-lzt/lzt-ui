import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker, DateTimePicker } from './DatePicker';

const input = () => screen.getByRole('textbox');
const openButton = () => screen.getByRole('button', { name: 'Открыть календарь' });

describe('DatePicker', () => {
  it('typing a date and blurring commits it as ISO', async () => {
    const onChange = vi.fn();
    render(<DatePicker onChange={onChange} />);
    await userEvent.type(input(), '01.02.2026');
    await userEvent.tab();
    expect(onChange).toHaveBeenCalledWith('2026-02-01');
  });

  it('Enter in the field commits the same as blur', async () => {
    const onChange = vi.fn();
    render(<DatePicker onChange={onChange} />);
    await userEvent.type(input(), '01.02.2026{Enter}');
    expect(onChange).toHaveBeenCalledWith('2026-02-01');
  });

  it('garbage input does not call onChange and does not crash', async () => {
    const onChange = vi.fn();
    render(<DatePicker onChange={onChange} />);
    await userEvent.type(input(), 'not a date');
    await userEvent.tab();
    expect(onChange).not.toHaveBeenCalled();
    expect(input()).toBeTruthy();
  });

  it('an emptied field commits an empty string', async () => {
    const onChange = vi.fn();
    render(<DatePicker defaultValue="2026-02-01" onChange={onChange} />);
    await userEvent.clear(input());
    await userEvent.tab();
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('opens the calendar on button click, and picking a day closes it and fires onChange', async () => {
    const onChange = vi.fn();
    render(<DatePicker defaultValue="2026-03-10" onChange={onChange} />);
    await userEvent.click(openButton());
    expect(screen.getByRole('grid')).toBeTruthy();

    await userEvent.click(screen.getByText('15').closest('button')!);
    expect(onChange).toHaveBeenCalledWith('2026-03-15');
    expect(screen.queryByRole('grid')).toBeNull();
  });

  it('carries the ISO value in a hidden input by name', () => {
    render(<DatePicker name="birthday" defaultValue="2026-02-01" />);
    expect(document.querySelector<HTMLInputElement>('input[name="birthday"]')?.value).toBe('2026-02-01');
  });
});

describe('DateTimePicker', () => {
  it('picking a date while time is empty yields date + midnight', async () => {
    const onChange = vi.fn();
    render(<DateTimePicker defaultValue="2026-03-01" onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Открыть календарь' }));
    await userEvent.click(screen.getByText('10').closest('button')!);
    const calls = onChange.mock.calls;
    expect(calls[calls.length - 1]?.[0]).toMatch(/^\d{4}-\d{2}-\d{2}T00:00$/);
  });

  it('changing the time keeps the already-picked date', async () => {
    const onChange = vi.fn();
    render(<DateTimePicker defaultValue="2026-02-01T00:00" onChange={onChange} />);
    const timeInput = document.querySelector<HTMLInputElement>('input[type="time"]')!;
    fireEvent.change(timeInput, { target: { value: '14:30' } });
    expect(onChange).toHaveBeenLastCalledWith('2026-02-01T14:30');
  });
});
