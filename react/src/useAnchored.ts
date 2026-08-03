import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

export type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface AnchorOptions {
  placement?: Placement;
  /** Gap between anchor and popover, px. */
  offset?: number;
  /** Popover is at least as wide as the anchor — what a select needs to look like one control. */
  matchWidth?: boolean;
}

export interface Anchored<A extends HTMLElement, F extends HTMLElement> {
  anchorRef: React.RefObject<A>;
  floatRef: React.RefObject<F>;
  style: CSSProperties;
}

const EDGE = 8;

/** Marks a popover as belonging to the kit, so `Modal` can keep it inside its focus trap. */
export const PORTAL_ROOT_ATTR = 'data-lzt-portal-root';

function compute(
  anchor: DOMRect,
  float: { width: number; height: number },
  { placement = 'bottom-start', offset = 6, matchWidth }: AnchorOptions,
): CSSProperties {
  const wantsTop = placement.startsWith('top');
  const spaceBelow = window.innerHeight - anchor.bottom;
  const spaceAbove = anchor.top;
  const needed = float.height + offset + EDGE;
  const onTop = wantsTop
    ? !(spaceAbove < needed && spaceBelow > spaceAbove)
    : spaceBelow < needed && spaceAbove > spaceBelow;

  const top = onTop ? anchor.top - float.height - offset : anchor.bottom + offset;
  const width = Math.max(float.width, matchWidth ? anchor.width : 0);
  const rawLeft = placement.endsWith('end') ? anchor.right - width : anchor.left;
  const left = Math.min(Math.max(rawLeft, EDGE), Math.max(EDGE, window.innerWidth - width - EDGE));

  return {
    position: 'fixed',
    top: Math.min(Math.max(top, EDGE), Math.max(EDGE, window.innerHeight - float.height - EDGE)),
    left,
    ...(matchWidth ? { minWidth: anchor.width } : null),
  };
}

function sameRect(a: DOMRect | null, b: DOMRect): boolean {
  return (
    a !== null && a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height
  );
}

/** Positions a popover portalled to `document.body`, in viewport coordinates.
 *
 * The rect is re-read every frame, not just on scroll and resize: canvas zoom moves the anchor
 * through a `transform` and fires neither event.
 */
export function useAnchored<A extends HTMLElement = HTMLElement, F extends HTMLElement = HTMLElement>(
  open: boolean,
  opts: AnchorOptions = {},
): Anchored<A, F> {
  const anchorRef = useRef<A>(null);
  const floatRef = useRef<F>(null);
  const lastRect = useRef<DOMRect | null>(null);
  const [style, setStyle] = useState<CSSProperties>({ position: 'fixed', top: -9999, left: -9999 });

  const { placement, offset, matchWidth } = opts;
  const update = useCallback(
    (force = false) => {
      const anchor = anchorRef.current;
      const float = floatRef.current;
      if (!anchor || !float) return;
      const rect = anchor.getBoundingClientRect();
      if (!force && sameRect(lastRect.current, rect)) return;
      lastRect.current = rect;
      setStyle(compute(rect, { width: float.offsetWidth, height: float.offsetHeight }, { placement, offset, matchWidth }));
    },
    [placement, offset, matchWidth],
  );

  useLayoutEffect(() => {
    if (!open) {
      lastRect.current = null;
      return;
    }
    update(true);
  }, [open, update]);

  useEffect(() => {
    if (!open) return;
    let frame = requestAnimationFrame(function tick() {
      update();
      frame = requestAnimationFrame(tick);
    });
    const onViewportChange = () => update(true);
    // Capture phase: a scroll inside a nested container does not bubble to window.
    window.addEventListener('scroll', onViewportChange, true);
    window.addEventListener('resize', onViewportChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onViewportChange, true);
      window.removeEventListener('resize', onViewportChange);
    };
  }, [open, update]);

  return { anchorRef, floatRef, style };
}
