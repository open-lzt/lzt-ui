// react/src/cx.ts
function cx(...values) {
  return values.filter(Boolean).join(" ");
}

// react/src/theme.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { jsx } from "react/jsx-runtime";
var STORAGE_KEY = "lzt-theme";
var ThemeContext = createContext(null);
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
function ThemeProvider({ children, defaultTheme = "dark" }) {
  const [theme, setThemeState] = useState(defaultTheme);
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = stored === "light" || stored === "dark" ? stored : defaultTheme;
    setThemeState(initial);
    applyTheme(initial);
  }, []);
  const setTheme = useCallback((next) => {
    setThemeState(next);
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);
  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, setTheme, toggle }, children });
}
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
function ThemeToggle({ className, type = "button", ...props }) {
  const { theme, toggle } = useTheme();
  return /* @__PURE__ */ jsx(
    "button",
    {
      type,
      className: cx("lzt-btn", "lzt-btn--ghost", className),
      onClick: toggle,
      "aria-label": "Toggle color theme",
      ...props,
      children: theme === "dark" ? "Dark" : "Light"
    }
  );
}

// react/src/primitives.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function makeBox(baseClass, displayName) {
  function Box({ className, ...props }) {
    return /* @__PURE__ */ jsx2("div", { className: cx(baseClass, className), ...props });
  }
  Box.displayName = displayName;
  return Box;
}
var Shell = makeBox("lzt-shell", "Shell");
var Container = makeBox("lzt-container", "Container");
var Main = makeBox("lzt-main", "Main");
var Stack = makeBox("lzt-stack", "Stack");
var Grid = makeBox("lzt-grid", "Grid");
var Spacer = makeBox("lzt-spacer", "Spacer");
function Row({ between, wrap, className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: cx("lzt-row", between && "lzt-row--between", wrap && "lzt-row--wrap", className),
      ...props
    }
  );
}
function Divider({ className, ...props }) {
  return /* @__PURE__ */ jsx2("hr", { className: cx("lzt-divider", className), ...props });
}

// react/src/Button.tsx
import { forwardRef } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var Button = forwardRef(function Button2({ variant = "default", size = "md", icon, block, loading, disabled, className, type = "button", children, ...props }, ref) {
  return /* @__PURE__ */ jsx3(
    "button",
    {
      ref,
      type,
      className: cx(
        "lzt-btn",
        variant !== "default" && `lzt-btn--${variant}`,
        size === "sm" && "lzt-btn--sm",
        size === "lg" && "lzt-btn--lg",
        icon && "lzt-btn--icon",
        block && "lzt-btn--block",
        loading && "is-loading",
        className
      ),
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      ...props,
      children
    }
  );
});
function ButtonGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx3("div", { className: cx("lzt-btn-group", className), ...props });
}

// react/src/Icon.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Icon({ name, size, className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "svg",
    {
      className: cx("lzt-icon", className),
      width: size,
      height: size,
      "aria-hidden": "true",
      ...props,
      children: /* @__PURE__ */ jsx4("use", { href: `#i-${name}` })
    }
  );
}

// react/src/forms.tsx
import { forwardRef as forwardRef2 } from "react";
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
function Field({ className, ...props }) {
  return /* @__PURE__ */ jsx5("div", { className: cx("lzt-field", className), ...props });
}
function Label({ className, ...props }) {
  return /* @__PURE__ */ jsx5("label", { className: cx("lzt-label", className), ...props });
}
function Hint({ error, className, ...props }) {
  return /* @__PURE__ */ jsx5("span", { className: cx("lzt-hint", error && "lzt-hint--error", className), ...props });
}
var Input = forwardRef2(function Input2({ size = "md", invalid, className, ...props }, ref) {
  return /* @__PURE__ */ jsx5(
    "input",
    {
      ref,
      className: cx("lzt-input", size === "sm" && "lzt-input--sm", invalid && "lzt-input--invalid", className),
      "aria-invalid": invalid || void 0,
      ...props
    }
  );
});
var Textarea = forwardRef2(function Textarea2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx5("textarea", { ref, className: cx("lzt-textarea", className), ...props });
});
function Search({ className, ...props }) {
  return /* @__PURE__ */ jsxs("div", { className: "lzt-search", children: [
    /* @__PURE__ */ jsx5("span", { className: "lzt-search__icon", children: /* @__PURE__ */ jsx5(Icon, { name: "search", size: 14 }) }),
    /* @__PURE__ */ jsx5("input", { type: "search", className: cx("lzt-input", className), ...props })
  ] });
}
function Checkbox({ label, className, ...props }) {
  return /* @__PURE__ */ jsxs("label", { className: cx("lzt-check", className), children: [
    /* @__PURE__ */ jsx5("input", { type: "checkbox", ...props }),
    label
  ] });
}
function Radio({ label, className, ...props }) {
  return /* @__PURE__ */ jsxs("label", { className: cx("lzt-check", className), children: [
    /* @__PURE__ */ jsx5("input", { type: "radio", ...props }),
    label
  ] });
}
function Switch({ label, className, ...props }) {
  return /* @__PURE__ */ jsxs("label", { className: cx("lzt-switch", className), children: [
    /* @__PURE__ */ jsx5("input", { type: "checkbox", ...props }),
    label
  ] });
}

