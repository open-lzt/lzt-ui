"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// react/src/index.ts
var index_exports = {};
__export(index_exports, {
  Alert: () => Alert,
  Avatar: () => Avatar,
  Badge: () => Badge,
  Block: () => Block,
  BlockBody: () => BlockBody,
  BlockFooter: () => BlockFooter,
  BlockHeader: () => BlockHeader,
  Breadcrumb: () => Breadcrumb,
  Button: () => Button,
  ButtonGroup: () => ButtonGroup,
  Card: () => Card,
  Checkbox: () => Checkbox,
  Chip: () => Chip,
  Code: () => Code,
  Container: () => Container,
  Divider: () => Divider,
  Dots: () => Dots,
  Dropdown: () => Dropdown,
  Empty: () => Empty,
  Field: () => Field,
  Grid: () => Grid,
  Hint: () => Hint,
  Icon: () => Icon,
  Input: () => Input,
  Label: () => Label,
  LoaderBar: () => LoaderBar,
  Logo: () => Logo,
  Main: () => Main,
  Menu: () => Menu,
  MenuItem: () => MenuItem,
  MenuSep: () => MenuSep,
  Modal: () => Modal,
  Pagenav: () => Pagenav,
  Post: () => Post,
  PostBody: () => PostBody,
  PostContent: () => PostContent,
  PostFoot: () => PostFoot,
  PostHead: () => PostHead,
  PostName: () => PostName,
  PostRole: () => PostRole,
  PostUser: () => PostUser,
  PostUserStats: () => PostUserStats,
  Progress: () => Progress,
  Quote: () => Quote,
  Radio: () => Radio,
  Reaction: () => Reaction,
  Reactions: () => Reactions,
  Row: () => Row,
  Search: () => Search,
  Segmented: () => Segmented,
  Select: () => Select,
  Shell: () => Shell,
  Sidenav: () => Sidenav,
  SidenavItem: () => SidenavItem,
  Skeleton: () => Skeleton,
  Spacer: () => Spacer,
  Spinner: () => Spinner,
  Spoiler: () => Spoiler,
  Stack: () => Stack,
  Stat: () => Stat,
  Switch: () => Switch,
  Table: () => Table,
  Tabs: () => Tabs,
  Tag: () => Tag,
  Textarea: () => Textarea,
  ThemeProvider: () => ThemeProvider,
  ThemeToggle: () => ThemeToggle,
  Thread: () => Thread,
  ThreadMain: () => ThreadMain,
  ThreadMeta: () => ThreadMeta,
  ThreadStat: () => ThreadStat,
  ThreadStats: () => ThreadStats,
  ThreadTitle: () => ThreadTitle,
  ToastProvider: () => ToastProvider,
  Tooltip: () => Tooltip,
  Topbar: () => Topbar,
  cx: () => cx,
  useTheme: () => useTheme,
  useToast: () => useToast
});
module.exports = __toCommonJS(index_exports);

// react/src/cx.ts
function cx(...values) {
  return values.filter(Boolean).join(" ");
}

// react/src/theme.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var STORAGE_KEY = "lzt-theme";
var ThemeContext = (0, import_react.createContext)(null);
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
function ThemeProvider({ children, defaultTheme = "dark" }) {
  const [theme, setThemeState] = (0, import_react.useState)(defaultTheme);
  (0, import_react.useEffect)(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = stored === "light" || stored === "dark" ? stored : defaultTheme;
    setThemeState(initial);
    applyTheme(initial);
  }, []);
  const setTheme = (0, import_react.useCallback)((next) => {
    setThemeState(next);
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);
  const toggle = (0, import_react.useCallback)(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value: { theme, setTheme, toggle }, children });
}
function useTheme() {
  const ctx = (0, import_react.useContext)(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
function ThemeToggle({ className, type = "button", ...props }) {
  const { theme, toggle } = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_jsx_runtime2 = require("react/jsx-runtime");
function makeBox(baseClass, displayName) {
  function Box({ className, ...props }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: cx(baseClass, className), ...props });
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      className: cx("lzt-row", between && "lzt-row--between", wrap && "lzt-row--wrap", className),
      ...props
    }
  );
}
function Divider({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("hr", { className: cx("lzt-divider", className), ...props });
}

// react/src/Button.tsx
var import_react2 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Button = (0, import_react2.forwardRef)(function Button2({ variant = "default", size = "md", icon, block, loading, disabled, className, type = "button", children, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: cx("lzt-btn-group", className), ...props });
}

// react/src/Icon.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function Icon({ name, size, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "svg",
    {
      className: cx("lzt-icon", className),
      width: size,
      height: size,
      "aria-hidden": "true",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("use", { href: `#i-${name}` })
    }
  );
}

