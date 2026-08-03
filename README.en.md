<p align="right"><b>English</b> · <a href="README.md">Русский</a></p>

# lzt-ui

The design system of the [open-lzt](https://github.com/open-lzt/open-lzt) ecosystem: a CSS kit, an icon set and React bindings. Dark by default.

Plain HTML, no build step:

```html
<link rel="stylesheet" href="lzt-ui.css">
<script src="lzt-icons.js"></script>
<script src="lzt-ui.js"></script>

<button class="lzt-btn lzt-btn--primary">Save</button>
<svg class="lzt-icon"><use href="#i-search"/></svg>
```

React:

```tsx
import '@open-lzt/ui/lzt-ui.css';
import { Button, Icon, ThemeProvider } from '@open-lzt/ui';

export function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">Save</Button>
      <Icon name="search" />
    </ThemeProvider>
  );
}
```

## Install

```bash
npm install @open-lzt/ui react react-dom
```

```json
{
  "dependencies": {
    "@open-lzt/ui": "^0.1.0",
    "react": "^18",
    "react-dom": "^18"
  }
}
```

Need an unreleased version from `main` — install straight from git:

```bash
npm install github:open-lzt/lzt-ui
```

`react` and `react-dom` 18+ are peer dependencies — you install them. The built `dist/` is committed on purpose: npm doesn't run `prepare` when installing from a tarball, and without it a consumer would get empty exports.

## What's in the package

| Import | What it gives you |
|---|---|
| `@open-lzt/ui` | React components, types, `ThemeProvider` |
| `@open-lzt/ui/lzt-ui.css` | the whole style base, tokens and classes |
| `@open-lzt/ui/lzt-ui.js` | behaviour for plain HTML via `data-lzt-*` |
| `@open-lzt/ui/lzt-icons.js` | injects the SVG icon sprite |

The sprite is injected rather than served as an external file for a reason: `<use href="file.svg#id">` is blocked by CORS on `file://` and cross-origin, and the icons silently render nothing.

## React components

| Group | Components |
|---|---|
| Layout | `Shell` `Container` `Main` `Stack` `Grid` `Spacer` `Divider` · `Row` (`between?`, `wrap?`) |
| Buttons | `Button` (`variant`: `default` \| `primary` \| `danger` \| `outline` \| `ghost` \| `gradient`; `size`: `sm` \| `md` \| `lg`; `icon?` `block?` `loading?`) · `ButtonGroup` |
| Icon | `Icon` (`name` — without the `i-` prefix, `size?`) |
| Forms | `Field` `Label` · `Hint` (`error?`) · `Input` (`size?`, `invalid?`) `Textarea` `Select` `Search` · `Checkbox` `Switch` (`label?`) |
| Data | `Block` `Card` `Stat` · `Table` `Thead` `Tbody` `Tr` `Th` `Td` |
| Navigation | `Tabs` (`items`) · `Dropdown` (`trigger`) · `Menu` `MenuItem` (`danger?`) · `Pagenav` (`page`, `count`, `onChange`) |
| Feedback | `Modal` (`open`, `onClose`, `title?`) · `Progress` `Spinner` `Skeleton` |
| Toasts | `ToastProvider` · `useToast()` → `toast(msg, { tone })` |
| Forum | `Thread` (`unread?`) `ThreadMain` `ThreadTitle` `Post` `PostContent` `Spoiler` `Reactions` `Reaction` |

Theme: `ThemeProvider` (`defaultTheme` defaults to `dark`), the `useTheme()` hook → `{ theme, setTheme, toggle }`, and a ready `ThemeToggle` button. The choice is remembered; light mode is `data-theme="light"` on `<html>`.

## Plain-HTML hooks

`lzt-ui.js` attaches behaviour by attribute — you write no JS.

| Attribute | What it does |
|---|---|
| `data-lzt-tabs` | tab switching |
| `data-lzt-dropdown` | dropdown menu |
| `data-lzt-open` / `data-lzt-close` | open and close a modal |
| `data-lzt-panel` / `data-lzt-panel-group` | collapsible panels, group behaves as an accordion |
| `data-lzt-theme-toggle` | theme switch |
| `data-lzt-toast` / `data-lzt-toast-variant` | show a toast and set its tone |

## Icons

67 of them, on a 24×24 grid, 2px stroke, round caps, colour inherited via `currentColor`. Don't mix in filled glyphs — the optical weight breaks.

```html
<svg class="lzt-icon"><use href="#i-search"/></svg>
<svg class="lzt-icon lzt-icon--lg"><use href="#i-bell"/></svg>
```

<details>
<summary>All names</summary>

`alert` `arrow-down` `arrow-left` `arrow-right` `arrow-up` `bell` `bookmark` `bot` `calendar` `chart` `check` `chevron-down` `chevron-left` `chevron-right` `chevron-up` `clock` `code` `copy` `download` `edit` `external` `eye` `filter` `flame` `folder` `grid` `heart` `home` `image` `inbox` `info` `link` `list` `lock` `logout` `menu` `message` `messages` `minus` `moon` `more-h` `more-v` `package` `pin` `plus` `quote` `refresh` `reply` `search` `send` `settings` `share` `shield` `sliders` `sort` `star` `sun` `tag` `terminal` `trash` `unlock` `upload` `user` `users` `wallet` `x` `zap`

</details>

A live gallery is `demo/index.html` — opens as a file, no server needed.

## Development

```bash
npm run build       # tsup → dist/
npm run typecheck   # tsc --noEmit
python check.py     # CSS and HTML-demo checks
```

`check.py` verifies: CSS blocks balance, every `lzt-*` class used in markup is defined, every `var()` resolves, every `<use href="#i-*">` exists in the sprite, modal targets resolve, and no off-scale spacing is hand-rolled.

There are no unit tests, no JS linter and no CI in this repo — `check.py` and `typecheck` are the whole gate.

Fonts are not bundled: the base typeface is the system one until you wire up your own.

## Ecosystem

[auto-lzt](https://github.com/open-lzt/auto-lzt) — the panel built on this · [the whole stand](https://github.com/open-lzt/open-lzt)

## License

[MIT](LICENSE)