// react/src/useAnchored.ts
import { useCallback as useCallback2, useEffect as useEffect2, useLayoutEffect, useRef, useState as useState2 } from "react";
var EDGE = 8;
var PORTAL_ROOT_ATTR = "data-lzt-portal-root";
function compute(anchor, float, { placement = "bottom-start", offset = 6, matchWidth }) {
  const wantsTop = placement.startsWith("top");
  const spaceBelow = window.innerHeight - anchor.bottom;
  const spaceAbove = anchor.top;
  const needed = float.height + offset + EDGE;
  const onTop = wantsTop ? !(spaceAbove < needed && spaceBelow > spaceAbove) : spaceBelow < needed && spaceAbove > spaceBelow;
  const top = onTop ? anchor.top - float.height - offset : anchor.bottom + offset;
  const width = Math.max(float.width, matchWidth ? anchor.width : 0);
  const rawLeft = placement.endsWith("end") ? anchor.right - width : anchor.left;
  const left = Math.min(Math.max(rawLeft, EDGE), Math.max(EDGE, window.innerWidth - width - EDGE));
  return {
    position: "fixed",
    top: Math.min(Math.max(top, EDGE), Math.max(EDGE, window.innerHeight - float.height - EDGE)),
    left,
    ...matchWidth ? { minWidth: anchor.width } : null
  };
}
function sameRect(a, b) {
  return a !== null && a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height;
}
function useAnchored(open, opts = {}) {
  const anchorRef = useRef(null);
  const floatRef = useRef(null);
  const lastRect = useRef(null);
  const [style, setStyle] = useState2({ position: "fixed", top: -9999, left: -9999 });
  const { placement, offset, matchWidth } = opts;
  const update = useCallback2(
    (force = false) => {
      const anchor = anchorRef.current;
      const float = floatRef.current;
      if (!anchor || !float) return;
      const rect = anchor.getBoundingClientRect();
      if (!force && sameRect(lastRect.current, rect)) return;
      lastRect.current = rect;
      setStyle(compute(rect, { width: float.offsetWidth, height: float.offsetHeight }, { placement, offset, matchWidth }));
    },
    [placement, offset, matchWidth]
  );
  useLayoutEffect(() => {
    if (!open) {
      lastRect.current = null;
      return;
    }
    update(true);
  }, [open, update]);
  useEffect2(() => {
    if (!open) return;
    let frame = requestAnimationFrame(function tick() {
      update();
      frame = requestAnimationFrame(tick);
    });
    const onViewportChange = () => update(true);
    window.addEventListener("scroll", onViewportChange, true);
    window.addEventListener("resize", onViewportChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onViewportChange, true);
      window.removeEventListener("resize", onViewportChange);
    };
  }, [open, update]);
  return { anchorRef, floatRef, style };
}