// react/src/forms.tsx
var import_react3 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
function Field({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: cx("lzt-field", className), ...props });
}
function Label({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { className: cx("lzt-label", className), ...props });
}
function Hint({ error, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: cx("lzt-hint", error && "lzt-hint--error", className), ...props });
}
var Input = (0, import_react3.forwardRef)(function Input2({ size = "md", invalid, className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "input",
    {
      ref,
      className: cx("lzt-input", size === "sm" && "lzt-input--sm", invalid && "lzt-input--invalid", className),
      "aria-invalid": invalid || void 0,
      ...props
    }
  );
});
var Textarea = (0, import_react3.forwardRef)(function Textarea2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("textarea", { ref, className: cx("lzt-textarea", className), ...props });
});
var Select = (0, import_react3.forwardRef)(function Select2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("select", { ref, className: cx("lzt-select", className), ...props });
});
function Search({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "lzt-search", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "lzt-search__icon", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "search", size: 14 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "search", className: cx("lzt-input", className), ...props })
  ] });
}
function Checkbox({ label, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: cx("lzt-check", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "checkbox", ...props }),
    label
  ] });
}
function Radio({ label, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: cx("lzt-check", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "radio", ...props }),
    label
  ] });
}
function Switch({ label, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: cx("lzt-switch", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "checkbox", ...props }),
    label
  ] });
}

