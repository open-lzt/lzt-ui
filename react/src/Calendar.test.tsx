import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Calendar, fromIso } from './Calendar';

const grid = () => screen.getByRole('grid');
const cursorCell = () => grid().querySelector<HTMLButtonElement>('[data-cursor="true"]')!;

describe('Calendar', () => {
  it('renders a 42-day grid with Monday first when weekStart=1', () => {
    render(<Calendar defaultValue="2026-02-15" weekStart={1} />);
    const cells = screen.getAllByRole('gridcell');
    expect(cells).toHaveLength(42);
    expect(cells[0].textContent).toBe('26');
  });

  it('ArrowLeft on the first of the month crosses into the previous month', async () => {
    render(<Calendar defaultValue="2026-03-01" />);
    cursorCell().focus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByText(/февраль 2026/i)).toBeTruthy();
  });

  it('PageUp/PageDown change month', async () => {
    render(<Calendar defaultValue="2026-03-15" weekStart={1} />);
    cursorCell().focus();
    await userEvent.keyboard('{PageUp}');
    expect(screen.getByText(/февраль 2026/i)).toBeTruthy();

    await userEvent.keyboard('{PageDown}');
    expect(screen.getByText(/март 2026/i)).toBeTruthy();
  });

  it('Home/End reach the edges of the cursor week', async () => {
    render(<Calendar defaultValue="2026-03-15" weekStart={1} />);
    cursorCell().focus();
    await userEvent.keyboard('{Home}');
    expect(cursorCell().textContent).toBe('9');

    await userEvent.keyboard('{End}');
    expect(cursorCell().textContent).toBe('15');
  });

  it('Enter picks the cursor day', async () => {
    const onChange = vi.fn();
    render(<Calendar defaultValue="2026-03-10" onChange={onChange} />);
    cursorCell().focus();
    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('2026-03-10');
  });

  it('renders a day past max as disabled and refuses to select it on click', async () => {
    const onChange = vi.fn();
    render(<Calendar defaultValue="2026-03-15" max="2026-03-20" onChange={onChange} />);
    const cell = screen
      .getAllByText('25')
      .map((el) => el.closest('button')!)
      .find((btn) => !btn.classList.contains('is-outside'))!;
    expect(cell.disabled).toBe(true);
    await userEvent.click(cell);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows the 29th of February in a leap year', () => {
    render(<Calendar defaultValue="2028-02-10" />);
    const cell = screen.getByText('29').closest('button')!;
    expect(cell.classList.contains('is-outside')).toBe(false);
  });

  it('fromIso parses as local time, not UTC', () => {
    const date = fromIso('2026-03-01');
    expect(date?.getDate()).toBe(1);
    expect(date?.getMonth()).toBe(2);
  });

  it('fromIso returns null for garbage and for a nonexistent date', () => {
    expect(fromIso('not-a-date')).toBeNull();
    expect(fromIso('2026-02-30')).toBeNull();
    expect(fromIso(undefined)).toBeNull();
  });
});