// react/src/Select.tsx
import {
  forwardRef as forwardRef3,
  useCallback as useCallback3,
  useEffect as useEffect3,
  useId,
  useImperativeHandle,
  useRef as useRef2,
  useState as useState3
} from "react";
import { createPortal } from "react-dom";
import { Fragment, jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
var TYPEAHEAD_RESET_MS = 700;
function labelToText(label) {
  return typeof label === "string" ? label : "";
}
var Select = forwardRef3(function Select2({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "\u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435\u2026",
  disabled,
  readOnly,
  required,
  invalid,
  name,
  size = "md",
  className,
  id,
  ...props
}, ref) {
  const [uncontrolled, setUncontrolled] = useState3(defaultValue ?? "");
  const current = value ?? uncontrolled;
  const [open, setOpen] = useState3(false);
  const [active, setActive] = useState3(0);
  const listId = useId();
  const hiddenRef = useRef2(null);
  const typed = useRef2({ text: "", at: 0 });
  const { anchorRef: triggerRef, floatRef, style } = useAnchored(
    open,
    { matchWidth: true }
  );
  useImperativeHandle(ref, () => triggerRef.current, [triggerRef]);
  const empty = options.length === 0;
  const selected = options.find((o) => o.value === current) ?? null;
  const commit = useCallback3(
    (next) => {
      if (readOnly) return;
      if (value === void 0) setUncontrolled(next);
      onChange?.(next);
    },
    [onChange, readOnly, value]
  );
  useEffect3(() => {
    const input = hiddenRef.current;
    const form = input?.form;
    if (!input || !form) return;
    const onReset = () => {
      const fallback = defaultValue ?? "";
      if (value === void 0) setUncontrolled(fallback);
      onChange?.(fallback);
    };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [defaultValue, onChange, value]);
  const openList = useCallback3(() => {
    if (disabled || empty) return;
    const at = options.findIndex((o) => o.value === current);
    setActive(at >= 0 ? at : 0);
    setOpen(true);
  }, [current, disabled, empty, options]);
  const close = useCallback3((focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);
  const step = useCallback3(
    (from, direction) => {
      for (let i = 1; i <= options.length; i += 1) {
        const at = (from + direction * i + options.length * i) % options.length;
        if (!options[at]?.disabled) return at;
      }
      return from;
    },
    [options]
  );
  const typeahead = useCallback3(
    (char) => {
      const now = Date.now();
      typed.current = {
        text: now - typed.current.at > TYPEAHEAD_RESET_MS ? char : typed.current.text + char,
        at: now
      };
      const needle = typed.current.text.toLowerCase();
      const at = options.findIndex(
        (o) => !o.disabled && labelToText(o.label).toLowerCase().startsWith(needle)
      );
      if (at >= 0) setActive(at);
    },
    [options]
  );
  const onKeyDown = (e) => {
    if (disabled) return;
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (options[active] && !options[active].disabled) commit(options[active].value);
        close();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActive((at) => step(at, 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((at) => step(at, -1));
        break;
      case "Home":
        e.preventDefault();
        setActive(step(-1, 1));
        break;
      case "End":
        e.preventDefault();
        setActive(step(options.length, -1));
        break;
      default:
        if (e.key.length === 1) typeahead(e.key);
    }
  };
  useEffect3(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const target = e.target;
      if (triggerRef.current?.contains(target) || floatRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [floatRef, open]);
  useEffect3(() => {
    if (!open) return;
    const node = floatRef.current?.querySelector('[data-active="true"]');
    node?.scrollIntoView?.({ block: "nearest" });
  }, [active, floatRef, open]);
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsxs2(
      "button",
      {
        ...props,
        ref: triggerRef,
        type: "button",
        id,
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        "aria-controls": open ? listId : void 0,
        "aria-activedescendant": open && options[active] ? `${listId}-${active}` : void 0,
        "aria-required": required || void 0,
        "aria-invalid": invalid || void 0,
        "aria-disabled": empty || void 0,
        disabled,
        className: cx(
          "lzt-select-btn",
          size === "sm" && "lzt-select-btn--sm",
          invalid && "lzt-select-btn--invalid",
          open && "is-open",
          className
        ),
        onClick: () => open ? close() : openList(),
        onKeyDown,
        children: [
          /* @__PURE__ */ jsx6("span", { className: cx("lzt-select-btn__text", !selected && "is-placeholder"), children: selected ? selected.label : placeholder }),
          /* @__PURE__ */ jsx6("span", { className: "lzt-select-btn__caret", "aria-hidden": "true" })
        ]
      }
    ),
    name ? /* @__PURE__ */ jsx6("input", { ref: hiddenRef, type: "hidden", name, value: current, readOnly: true }) : null,
    open ? createPortal(
      /* @__PURE__ */ jsx6("div", { ...{ [PORTAL_ROOT_ATTR]: "" }, className: "lzt-select-pop", ref: floatRef, style, children: /* @__PURE__ */ jsx6("div", { id: listId, role: "listbox", className: "lzt-select-list", tabIndex: -1, children: options.map((option, index) => /* @__PURE__ */ jsx6(
        "div",
        {
          id: `${listId}-${index}`,
          role: "option",
          "aria-selected": option.value === current,
          "aria-disabled": option.disabled || void 0,
          "data-active": index === active,
          className: cx(
            "lzt-select-opt",
            index === active && "is-active",
            option.value === current && "is-selected",
            option.disabled && "is-disabled"
          ),
          onPointerEnter: () => setActive(index),
          onClick: () => {
            if (option.disabled) return;
            commit(option.value);
            close();
          },
          children: option.label
        },
        option.value
      )) }) }),
      document.body
    ) : null
  ] });
});

// react/src/Calendar.tsx
import { useEffect as useEffect4, useMemo, useRef as useRef3, useState as useState4 } from "react";
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var DAY = 864e5;
function toIso(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
function fromIso(iso) {
  if (!iso) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return Number.isNaN(date.getTime()) || date.getMonth() !== Number(m) - 1 ? null : date;
}
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function addDays(date, days) {
  return new Date(date.getTime() + days * DAY);
}
function outOfRange(date, min, max) {
  const iso = toIso(date);
  return min !== void 0 && iso < min || max !== void 0 && iso > max;
}
function weekdayNames(locale, weekStart) {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  return Array.from({ length: 7 }, (_, i) => format.format(new Date(2024, 0, 7 + i + weekStart)));
}
function Calendar({
  value,
  defaultValue,
  onChange,
  min,
  max,
  weekStart = 1,
  locale = "ru-RU",
  className,
  ...props
}) {
  const [uncontrolled, setUncontrolled] = useState4(defaultValue ?? "");
  const current = value ?? uncontrolled;
  const selected = fromIso(current);
  const [cursor, setCursor] = useState4(() => selected ?? /* @__PURE__ */ new Date());
  const gridRef = useRef3(null);
  const focusWanted = useRef3(false);
  useEffect4(() => {
    if (selected) setCursor((c) => c.getMonth() === selected.getMonth() && c.getFullYear() === selected.getFullYear() ? c : selected);
  }, [current]);
  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(cursor),
    [cursor, locale]
  );
  const weekdays = useMemo(() => weekdayNames(locale, weekStart), [locale, weekStart]);
  const days = useMemo(() => {
    const first = startOfMonth(cursor);
    const lead = (first.getDay() - weekStart + 7) % 7;
    const start = addDays(first, -lead);
    return Array.from({ length: 42 }, (_, i) => addDays(start, i));
  }, [cursor, weekStart]);
  const today = toIso(/* @__PURE__ */ new Date());
  const pick = (date) => {
    if (outOfRange(date, min, max)) return;
    const iso = toIso(date);
    if (value === void 0) setUncontrolled(iso);
    onChange?.(iso);
  };
  const moveCursor = (days_) => {
    focusWanted.current = true;
    setCursor((c) => addDays(c, days_));
  };
  const moveMonth = (months) => {
    focusWanted.current = true;
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + months, Math.min(c.getDate(), 28)));
  };
  useEffect4(() => {
    if (!focusWanted.current) return;
    focusWanted.current = false;
    gridRef.current?.querySelector('[data-cursor="true"]')?.focus();
  }, [cursor]);
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        moveCursor(-1);
        break;
      case "ArrowRight":
        e.preventDefault();
        moveCursor(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveCursor(-7);
        break;
      case "ArrowDown":
        e.preventDefault();
        moveCursor(7);
        break;
      case "PageUp":
        e.preventDefault();
        moveMonth(-1);
        break;
      case "PageDown":
        e.preventDefault();
        moveMonth(1);
        break;
      case "Home":
        e.preventDefault();
        moveCursor(-((cursor.getDay() - weekStart + 7) % 7));
        break;
      case "End":
        e.preventDefault();
        moveCursor(6 - (cursor.getDay() - weekStart + 7) % 7);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        pick(cursor);
        break;
      default:
    }
  };
  return /* @__PURE__ */ jsxs3("div", { className: cx("lzt-cal", className), ...props, children: [
    /* @__PURE__ */ jsxs3("div", { className: "lzt-cal__head", children: [
      /* @__PURE__ */ jsx7("button", { type: "button", className: "lzt-cal__nav", "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u043C\u0435\u0441\u044F\u0446", onClick: () => moveMonth(-1), children: "\u2039" }),
      /* @__PURE__ */ jsx7("div", { className: "lzt-cal__month", "aria-live": "polite", children: monthLabel }),
      /* @__PURE__ */ jsx7("button", { type: "button", className: "lzt-cal__nav", "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043C\u0435\u0441\u044F\u0446", onClick: () => moveMonth(1), children: "\u203A" })
    ] }),
    /* @__PURE__ */ jsx7("div", { className: "lzt-cal__weekdays", "aria-hidden": "true", children: weekdays.map((name) => /* @__PURE__ */ jsx7("span", { className: "lzt-cal__weekday", children: name }, name)) }),
    /* @__PURE__ */ jsx7("div", { ref: gridRef, role: "grid", className: "lzt-cal__grid", onKeyDown, children: days.map((date) => {
      const iso = toIso(date);
      const isCursor = iso === toIso(cursor);
      const disabled = outOfRange(date, min, max);
      return /* @__PURE__ */ jsx7(
        "button",
        {
          type: "button",
          role: "gridcell",
          tabIndex: isCursor ? 0 : -1,
          "data-cursor": isCursor,
          "aria-selected": iso === current,
          "aria-current": iso === today ? "date" : void 0,
          disabled,
          className: cx(
            "lzt-cal__day",
            date.getMonth() !== cursor.getMonth() && "is-outside",
            iso === current && "is-selected",
            iso === today && "is-today"
          ),
          onClick: () => {
            focusWanted.current = false;
            setCursor(date);
            pick(date);
          },
          children: date.getDate()
        },
        iso
      );
    }) })
  ] });
}