// react/src/display.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function Block({ accent, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cx("lzt-block", accent && "lzt-block--accent", className), ...props });
}
function BlockHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cx("lzt-block__header", className), ...props });
}
function BlockBody({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cx("lzt-block__body", className), ...props });
}
function BlockFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cx("lzt-block__footer", className), ...props });
}
function Card({ hover, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cx("lzt-card", hover && "lzt-card--hover", className), ...props });
}
function Stat({ label, value, delta, trend, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: cx("lzt-stat", className), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "lzt-stat__label", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "lzt-stat__value", children: value }),
    delta != null && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "span",
    {
      className: cx("lzt-badge", tone !== "default" && `lzt-badge--${tone}`, pill && "lzt-badge--pill", className),
      ...props
    }
  );
}
function Tag({ active, className, type = "button", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type, className: cx("lzt-tag", active && "is-active", className), ...props });
}
function Chip({ onRemove, className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: cx("lzt-chip", className), ...props, children: [
    children,
    onRemove && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "x", size: 12 })
      }
    )
  ] });
}
function Avatar({ src, alt = "", size = "md", round, ring, status, className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
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
        src ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("img", { src, alt }) : children,
        status && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: cx("lzt-avatar__dot", `lzt-avatar__dot--${status}`) })
      ]
    }
  );
}
function Alert({ tone = "default", title, className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { role: "alert", className: cx("lzt-alert", tone !== "default" && `lzt-alert--${tone}`, className), ...props, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
    title && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "lzt-alert__title", children: title }),
    children
  ] }) });
}
function Empty({ icon, title, className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: cx("lzt-empty", className), ...props, children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "lzt-empty__icon", children: icon }),
    title && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "lzt-empty__title", children: title }),
    children
  ] });
}
function Table({ numeric, className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "lzt-table-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("table", { className: cx("lzt-table", numeric && "lzt-table--num", className), ...props, children }) });
}

// react/src/navigation.tsx
var import_react4 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
function Topbar({ className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("header", { className: cx("lzt-topbar", className), ...props, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "lzt-topbar__inner", children }) });
}
function Logo({ mark, className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: cx("lzt-logo", className), ...props, children: [
    mark && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lzt-logo__mark", children: mark }),
    children
  ] });
}
function Sidenav({ label, className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("nav", { className: cx("lzt-sidenav", className), ...props, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "lzt-sidenav__label", children: label }),
    children
  ] });
}
function SidenavItem({ active, count, className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("a", { className: cx("lzt-sidenav__item", active && "is-active", className), ...props, children: [
    children,
    count != null && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lzt-sidenav__count", children: count })
  ] });
}
function Tabs({ items, value, defaultValue, onChange, className, ...props }) {
  const [internal, setInternal] = (0, import_react4.useState)(defaultValue ?? items[0]?.value);
  const active = value ?? internal;
  const select = (next) => {
    if (value === void 0) setInternal(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { role: "tablist", className: cx("lzt-tabs", className), ...props, children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
  const [internal, setInternal] = (0, import_react4.useState)(defaultValue ?? items[0]?.value);
  const active = value ?? internal;
  const select = (next) => {
    if (value === void 0) setInternal(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: cx("lzt-segmented", className), ...props, children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("nav", { "aria-label": "Breadcrumb", className: cx("lzt-breadcrumb", className), ...props, children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_react4.Fragment, { children: [
    i > 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lzt-breadcrumb__sep", children: "/" }),
    item.href ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("a", { href: item.href, children: item.label }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: item.label })
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("nav", { "aria-label": "Pagination", className: cx("lzt-pagenav", className), ...props, children: pages.map(
    (p, i) => p === "gap" ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lzt-pagenav__gap", children: "\u2026" }, `gap-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
var DropdownContext = (0, import_react4.createContext)(null);
function Dropdown({ trigger, open, defaultOpen = false, onOpenChange, className, children, ...props }) {
  const [internalOpen, setInternalOpen] = (0, import_react4.useState)(defaultOpen);
  const isOpen = open ?? internalOpen;
  const rootRef = (0, import_react4.useRef)(null);
  const setOpen = (0, import_react4.useCallback)(
    (next) => {
      if (open === void 0) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange]
  );
  (0, import_react4.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { ref: rootRef, className: cx("lzt-dropdown", isOpen && "is-open", className), ...props, children: [
    (0, import_react4.cloneElement)(trigger, {
      onClick: (e) => {
        trigger.props.onClick?.(e);
        setOpen(!isOpen);
      }
    }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DropdownContext.Provider, { value: { close: () => setOpen(false) }, children })
  ] });
}
function Menu({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { role: "menu", className: cx("lzt-menu", className), ...props });
}
function MenuItem({ danger, closeOnClick = true, className, onClick, type = "button", ...props }) {
  const ctx = (0, import_react4.useContext)(DropdownContext);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: cx("lzt-menu__sep", className), ...props });
}

// react/src/feedback.tsx
var import_react5 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
function Modal({ open, onClose, title, footer, className, children, ...props }) {
  const modalRef = (0, import_react5.useRef)(null);
  (0, import_react5.useEffect)(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    modalRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "lzt-overlay is-open", onMouseDown: (e) => e.target === e.currentTarget && onClose(), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
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
        title && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "lzt-modal__head", children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "lzt-modal__body", children }),
        footer && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "lzt-modal__foot", children: footer })
      ]
    }
  ) });
}
function Tooltip({ content, className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cx("lzt-tip", className), "data-tip": content, ...props, children });
}
function Progress({ value, flow, className, ...props }) {
  const clamped = Math.min(100, Math.max(0, value));
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    "div",
    {
      role: "progressbar",
      "aria-valuenow": clamped,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      className: cx("lzt-progress", flow && "lzt-progress--flow", className),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "lzt-progress__bar", style: { width: `${clamped}%` } })
    }
  );
}
function LoaderBar({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { role: "progressbar", className: cx("lzt-loaderbar", className), ...props });
}
function Spinner({ size = "md", className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { role: "status", "aria-label": "Loading", className: cx("lzt-dots", className), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", {}),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", {}),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", {})
  ] });
}
function Skeleton({ variant, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cx("lzt-skeleton", variant && `lzt-skeleton--${variant}`, className), ...props });
}

