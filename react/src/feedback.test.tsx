import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Modal } from './feedback';
import { Select } from './Select';

const handMounted: HTMLElement[] = [];

function mountPortal(): HTMLElement {
  const portal = document.createElement('div');
  portal.setAttribute('data-lzt-portal-root', '');
  portal.innerHTML = '<button type="button">пункт списка</button>';
  document.body.appendChild(portal);
  handMounted.push(portal);
  return portal;
}

// Only what this file mounted by hand: a blanket sweep of the attribute also tears out portals
// React owns, and React then fails to unmount them.
afterEach(() => {
  handMounted.splice(0).forEach((node) => node.remove());
});

describe('Modal focus trap with portalled popovers', () => {
  it('keeps Tab inside the modal when no popover is open', async () => {
    render(
      <Modal open onClose={vi.fn()} title="Настройки">
        <button type="button">первая</button>
        <button type="button">вторая</button>
      </Modal>,
    );

    await userEvent.tab();
    await userEvent.tab();
    expect(document.activeElement).toBe(screen.getByText('вторая'));

    await userEvent.tab();
    expect(document.activeElement).toBe(screen.getByText('первая'));
  });

  it('lets Tab reach a popover rendered outside the modal subtree', async () => {
    render(
      <Modal open onClose={vi.fn()} title="Настройки">
        <button type="button">первая</button>
      </Modal>,
    );
    mountPortal();

    await userEvent.tab();
    expect(document.activeElement).toBe(screen.getByText('первая'));

    await userEvent.tab();
    expect(document.activeElement).toBe(screen.getByText('пункт списка'));
  });

  it('leaves Escape to an open Select instead of closing the modal under it', async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Настройки">
        <Select
          options={[
            { value: 'a', label: 'первый' },
            { value: 'b', label: 'второй' },
          ]}
          value="a"
          onChange={vi.fn()}
        />
      </Modal>,
    );

    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeNull();

    await userEvent.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).toBeNull();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on Escape when a popover elsewhere on the page is open', async () => {
    // The old rule was "any portal in the document owns Escape" — a dropdown in a different corner
    // of the page made this modal impossible to dismiss with the keyboard.
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Настройки">
        <button type="button">первая</button>
      </Modal>,
    );
    mountPortal();

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('still closes on Escape once the popover is gone', async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Настройки">
        <button type="button">первая</button>
      </Modal>,
    );

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });
});