// react/src/DatePicker.tsx
import { useCallback as useCallback4, useEffect as useEffect5, useId as useId2, useRef as useRef4, useState as useState5 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
function splitDateTime(value) {
  const [date = "", time = ""] = value.split("T");
  return [date, time];
}
function usePopover(open) {
  return useAnchored(open, { matchWidth: false });
}
function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = "\u0434\u0434.\u043C\u043C.\u0433\u0433\u0433\u0433",
  disabled,
  readOnly,
  required,
  invalid,
  name,
  min,
  max,
  weekStart,
  locale,
  className,
  id,
  ...props
}) {
  const [uncontrolled, setUncontrolled] = useState5(defaultValue ?? "");
  const current = value ?? uncontrolled;
  const [open, setOpen] = useState5(false);
  const [typing, setTyping] = useState5(null);
  const popId = useId2();
  const { anchorRef, floatRef, style } = usePopover(open);
  const commit = useCallback4(
    (next) => {
      if (readOnly) return;
      if (value === void 0) setUncontrolled(next);
      onChange?.(next);
    },
    [onChange, readOnly, value]
  );
  useEffect5(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const target = e.target;
      if (anchorRef.current?.contains(target) || floatRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [anchorRef, floatRef, open]);
  const text = typing ?? (current ? current.split("-").reverse().join(".") : "");
  const acceptTyped = (raw) => {
    setTyping(null);
    if (raw.trim() === "") return commit("");
    const match = /^(\d{2})[.\-/](\d{2})[.\-/](\d{4})$/.exec(raw.trim());
    if (!match) return;
    const iso = `${match[3]}-${match[2]}-${match[1]}`;
    if (fromIso(iso)) commit(iso);
  };
  return /* @__PURE__ */ jsxs4("div", { ref: anchorRef, className: cx("lzt-datefield", className), ...props, children: [
    /* @__PURE__ */ jsx8(
      "input",
      {
        id,
        type: "text",
        inputMode: "numeric",
        className: cx("lzt-input", invalid && "lzt-input--invalid"),
        value: text,
        placeholder,
        disabled,
        readOnly,
        required,
        "aria-invalid": invalid || void 0,
        "aria-expanded": open,
        "aria-controls": open ? popId : void 0,
        onChange: (e) => setTyping(e.target.value),
        onBlur: (e) => acceptTyped(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") acceptTyped(e.currentTarget.value);
        }
      }
    ),
    /* @__PURE__ */ jsx8(
      "button",
      {
        type: "button",
        className: "lzt-datefield__open",
        "aria-label": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C",
        disabled,
        onClick: () => setOpen((o) => !o)
      }
    ),
    name ? /* @__PURE__ */ jsx8("input", { type: "hidden", name, value: current, readOnly: true }) : null,
    open ? createPortal2(
      /* @__PURE__ */ jsx8("div", { ...{ [PORTAL_ROOT_ATTR]: "" }, id: popId, ref: floatRef, style, className: "lzt-datepop", children: /* @__PURE__ */ jsx8(
        Calendar,
        {
          value: current,
          onChange: (next) => {
            commit(next);
            setOpen(false);
          },
          min,
          max,
          weekStart,
          locale
        }
      ) }),
      document.body
    ) : null
  ] });
}
function DateTimePicker({ value, defaultValue, onChange, step = 60, ...rest }) {
  const [uncontrolled, setUncontrolled] = useState5(defaultValue ?? "");
  const current = value ?? uncontrolled;
  const [date, time] = splitDateTime(current);
  const timeRef = useRef4(null);
  const emit = (nextDate, nextTime) => {
    const joined = nextDate ? `${nextDate}T${nextTime || "00:00"}` : "";
    if (value === void 0) setUncontrolled(joined);
    onChange?.(joined);
  };
  return /* @__PURE__ */ jsxs4("div", { className: "lzt-datetime", children: [
    /* @__PURE__ */ jsx8(DatePicker, { ...rest, value: date, onChange: (next) => emit(next, time) }),
    /* @__PURE__ */ jsx8(
      "input",
      {
        ref: timeRef,
        type: "time",
        step,
        className: "lzt-input lzt-datetime__time",
        value: time,
        disabled: rest.disabled,
        readOnly: rest.readOnly,
        onChange: (e) => emit(date, e.target.value)
      }
    )
  ] });
}

// react/src/Slider.tsx
import { useCallback as useCallback5, useRef as useRef5, useState as useState6 } from "react";
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
function quantise(raw, min, max, step) {
  const clamped = Math.min(max, Math.max(min, raw));
  const snapped = min + Math.round((clamped - min) / step) * step;
  const decimals = (String(step).split(".")[1] ?? "").length;
  return Number(Math.min(max, Math.max(min, snapped)).toFixed(decimals));
}
function Slider({
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
}) {
  const [uncontrolled, setUncontrolled] = useState6(defaultValue ?? min);
  const current = quantise(value ?? uncontrolled, min, max, step);
  const trackRef = useRef5(null);
  const commit = useCallback5(
    (next) => {
      if (disabled || readOnly) return;
      const snapped = quantise(next, min, max, step);
      if (snapped === current) return;
      if (value === void 0) setUncontrolled(snapped);
      onChange?.(snapped);
    },
    [current, disabled, max, min, onChange, readOnly, step, value]
  );
  const fromPointer = (clientX) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return;
    commit(min + (clientX - rect.left) / rect.width * (max - min));
  };
  const onPointerDown = (e) => {
    if (disabled || readOnly) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    fromPointer(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    fromPointer(e.clientX);
  };
  const onKeyDown = (e) => {
    const big = Math.max(step, (max - min) / 10);
    const moves = {
      ArrowLeft: -step,
      ArrowDown: -step,
      ArrowRight: step,
      ArrowUp: step,
      PageDown: -big,
      PageUp: big
    };
    if (e.key in moves) {
      e.preventDefault();
      commit(current + moves[e.key]);
    } else if (e.key === "Home") {
      e.preventDefault();
      commit(min);
    } else if (e.key === "End") {
      e.preventDefault();
      commit(max);
    }
  };
  const filled = max === min ? 0 : (current - min) / (max - min) * 100;
  return /* @__PURE__ */ jsxs5("div", { className: cx("lzt-slider", disabled && "is-disabled", className), ...props, children: [
    /* @__PURE__ */ jsxs5(
      "div",
      {
        ref: trackRef,
        role: "slider",
        id,
        tabIndex: disabled ? -1 : 0,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-valuenow": current,
        "aria-valuetext": unit ? `${current} ${unit}` : void 0,
        "aria-disabled": disabled || void 0,
        "aria-readonly": readOnly || void 0,
        className: "lzt-slider__track",
        onPointerDown,
        onPointerMove,
        onKeyDown,
        children: [
          /* @__PURE__ */ jsx9("div", { className: "lzt-slider__fill", style: { width: `${filled}%` } }),
          /* @__PURE__ */ jsx9("div", { className: "lzt-slider__thumb", style: { left: `${filled}%` } })
        ]
      }
    ),
    /* @__PURE__ */ jsxs5("span", { className: "lzt-slider__value", children: [
      current,
      unit ? /* @__PURE__ */ jsx9("span", { className: "lzt-slider__unit", children: unit }) : null
    ] }),
    name ? /* @__PURE__ */ jsx9("input", { type: "hidden", name, value: current, readOnly: true }) : null
  ] });
}

// react/src/display.tsx
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
function Block({ accent, className, ...props }) {
  return /* @__PURE__ */ jsx10("div", { className: cx("lzt-block", accent && "lzt-block--accent", className), ...props });
}
function BlockHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx10("div", { className: cx("lzt-block__header", className), ...props });
}
function BlockBody({ className, ...props }) {
  return /* @__PURE__ */ jsx10("div", { className: cx("lzt-block__body", className), ...props });
}
function BlockFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx10("div", { className: cx("lzt-block__footer", className), ...props });
}
function Card({ hover, className, ...props }) {
  return /* @__PURE__ */ jsx10("div", { className: cx("lzt-card", hover && "lzt-card--hover", className), ...props });
}
function Stat({ label, value, delta, trend, className, ...props }) {
  return /* @__PURE__ */ jsxs6("div", { className: cx("lzt-stat", className), ...props, children: [
    /* @__PURE__ */ jsx10("span", { className: "lzt-stat__label", children: label }),
    /* @__PURE__ */ jsx10("span", { className: "lzt-stat__value", children: value }),
    delta != null && /* @__PURE__ */ jsx10(
      "span",
      {
        className: cx(
          "lzt-stat__delta",
          trend === "up" && "lzt-stat__delta--up",
          trend === "down" && "lzt-stat__delta--down"
        ),
        children: delta
      }
    )
  ] });
}
function Badge({ tone = "default", pill, className, ...props }) {
  return /* @__PURE__ */ jsx10(
    "span",
    {
      className: cx("lzt-badge", tone !== "default" && `lzt-badge--${tone}`, pill && "lzt-badge--pill", className),
      ...props
    }
  );
}
function Tag({ active, className, type = "button", ...props }) {
  return /* @__PURE__ */ jsx10("button", { type, className: cx("lzt-tag", active && "is-active", className), ...props });
}
function Chip({ onRemove, className, children, ...props }) {
  return /* @__PURE__ */ jsxs6("span", { className: cx("lzt-chip", className), ...props, children: [
    children,
    onRemove && /* @__PURE__ */ jsx10(
      "span",
      {
        className: "lzt-chip__x",
        role: "button",
        tabIndex: 0,
        "aria-label": "Remove",
        onClick: onRemove,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") onRemove();
        },
        children: /* @__PURE__ */ jsx10(Icon, { name: "x", size: 12 })
      }
    )
  ] });
}
function Avatar({ src, alt = "", size = "md", round, ring, status, className, children, ...props }) {
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: cx(
        "lzt-avatar",
        size === "sm" && "lzt-avatar--sm",
        size === "lg" && "lzt-avatar--lg",
        round && "lzt-avatar--round",
        ring && "lzt-avatar--ring",
        className
      ),
      ...props,
      children: [
        src ? /* @__PURE__ */ jsx10("img", { src, alt }) : children,
        status && /* @__PURE__ */ jsx10("span", { className: cx("lzt-avatar__dot", `lzt-avatar__dot--${status}`) })
      ]
    }
  );
}
function Alert({ tone = "default", title, className, children, ...props }) {
  return /* @__PURE__ */ jsx10("div", { role: "alert", className: cx("lzt-alert", tone !== "default" && `lzt-alert--${tone}`, className), ...props, children: /* @__PURE__ */ jsxs6("div", { children: [
    title && /* @__PURE__ */ jsx10("span", { className: "lzt-alert__title", children: title }),
    children
  ] }) });
}
function Empty({ icon, title, className, children, ...props }) {
  return /* @__PURE__ */ jsxs6("div", { className: cx("lzt-empty", className), ...props, children: [
    icon && /* @__PURE__ */ jsx10("div", { className: "lzt-empty__icon", children: icon }),
    title && /* @__PURE__ */ jsx10("div", { className: "lzt-empty__title", children: title }),
    children
  ] });
}
function Table({ numeric, className, children, ...props }) {
  return /* @__PURE__ */ jsx10("div", { className: "lzt-table-wrap", children: /* @__PURE__ */ jsx10("table", { className: cx("lzt-table", numeric && "lzt-table--num", className), ...props, children }) });
}