// react/src/toast.tsx
var import_react6 = require("react");
var import_react_dom = require("react-dom");
var import_jsx_runtime9 = require("react/jsx-runtime");
var ToastContext = (0, import_react6.createContext)(null);
var EXIT_DURATION_MS = 180;
var DEFAULT_DURATION_MS = 4e3;
function ToastProvider({ children }) {
  const [toasts, setToasts] = (0, import_react6.useState)([]);
  const idRef = (0, import_react6.useRef)(0);
  const dismiss = (0, import_react6.useCallback)((id) => {
    setToasts((current) => current.map((t) => t.id === id ? { ...t, leaving: true } : t));
    window.setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, EXIT_DURATION_MS);
  }, []);
  const show = (0, import_react6.useCallback)(
    (message, options = {}) => {
      const id = idRef.current += 1;
      const duration = options.duration ?? DEFAULT_DURATION_MS;
      setToasts((current) => [...current, { id, message, tone: options.tone, leaving: false }]);
      window.setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(ToastContext.Provider, { value: { show, dismiss }, children: [
    children,
    typeof document !== "undefined" && (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "lzt-toasts", children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  const ctx = (0, import_react6.useContext)(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

// react/src/forum.tsx
var import_react7 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
function Thread({ unread, pinned, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-thread", unread && "is-unread", pinned && "is-pinned", className), ...props });
}
function ThreadMain({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-thread__main", className), ...props });
}
function ThreadTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-thread__title", className), ...props });
}
function ThreadMeta({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-thread__meta", className), ...props });
}
function ThreadStats({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-thread__stats", className), ...props });
}
function ThreadStat({ value, label, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: cx("lzt-thread__stat", className), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("b", { children: value }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: label })
  ] });
}
function Post({ op, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-post", op && "is-op", className), ...props });
}
function PostUser({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-post__user", className), ...props });
}
function PostName({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-post__name", className), ...props });
}
function PostRole({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-post__role", className), ...props });
}
function PostUserStats({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-post__userstats", className), ...props });
}
function PostBody({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-post__body", className), ...props });
}
function PostHead({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-post__head", className), ...props });
}
function PostContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-post__content", className), ...props });
}
function PostFoot({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-post__foot", className), ...props });
}
function Quote({ author, className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("blockquote", { className: cx("lzt-quote", className), ...props, children: [
    author && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "lzt-quote__author", children: author }),
    children
  ] });
}
function Code({ className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("pre", { className: cx("lzt-code", className), ...props, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("code", { children }) });
}
function Spoiler({ label, open, defaultOpen = false, onOpenChange, className, children, ...props }) {
  const [internalOpen, setInternalOpen] = (0, import_react7.useState)(defaultOpen);
  const isOpen = open ?? internalOpen;
  const toggle = () => {
    const next = !isOpen;
    if (open === void 0) setInternalOpen(next);
    onOpenChange?.(next);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: cx("lzt-spoiler", isOpen && "is-open", className), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("button", { type: "button", className: "lzt-spoiler__btn", "aria-expanded": isOpen, onClick: toggle, children: [
      label,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "lzt-spoiler__chevron", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { name: "chevron-down", size: 14 }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "lzt-spoiler__content", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "lzt-spoiler__inner", children }) })
  ] });
}
function Reactions({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cx("lzt-reactions", className), ...props });
}
function Reaction({ mine, className, type = "button", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { type, className: cx("lzt-reaction", mine && "is-mine", className), ...props });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
  Card,
  Checkbox,
  Chip,
  Code,
  Container,
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
  useTheme,
  useToast
});
//# sourceMappingURL=index.cjs.map