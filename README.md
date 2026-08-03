<p align="right"><a href="README.en.md">English</a> · <b>Русский</b></p>

# lzt-ui

Дизайн-система экосистемы [open-lzt](https://github.com/open-lzt/open-lzt): CSS-кит, набор иконок и React-биндинги. Тёмная тема по умолчанию.

Ванильный HTML — без сборки:

```html
<link rel="stylesheet" href="lzt-ui.css">
<script src="lzt-icons.js"></script>
<script src="lzt-ui.js"></script>

<button class="lzt-btn lzt-btn--primary">Сохранить</button>
<svg class="lzt-icon"><use href="#i-search"/></svg>
```

React:

```tsx
import '@open-lzt/ui/lzt-ui.css';
import { Button, Icon, ThemeProvider } from '@open-lzt/ui';

export function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">Сохранить</Button>
      <Icon name="search" />
    </ThemeProvider>
  );
}
```

## Установка

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

Нужна ещё не выпущенная версия с `main` — ставится прямо из git:

```bash
npm install github:open-lzt/lzt-ui
```

`react` и `react-dom` версии 18+ — peer-зависимости, их ставите вы. Собранный `dist/` закоммичен намеренно: npm не запускает `prepare` при установке из tarball, и без него потребитель получил бы пустые экспорты.

## Что в пакете

| Импорт | Что даёт |
|---|---|
| `@open-lzt/ui` | React-компоненты, типы, `ThemeProvider` |
| `@open-lzt/ui/lzt-ui.css` | вся стилевая база, токены и классы |
| `@open-lzt/ui/lzt-ui.js` | поведение для ванильного HTML через `data-lzt-*` |
| `@open-lzt/ui/lzt-icons.js` | инъекция SVG-спрайта иконок |

Спрайт именно инъектируется, а не лежит внешним файлом: `<use href="file.svg#id">` режется CORS на `file://` и на другом домене, и иконки молча не рисуются.

## React-компоненты

| Группа | Компоненты |
|---|---|
| Каркас | `Shell` `Container` `Main` `Stack` `Grid` `Spacer` `Divider` · `Row` (`between?`, `wrap?`) |
| Кнопки | `Button` (`variant`: `default` \| `primary` \| `danger` \| `outline` \| `ghost` \| `gradient`; `size`: `sm` \| `md` \| `lg`; `icon?` `block?` `loading?`) · `ButtonGroup` |
| Иконка | `Icon` (`name` — без префикса `i-`, `size?`) |
| Формы | `Field` `Label` · `Hint` (`error?`) · `Input` (`size?`, `invalid?`) `Textarea` `Search` · `Checkbox` `Radio` `Switch` (`label?`) |
| Свои контролы | `Select` (`options`, `value`, `onChange`, `name?`) · `Calendar` `DatePicker` `DateTimePicker` (ISO `YYYY-MM-DD`) · `Slider` (`min` `max` `step` `unit?`) · `useAnchored` — позиционер поповеров |
| Данные | `Block` `Card` `Stat` · `Table` `Thead` `Tbody` `Tr` `Th` `Td` |
| Навигация | `Tabs` (`items`) · `Dropdown` (`trigger`) · `Menu` `MenuItem` (`danger?`) · `Pagenav` (`page`, `count`, `onChange`) |
| Фидбек | `Modal` (`open`, `onClose`, `title?`) · `Progress` `Spinner` `Skeleton` |
| Тосты | `ToastProvider` · `useToast()` → `toast(msg, { tone })` |
| Форум | `Thread` (`unread?`) `ThreadMain` `ThreadTitle` `Post` `PostContent` `Spoiler` `Reactions` `Reaction` |

Тема: `ThemeProvider` (`defaultTheme` по умолчанию `dark`), хук `useTheme()` → `{ theme, setTheme, toggle }`, готовая кнопка `ThemeToggle`. Выбор запоминается, светлая включается атрибутом `data-theme="light"` на `<html>`.

## Ванильные хуки

`lzt-ui.js` навешивает поведение по атрибутам — своего JS писать не нужно.

| Атрибут | Что делает |
|---|---|
| `data-lzt-tabs` | переключение вкладок |
| `data-lzt-dropdown` | выпадающее меню |
| `data-lzt-open` / `data-lzt-close` | открыть и закрыть модалку |
| `data-lzt-panel` / `data-lzt-panel-group` | раскрывающиеся панели, группа с аккордеоном |
| `data-lzt-theme-toggle` | переключатель темы |
| `data-lzt-toast` / `data-lzt-toast-variant` | показать тост и его тон |

## Иконки

67 штук, сетка 24×24, обводка 2px, скруглённые концы, цвет наследуется через `currentColor`. Не подмешивайте залитые глифы — оптический вес поедет.

```html
<svg class="lzt-icon"><use href="#i-search"/></svg>
<svg class="lzt-icon lzt-icon--lg"><use href="#i-bell"/></svg>
```

<details>
<summary>Все имена</summary>

`alert` `arrow-down` `arrow-left` `arrow-right` `arrow-up` `bell` `bookmark` `bot` `calendar` `chart` `check` `chevron-down` `chevron-left` `chevron-right` `chevron-up` `clock` `code` `copy` `download` `edit` `external` `eye` `filter` `flame` `folder` `grid` `heart` `home` `image` `inbox` `info` `link` `list` `lock` `logout` `menu` `message` `messages` `minus` `moon` `more-h` `more-v` `package` `pin` `plus` `quote` `refresh` `reply` `search` `send` `settings` `share` `shield` `sliders` `sort` `star` `sun` `tag` `terminal` `trash` `unlock` `upload` `user` `users` `wallet` `x` `zap`

</details>

Живая галерея — `demo/index.html`, открывается файлом, сервер не нужен.

## Разработка

```bash
npm run build       # tsup → dist/
npm run typecheck   # tsc --noEmit
python check.py     # проверка CSS и HTML-демо
```

`check.py` сверяет: баланс блоков в CSS, что каждый использованный класс `lzt-*` объявлен, что каждый `var()` резолвится, что каждый `<use href="#i-*">` есть в спрайте, что цели модалок существуют и что в разметке нет отступов вне шкалы.

Юнит-тестов, линтера JS и CI в репозитории нет — `check.py` и `typecheck` и есть весь гейт.

Шрифты не приложены: базовое начертание — системное, пока вы не подключите своё.

## Экосистема

[auto-lzt](https://github.com/open-lzt/auto-lzt) — панель, которая на этом собрана · [весь стенд](https://github.com/open-lzt/open-lzt)

## Лицензия

[MIT](LICENSE)