// react/src/navigation.tsx
import {
  Fragment as Fragment2,
  cloneElement,
  createContext as createContext2,
  useCallback as useCallback6,
  useContext as useContext2,
  useEffect as useEffect6,
  useRef as useRef6,
  useState as useState7
} from "react";
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
function Topbar({ className, children, ...props }) {
  return /* @__PURE__ */ jsx11("header", { className: cx("lzt-topbar", className), ...props, children: /* @__PURE__ */ jsx11("div", { className: "lzt-topbar__inner", children }) });
}
function Logo({ mark, className, children, ...props }) {
  return /* @__PURE__ */ jsxs7("div", { className: cx("lzt-logo", className), ...props, children: [
    mark && /* @__PURE__ */ jsx11("span", { className: "lzt-logo__mark", children: mark }),
    children
  ] });
}
function Sidenav({ label, className, children, ...props }) {
  return /* @__PURE__ */ jsxs7("nav", { className: cx("lzt-sidenav", className), ...props, children: [
    label && /* @__PURE__ */ jsx11("div", { className: "lzt-sidenav__label", children: label }),
    children
  ] });
}
function SidenavItem({ active, count, className, children, ...props }) {
  return /* @__PURE__ */ jsxs7("a", { className: cx("lzt-sidenav__item", active && "is-active", className), ...props, children: [
    children,
    count != null && /* @__PURE__ */ jsx11("span", { className: "lzt-sidenav__count", children: count })
  ] });
}
function Tabs({ items, value, defaultValue, onChange, className, ...props }) {
  const [internal, setInternal] = useState7(defaultValue ?? items[0]?.value);
  const active = value ?? internal;
  const select = (next) => {
    if (value === void 0) setInternal(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ jsx11("div", { role: "tablist", className: cx("lzt-tabs", className), ...props, children: items.map((item) => /* @__PURE__ */ jsx11(
    "button",
    {
      type: "button",
      role: "tab",
      className: "lzt-tab",
      "aria-selected": item.value === active,
      disabled: item.disabled,
      onClick: () => select(item.value),
      children: item.label
    },
    item.value
  )) });
}
function Segmented({ items, value, defaultValue, onChange, className, ...props }) {
  const [internal, setInternal] = useState7(defaultValue ?? items[0]?.value);
  const active = value ?? internal;
  const select = (next) => {
    if (value === void 0) setInternal(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ jsx11("div", { className: cx("lzt-segmented", className), ...props, children: items.map((item) => /* @__PURE__ */ jsx11(
    "button",
    {
      type: "button",
      className: "lzt-segmented__item",
      "aria-selected": item.value === active,
      disabled: item.disabled,
      onClick: () => select(item.value),
      children: item.label
    },
    item.value
  )) });
}
function Breadcrumb({ items, className, ...props }) {
  return /* @__PURE__ */ jsx11("nav", { "aria-label": "Breadcrumb", className: cx("lzt-breadcrumb", className), ...props, children: items.map((item, i) => /* @__PURE__ */ jsxs7(Fragment2, { children: [
    i > 0 && /* @__PURE__ */ jsx11("span", { className: "lzt-breadcrumb__sep", children: "/" }),
    item.href ? /* @__PURE__ */ jsx11("a", { href: item.href, children: item.label }) : /* @__PURE__ */ jsx11("span", { children: item.label })
  ] }, i)) });
}
function buildPageList(page, count, siblings) {
  const windowSize = siblings * 2 + 5;
  if (count <= windowSize) return Array.from({ length: count }, (_, i) => i + 1);
  const left = Math.max(page - siblings, 2);
  const right = Math.min(page + siblings, count - 1);
  const pages = [1];
  if (left > 2) pages.push("gap");
  for (let p = left; p <= right; p += 1) pages.push(p);
  if (right < count - 1) pages.push("gap");
  pages.push(count);
  return pages;
}
function Pagenav({ page, count, onChange, siblingCount = 1, className, ...props }) {
  const pages = buildPageList(page, count, siblingCount);
  return /* @__PURE__ */ jsx11("nav", { "aria-label": "Pagination", className: cx("lzt-pagenav", className), ...props, children: pages.map(
    (p, i) => p === "gap" ? /* @__PURE__ */ jsx11("span", { className: "lzt-pagenav__gap", children: "\u2026" }, `gap-${i}`) : /* @__PURE__ */ jsx11(
      "button",
      {
        type: "button",
        className: cx("lzt-pagenav__item", p === page && "is-current"),
        "aria-current": p === page ? "page" : void 0,
        onClick: () => onChange(p),
        children: p
      },
      p
    )
  ) });
}
var DropdownContext = createContext2(null);
function Dropdown({ trigger, open, defaultOpen = false, onOpenChange, className, children, ...props }) {
  const [internalOpen, setInternalOpen] = useState7(defaultOpen);
  const isOpen = open ?? internalOpen;
  const rootRef = useRef6(null);
  const setOpen = useCallback6(
    (next) => {
      if (open === void 0) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange]
  );
  useEffect6(() => {
    if (!isOpen) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, setOpen]);
  return /* @__PURE__ */ jsxs7("div", { ref: rootRef, className: cx("lzt-dropdown", isOpen && "is-open", className), ...props, children: [
    cloneElement(trigger, {
      onClick: (e) => {
        trigger.props.onClick?.(e);
        setOpen(!isOpen);
      }
    }),
    /* @__PURE__ */ jsx11(DropdownContext.Provider, { value: { close: () => setOpen(false) }, children })
  ] });
}
function Menu({ className, ...props }) {
  return /* @__PURE__ */ jsx11("div", { role: "menu", className: cx("lzt-menu", className), ...props });
}
function MenuItem({ danger, closeOnClick = true, className, onClick, type = "button", ...props }) {
  const ctx = useContext2(DropdownContext);
  return /* @__PURE__ */ jsx11(
    "button",
    {
      type,
      role: "menuitem",
      className: cx("lzt-menu__item", danger && "lzt-menu__item--danger", className),
      onClick: (e) => {
        onClick?.(e);
        if (closeOnClick) ctx?.close();
      },
      ...props
    }
  );
}
function MenuSep({ className, ...props }) {
  return /* @__PURE__ */ jsx11("div", { className: cx("lzt-menu__sep", className), ...props });
}

// react/src/feedback.tsx
import { useEffect as useEffect7, useRef as useRef7 } from "react";
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
var FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
var PORTAL_ROOT_SELECTOR = "[data-lzt-portal-root]";
function focusableWithin(root) {
  return root ? Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR)) : [];
}
function trappedNodes(modal) {
  const portals = Array.from(document.querySelectorAll(PORTAL_ROOT_SELECTOR));
  return [...focusableWithin(modal), ...portals.flatMap(focusableWithin)];
}
function Modal({ open, onClose, title, footer, className, children, ...props }) {
  const modalRef = useRef7(null);
  useEffect7(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    modalRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (document.querySelector(PORTAL_ROOT_SELECTOR)) return;
        onClose();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = trappedNodes(modalRef.current);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return /* @__PURE__ */ jsx12("div", { className: "lzt-overlay is-open", onMouseDown: (e) => e.target === e.currentTarget && onClose(), children: /* @__PURE__ */ jsxs8(
    "div",
    {
      ref: modalRef,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": typeof title === "string" ? title : void 0,
      tabIndex: -1,
      className: cx("lzt-modal", className),
      ...props,
      children: [
        title && /* @__PURE__ */ jsx12("div", { className: "lzt-modal__head", children: title }),
        /* @__PURE__ */ jsx12("div", { className: "lzt-modal__body", children }),
        footer && /* @__PURE__ */ jsx12("div", { className: "lzt-modal__foot", children: footer })
      ]
    }
  ) });
}
function Tooltip({ content, className, children, ...props }) {
  return /* @__PURE__ */ jsx12("span", { className: cx("lzt-tip", className), "data-tip": content, ...props, children });
}
function Progress({ value, flow, className, ...props }) {
  const clamped = Math.min(100, Math.max(0, value));
  return /* @__PURE__ */ jsx12(
    "div",
    {
      role: "progressbar",
      "aria-valuenow": clamped,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      className: cx("lzt-progress", flow && "lzt-progress--flow", className),
      ...props,
      children: /* @__PURE__ */ jsx12("div", { className: "lzt-progress__bar", style: { width: `${clamped}%` } })
    }
  );
}
function LoaderBar({ className, ...props }) {
  return /* @__PURE__ */ jsx12("div", { role: "progressbar", className: cx("lzt-loaderbar", className), ...props });
}
function Spinner({ size = "md", className, ...props }) {
  return /* @__PURE__ */ jsx12(
    "div",
    {
      role: "status",
      "aria-label": "Loading",
      className: cx("lzt-spinner", size === "lg" && "lzt-spinner--lg", className),
      ...props
    }
  );
}
function Dots({ className, ...props }) {
  return /* @__PURE__ */ jsxs8("span", { role: "status", "aria-label": "Loading", className: cx("lzt-dots", className), ...props, children: [
    /* @__PURE__ */ jsx12("span", {}),
    /* @__PURE__ */ jsx12("span", {}),
    /* @__PURE__ */ jsx12("span", {})
  ] });
}
function Skeleton({ variant, className, ...props }) {
  return /* @__PURE__ */ jsx12("div", { className: cx("lzt-skeleton", variant && `lzt-skeleton--${variant}`, className), ...props });
}

// react/src/toast.tsx
import { createContext as createContext3, useCallback as useCallback7, useContext as useContext3, useRef as useRef8, useState as useState8 } from "react";
import { createPortal as createPortal3 } from "react-dom";
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
var ToastContext = createContext3(null);
var EXIT_DURATION_MS = 180;
var DEFAULT_DURATION_MS = 4e3;
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState8([]);
  const idRef = useRef8(0);
  const dismiss = useCallback7((id) => {
    setToasts((current) => current.map((t) => t.id === id ? { ...t, leaving: true } : t));
    window.setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, EXIT_DURATION_MS);
  }, []);
  const show = useCallback7(
    (message, options = {}) => {
      const id = idRef.current += 1;
      const duration = options.duration ?? DEFAULT_DURATION_MS;
      setToasts((current) => [...current, { id, message, tone: options.tone, leaving: false }]);
      window.setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );
  return /* @__PURE__ */ jsxs9(ToastContext.Provider, { value: { show, dismiss }, children: [
    children,
    typeof document !== "undefined" && createPortal3(
      /* @__PURE__ */ jsx13("div", { className: "lzt-toasts", children: toasts.map((t) => /* @__PURE__ */ jsx13(
        "div",
        {
          role: "status",
          className: cx("lzt-toast", t.tone && t.tone !== "default" && `lzt-toast--${t.tone}`, t.leaving && "is-leaving"),
          children: t.message
        },
        t.id
      )) }),
      document.body
    )
  ] });
}
function useToast() {
  const ctx = useContext3(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

// react/src/forum.tsx
import { useState as useState9 } from "react";
import { jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
function Thread({ unread, pinned, className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-thread", unread && "is-unread", pinned && "is-pinned", className), ...props });
}
function ThreadMain({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-thread__main", className), ...props });
}
function ThreadTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-thread__title", className), ...props });
}
function ThreadMeta({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-thread__meta", className), ...props });
}
function ThreadStats({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-thread__stats", className), ...props });
}
function ThreadStat({ value, label, className, ...props }) {
  return /* @__PURE__ */ jsxs10("div", { className: cx("lzt-thread__stat", className), ...props, children: [
    /* @__PURE__ */ jsx14("b", { children: value }),
    /* @__PURE__ */ jsx14("span", { children: label })
  ] });
}
function Post({ op, className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-post", op && "is-op", className), ...props });
}
function PostUser({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-post__user", className), ...props });
}
function PostName({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-post__name", className), ...props });
}
function PostRole({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-post__role", className), ...props });
}
function PostUserStats({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-post__userstats", className), ...props });
}
function PostBody({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-post__body", className), ...props });
}
function PostHead({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-post__head", className), ...props });
}
function PostContent({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-post__content", className), ...props });
}
function PostFoot({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-post__foot", className), ...props });
}
function Quote({ author, className, children, ...props }) {
  return /* @__PURE__ */ jsxs10("blockquote", { className: cx("lzt-quote", className), ...props, children: [
    author && /* @__PURE__ */ jsx14("span", { className: "lzt-quote__author", children: author }),
    children
  ] });
}
function Code({ className, children, ...props }) {
  return /* @__PURE__ */ jsx14("pre", { className: cx("lzt-code", className), ...props, children: /* @__PURE__ */ jsx14("code", { children }) });
}
function Spoiler({ label, open, defaultOpen = false, onOpenChange, className, children, ...props }) {
  const [internalOpen, setInternalOpen] = useState9(defaultOpen);
  const isOpen = open ?? internalOpen;
  const toggle = () => {
    const next = !isOpen;
    if (open === void 0) setInternalOpen(next);
    onOpenChange?.(next);
  };
  return /* @__PURE__ */ jsxs10("div", { className: cx("lzt-spoiler", isOpen && "is-open", className), ...props, children: [
    /* @__PURE__ */ jsxs10("button", { type: "button", className: "lzt-spoiler__btn", "aria-expanded": isOpen, onClick: toggle, children: [
      label,
      /* @__PURE__ */ jsx14("span", { className: "lzt-spoiler__chevron", children: /* @__PURE__ */ jsx14(Icon, { name: "chevron-down", size: 14 }) })
    ] }),
    /* @__PURE__ */ jsx14("div", { className: "lzt-spoiler__content", children: /* @__PURE__ */ jsx14("div", { className: "lzt-spoiler__inner", children }) })
  ] });
}
function Reactions({ className, ...props }) {
  return /* @__PURE__ */ jsx14("div", { className: cx("lzt-reactions", className), ...props });
}
function Reaction({ mine, className, type = "button", ...props }) {
  return /* @__PURE__ */ jsx14("button", { type, className: cx("lzt-reaction", mine && "is-mine", className), ...props });
}
export {
  Alert,
  Avatar,
  Badge,
  Block,
  BlockBody,
  BlockFooter,
  BlockHeader,
  Breadcrumb,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Checkbox,
  Chip,
  Code,
  Container,
  DatePicker,
  DateTimePicker,
  Divider,
  Dots,
  Dropdown,
  Empty,
  Field,
  Grid,
  Hint,
  Icon,
  Input,
  Label,
  LoaderBar,
  Logo,
  Main,
  Menu,
  MenuItem,
  MenuSep,
  Modal,
  PORTAL_ROOT_ATTR,
  Pagenav,
  Post,
  PostBody,
  PostContent,
  PostFoot,
  PostHead,
  PostName,
  PostRole,
  PostUser,
  PostUserStats,
  Progress,
  Quote,
  Radio,
  Reaction,
  Reactions,
  Row,
  Search,
  Segmented,
  Select,
  Shell,
  Sidenav,
  SidenavItem,
  Skeleton,
  Slider,
  Spacer,
  Spinner,
  Spoiler,
  Stack,
  Stat,
  Switch,
  Table,
  Tabs,
  Tag,
  Textarea,
  ThemeProvider,
  ThemeToggle,
  Thread,
  ThreadMain,
  ThreadMeta,
  ThreadStat,
  ThreadStats,
  ThreadTitle,
  ToastProvider,
  Tooltip,
  Topbar,
  cx,
  fromIso,
  toIso,
  useAnchored,
  useTheme,
  useToast
};
//# sourceMappingURL=index.js.map