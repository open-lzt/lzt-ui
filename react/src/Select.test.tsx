import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select, type SelectOption } from './Select';

const OPTIONS: SelectOption[] = [
  { value: 'steam', label: 'Steam' },
  { value: 'discord', label: 'Discord' },
  { value: 'roblox', label: 'Roblox', disabled: true },
  { value: 'telegram', label: 'Telegram' },
];

const trigger = () => screen.getByRole('combobox');

describe('Select', () => {
  it('opens on Enter and picks with Enter', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} onChange={onChange} />);

    trigger().focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeTruthy();

    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('discord');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('skips disabled options while walking', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} defaultValue="discord" onChange={onChange} />);

    trigger().focus();
    await userEvent.keyboard('{Enter}{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('telegram');
  });

  it('jumps to a match as you type', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} onChange={onChange} />);

    trigger().focus();
    await userEvent.keyboard('{Enter}tel{Enter}');
    expect(onChange).toHaveBeenCalledWith('telegram');
  });

  it('Home and End reach the ends, skipping a disabled edge', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} onChange={onChange} />);

    trigger().focus();
    await userEvent.keyboard('{Enter}{End}{Enter}');
    expect(onChange).toHaveBeenCalledWith('telegram');

    await userEvent.keyboard('{Enter}{Home}{Enter}');
    expect(onChange).toHaveBeenLastCalledWith('steam');
  });

  it('Escape closes and returns focus to the trigger', async () => {
    render(<Select options={OPTIONS} />);

    trigger().focus();
    await userEvent.keyboard('{Enter}{Escape}');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(document.activeElement).toBe(trigger());
  });

  it('shows the placeholder for a value no option carries, and keeps the value', () => {
    render(<Select options={OPTIONS} value="gone" placeholder="выберите…" name="cat" />);

    expect(trigger().textContent).toContain('выберите…');
    expect(document.querySelector<HTMLInputElement>('input[name="cat"]')?.value).toBe('gone');
  });

  it('does not open when there is nothing to choose', async () => {
    render(<Select options={[]} />);

    await userEvent.click(trigger());
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(trigger().getAttribute('aria-disabled')).toBe('true');
  });

  it('opens but refuses to change when readOnly', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} readOnly onChange={onChange} />);

    trigger().focus();
    await userEvent.keyboard('{Enter}{ArrowDown}{Enter}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('writes the hidden input a form would submit', async () => {
    render(<Select options={OPTIONS} name="category" defaultValue="steam" />);
    expect(document.querySelector<HTMLInputElement>('input[name="category"]')?.value).toBe('steam');

    trigger().focus();
    await userEvent.keyboard('{Enter}{ArrowDown}{Enter}');
    expect(document.querySelector<HTMLInputElement>('input[name="category"]')?.value).toBe('discord');
  });

  it('follows a form reset back to the default', async () => {
    const onChange = vi.fn();
    render(
      <form>
        <Select options={OPTIONS} name="category" defaultValue="steam" onChange={onChange} />
        <button type="reset">сброс</button>
      </form>,
    );

    trigger().focus();
    await userEvent.keyboard('{Enter}{ArrowDown}{Enter}');
    await userEvent.click(screen.getByText('сброс'));

    expect(document.querySelector<HTMLInputElement>('input[name="category"]')?.value).toBe('steam');
  });
});
