import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Modal } from './feedback';

/** Popovers (Select, DatePicker) render into document.body, so while a modal is open they sit
 * outside its subtree. The trap and the Escape handler have to know about them, or a dropdown
 * opened inside a modal becomes unreachable and Escape throws the whole form away. */
function mountPortal(): HTMLElement {
  const portal = document.createElement('div');
  portal.setAttribute('data-lzt-portal-root', '');
  portal.innerHTML = '<button type="button">пункт списка</button>';
  document.body.appendChild(portal);
  return portal;
}

afterEach(() => {
  document.querySelectorAll('[data-lzt-portal-root]').forEach((node) => node.remove());
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

  it('leaves Escape to the popover instead of closing the modal under it', async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Настройки">
        <button type="button">первая</button>
      </Modal>,
    );
    mountPortal();

    await userEvent.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
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
