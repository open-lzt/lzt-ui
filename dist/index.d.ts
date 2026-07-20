import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef, ReactElement, MouseEventHandler } from 'react';

type ClassValue = string | number | false | null | undefined;
/** Joins truthy class fragments with a space. Local stand-in for `clsx` — no new dependency. */
declare function cx(...values: ClassValue[]): string;

type Theme = 'light' | 'dark';
interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggle: () => void;
}
interface ThemeProviderProps {
    children: ReactNode;
    /** Theme assumed for the very first render, before localStorage is read. */
    defaultTheme?: Theme;
}
declare function ThemeProvider({ children, defaultTheme }: ThemeProviderProps): react.JSX.Element;
declare function useTheme(): ThemeContextValue;
interface ThemeToggleProps extends ComponentPropsWithoutRef<'button'> {
}
declare function ThemeToggle({ className, type, ...props }: ThemeToggleProps): react.JSX.Element;

type BoxProps = ComponentPropsWithoutRef<'div'>;
type ShellProps = BoxProps;
type ContainerProps = BoxProps;
type MainProps = BoxProps;
type StackProps = BoxProps;
type GridProps = BoxProps;
type SpacerProps = BoxProps;
declare const Shell: {
    ({ className, ...props }: BoxProps): react.JSX.Element;
    displayName: string;
};
declare const Container: {
    ({ className, ...props }: BoxProps): react.JSX.Element;
    displayName: string;
};
declare const Main: {
    ({ className, ...props }: BoxProps): react.JSX.Element;
    displayName: string;
};
declare const Stack: {
    ({ className, ...props }: BoxProps): react.JSX.Element;
    displayName: string;
};
declare const Grid: {
    ({ className, ...props }: BoxProps): react.JSX.Element;
    displayName: string;
};
declare const Spacer: {
    ({ className, ...props }: BoxProps): react.JSX.Element;
    displayName: string;
};
interface RowProps extends BoxProps {
    between?: boolean;
    wrap?: boolean;
}
declare function Row({ between, wrap, className, ...props }: RowProps): react.JSX.Element;
type DividerProps = ComponentPropsWithoutRef<'hr'>;
declare function Divider({ className, ...props }: DividerProps): react.JSX.Element;

type ButtonVariant = 'default' | 'primary' | 'danger' | 'outline' | 'ghost' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Square icon-only button (`lzt-btn--icon`). */
    icon?: boolean;
    block?: boolean;
    loading?: boolean;
}
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;
type ButtonGroupProps = ComponentPropsWithoutRef<'div'>;
declare function ButtonGroup({ className, ...props }: ButtonGroupProps): react.JSX.Element;

interface IconProps extends ComponentPropsWithoutRef<'svg'> {
    /** Sprite symbol name without the `i-` prefix, e.g. "search" for `#i-search`. */
    name: string;
    /** Pixel size. Omit to inherit `.lzt-icon` (16px) or a `--sm`/`--lg`/`--xl` modifier. */
    size?: number;
}
/** Requires the sprite from `lzt-icons.js` to be present on the page. */
declare function Icon({ name, size, className, ...props }: IconProps): react.JSX.Element;

type FieldProps = ComponentPropsWithoutRef<'div'>;
declare function Field({ className, ...props }: FieldProps): react.JSX.Element;
type LabelProps = ComponentPropsWithoutRef<'label'>;
declare function Label({ className, ...props }: LabelProps): react.JSX.Element;
interface HintProps extends ComponentPropsWithoutRef<'span'> {
    error?: boolean;
}
declare function Hint({ error, className, ...props }: HintProps): react.JSX.Element;
interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
    size?: 'sm' | 'md';
    invalid?: boolean;
}
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;
type TextareaProps = ComponentPropsWithoutRef<'textarea'>;
declare const Textarea: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & react.RefAttributes<HTMLTextAreaElement>>;
type SelectProps = ComponentPropsWithoutRef<'select'>;
declare const Select: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, "ref"> & react.RefAttributes<HTMLSelectElement>>;
type SearchProps = ComponentPropsWithoutRef<'input'>;
declare function Search({ className, ...props }: SearchProps): react.JSX.Element;
interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
    label?: ReactNode;
}
declare function Checkbox({ label, className, ...props }: CheckboxProps): react.JSX.Element;
interface RadioProps extends ComponentPropsWithoutRef<'input'> {
    label?: ReactNode;
}
declare function Radio({ label, className, ...props }: RadioProps): react.JSX.Element;
interface SwitchProps extends ComponentPropsWithoutRef<'input'> {
    label?: ReactNode;
}
declare function Switch({ label, className, ...props }: SwitchProps): react.JSX.Element;

interface BlockProps extends ComponentPropsWithoutRef<'div'> {
    accent?: boolean;
}
declare function Block({ accent, className, ...props }: BlockProps): react.JSX.Element;
type BlockHeaderProps = ComponentPropsWithoutRef<'div'>;
declare function BlockHeader({ className, ...props }: BlockHeaderProps): react.JSX.Element;
type BlockBodyProps = ComponentPropsWithoutRef<'div'>;
declare function BlockBody({ className, ...props }: BlockBodyProps): react.JSX.Element;
type BlockFooterProps = ComponentPropsWithoutRef<'div'>;
declare function BlockFooter({ className, ...props }: BlockFooterProps): react.JSX.Element;
interface CardProps extends ComponentPropsWithoutRef<'div'> {
    hover?: boolean;
}
declare function Card({ hover, className, ...props }: CardProps): react.JSX.Element;
interface StatProps extends ComponentPropsWithoutRef<'div'> {
    label: ReactNode;
    value: ReactNode;
    delta?: ReactNode;
    trend?: 'up' | 'down';
}
declare function Stat({ label, value, delta, trend, className, ...props }: StatProps): react.JSX.Element;
type BadgeTone = 'default' | 'brand' | 'danger' | 'warning' | 'info' | 'premium';
interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
    tone?: BadgeTone;
    pill?: boolean;
}
declare function Badge({ tone, pill, className, ...props }: BadgeProps): react.JSX.Element;
interface TagProps extends ComponentPropsWithoutRef<'button'> {
    active?: boolean;
}
declare function Tag({ active, className, type, ...props }: TagProps): react.JSX.Element;
interface ChipProps extends ComponentPropsWithoutRef<'span'> {
    onRemove?: () => void;
}
declare function Chip({ onRemove, className, children, ...props }: ChipProps): react.JSX.Element;
type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarStatus = 'online' | 'busy';
interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
    src?: string;
    alt?: string;
    size?: AvatarSize;
    round?: boolean;
    ring?: boolean;
    status?: AvatarStatus;
}
declare function Avatar({ src, alt, size, round, ring, status, className, children, ...props }: AvatarProps): react.JSX.Element;
type AlertTone = 'default' | 'success' | 'danger' | 'warning' | 'info';
interface AlertProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
    tone?: AlertTone;
    title?: ReactNode;
}
declare function Alert({ tone, title, className, children, ...props }: AlertProps): react.JSX.Element;
interface EmptyProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
    icon?: ReactNode;
    title?: ReactNode;
}
declare function Empty({ icon, title, className, children, ...props }: EmptyProps): react.JSX.Element;
interface TableProps extends ComponentPropsWithoutRef<'table'> {
    /** Right-aligns + tabular-nums the last column (`lzt-table--num`). */
    numeric?: boolean;
}
declare function Table({ numeric, className, children, ...props }: TableProps): react.JSX.Element;

type TopbarProps = ComponentPropsWithoutRef<'header'>;
declare function Topbar({ className, children, ...props }: TopbarProps): react.JSX.Element;
interface LogoProps extends ComponentPropsWithoutRef<'div'> {
    mark?: ReactNode;
}
declare function Logo({ mark, className, children, ...props }: LogoProps): react.JSX.Element;
interface SidenavProps extends ComponentPropsWithoutRef<'nav'> {
    label?: ReactNode;
}
declare function Sidenav({ label, className, children, ...props }: SidenavProps): react.JSX.Element;
interface SidenavItemProps extends ComponentPropsWithoutRef<'a'> {
    active?: boolean;
    count?: ReactNode;
}
declare function SidenavItem({ active, count, className, children, ...props }: SidenavItemProps): react.JSX.Element;
interface TabItem {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}
interface TabsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
    items: TabItem[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}
declare function Tabs({ items, value, defaultValue, onChange, className, ...props }: TabsProps): react.JSX.Element;
interface SegmentedItem {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}
interface SegmentedProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
    items: SegmentedItem[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}
declare function Segmented({ items, value, defaultValue, onChange, className, ...props }: SegmentedProps): react.JSX.Element;
interface BreadcrumbItem {
    label: ReactNode;
    href?: string;
}
interface BreadcrumbProps extends ComponentPropsWithoutRef<'nav'> {
    items: BreadcrumbItem[];
}
declare function Breadcrumb({ items, className, ...props }: BreadcrumbProps): react.JSX.Element;
interface PagenavProps extends Omit<ComponentPropsWithoutRef<'nav'>, 'onChange'> {
    page: number;
    count: number;
    onChange: (page: number) => void;
    siblingCount?: number;
}
declare function Pagenav({ page, count, onChange, siblingCount, className, ...props }: PagenavProps): react.JSX.Element;
interface DropdownProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onClick'> {
    trigger: ReactElement<{
        onClick?: MouseEventHandler;
    }>;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
declare function Dropdown({ trigger, open, defaultOpen, onOpenChange, className, children, ...props }: DropdownProps): react.JSX.Element;
type MenuProps = ComponentPropsWithoutRef<'div'>;
declare function Menu({ className, ...props }: MenuProps): react.JSX.Element;
interface MenuItemProps extends ComponentPropsWithoutRef<'button'> {
    danger?: boolean;
    /** Close the parent Dropdown after this item is clicked. Default true. */
    closeOnClick?: boolean;
}
declare function MenuItem({ danger, closeOnClick, className, onClick, type, ...props }: MenuItemProps): react.JSX.Element;
type MenuSepProps = ComponentPropsWithoutRef<'div'>;
declare function MenuSep({ className, ...props }: MenuSepProps): react.JSX.Element;

interface ModalProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    footer?: ReactNode;
}
declare function Modal({ open, onClose, title, footer, className, children, ...props }: ModalProps): react.JSX.Element | null;
interface TooltipProps extends ComponentPropsWithoutRef<'span'> {
    content: string;
}
declare function Tooltip({ content, className, children, ...props }: TooltipProps): react.JSX.Element;
interface ProgressProps extends ComponentPropsWithoutRef<'div'> {
    /** 0–100 */
    value: number;
    flow?: boolean;
}
declare function Progress({ value, flow, className, ...props }: ProgressProps): react.JSX.Element;
type LoaderBarProps = ComponentPropsWithoutRef<'div'>;
declare function LoaderBar({ className, ...props }: LoaderBarProps): react.JSX.Element;
interface SpinnerProps extends ComponentPropsWithoutRef<'div'> {
    size?: 'md' | 'lg';
}
declare function Spinner({ size, className, ...props }: SpinnerProps): react.JSX.Element;
type DotsProps = ComponentPropsWithoutRef<'span'>;
declare function Dots({ className, ...props }: DotsProps): react.JSX.Element;
type SkeletonVariant = 'text' | 'title' | 'avatar';
interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
    variant?: SkeletonVariant;
}
declare function Skeleton({ variant, className, ...props }: SkeletonProps): react.JSX.Element;

type ToastTone = 'default' | 'danger' | 'warning';
interface ToastOptions {
    tone?: ToastTone;
    /** ms before auto-dismiss. Default 4000. */
    duration?: number;
}
interface ToastContextValue {
    show: (message: ReactNode, options?: ToastOptions) => number;
    dismiss: (id: number) => void;
}
declare function ToastProvider({ children }: {
    children: ReactNode;
}): react.JSX.Element;
declare function useToast(): ToastContextValue;

interface ThreadProps extends ComponentPropsWithoutRef<'div'> {
    unread?: boolean;
    pinned?: boolean;
}
declare function Thread({ unread, pinned, className, ...props }: ThreadProps): react.JSX.Element;
type ThreadMainProps = ComponentPropsWithoutRef<'div'>;
declare function ThreadMain({ className, ...props }: ThreadMainProps): react.JSX.Element;
type ThreadTitleProps = ComponentPropsWithoutRef<'div'>;
declare function ThreadTitle({ className, ...props }: ThreadTitleProps): react.JSX.Element;
type ThreadMetaProps = ComponentPropsWithoutRef<'div'>;
declare function ThreadMeta({ className, ...props }: ThreadMetaProps): react.JSX.Element;
type ThreadStatsProps = ComponentPropsWithoutRef<'div'>;
declare function ThreadStats({ className, ...props }: ThreadStatsProps): react.JSX.Element;
interface ThreadStatProps extends ComponentPropsWithoutRef<'div'> {
    value: ReactNode;
    label: ReactNode;
}
declare function ThreadStat({ value, label, className, ...props }: ThreadStatProps): react.JSX.Element;
interface PostProps extends ComponentPropsWithoutRef<'div'> {
    op?: boolean;
}
declare function Post({ op, className, ...props }: PostProps): react.JSX.Element;
type PostUserProps = ComponentPropsWithoutRef<'div'>;
declare function PostUser({ className, ...props }: PostUserProps): react.JSX.Element;
type PostNameProps = ComponentPropsWithoutRef<'div'>;
declare function PostName({ className, ...props }: PostNameProps): react.JSX.Element;
type PostRoleProps = ComponentPropsWithoutRef<'div'>;
declare function PostRole({ className, ...props }: PostRoleProps): react.JSX.Element;
type PostUserStatsProps = ComponentPropsWithoutRef<'div'>;
declare function PostUserStats({ className, ...props }: PostUserStatsProps): react.JSX.Element;
type PostBodyProps = ComponentPropsWithoutRef<'div'>;
declare function PostBody({ className, ...props }: PostBodyProps): react.JSX.Element;
type PostHeadProps = ComponentPropsWithoutRef<'div'>;
declare function PostHead({ className, ...props }: PostHeadProps): react.JSX.Element;
type PostContentProps = ComponentPropsWithoutRef<'div'>;
declare function PostContent({ className, ...props }: PostContentProps): react.JSX.Element;
type PostFootProps = ComponentPropsWithoutRef<'div'>;
declare function PostFoot({ className, ...props }: PostFootProps): react.JSX.Element;
interface QuoteProps extends ComponentPropsWithoutRef<'blockquote'> {
    author?: ReactNode;
}
declare function Quote({ author, className, children, ...props }: QuoteProps): react.JSX.Element;
type CodeProps = ComponentPropsWithoutRef<'pre'>;
declare function Code({ className, children, ...props }: CodeProps): react.JSX.Element;
interface SpoilerProps extends ComponentPropsWithoutRef<'div'> {
    label: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
declare function Spoiler({ label, open, defaultOpen, onOpenChange, className, children, ...props }: SpoilerProps): react.JSX.Element;
type ReactionsProps = ComponentPropsWithoutRef<'div'>;
declare function Reactions({ className, ...props }: ReactionsProps): react.JSX.Element;
interface ReactionProps extends ComponentPropsWithoutRef<'button'> {
    mine?: boolean;
}
declare function Reaction({ mine, className, type, ...props }: ReactionProps): react.JSX.Element;

export { Alert, type AlertProps, type AlertTone, Avatar, type AvatarProps, type AvatarSize, type AvatarStatus, Badge, type BadgeProps, type BadgeTone, Block, BlockBody, type BlockBodyProps, BlockFooter, type BlockFooterProps, BlockHeader, type BlockHeaderProps, type BlockProps, Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, Button, ButtonGroup, type ButtonGroupProps, type ButtonProps, type ButtonSize, type ButtonVariant, Card, type CardProps, Checkbox, type CheckboxProps, Chip, type ChipProps, type ClassValue, Code, type CodeProps, Container, type ContainerProps, Divider, type DividerProps, Dots, type DotsProps, Dropdown, type DropdownProps, Empty, type EmptyProps, Field, type FieldProps, Grid, type GridProps, Hint, type HintProps, Icon, type IconProps, Input, type InputProps, Label, type LabelProps, LoaderBar, type LoaderBarProps, Logo, type LogoProps, Main, type MainProps, Menu, MenuItem, type MenuItemProps, type MenuProps, MenuSep, type MenuSepProps, Modal, type ModalProps, Pagenav, type PagenavProps, Post, PostBody, type PostBodyProps, PostContent, type PostContentProps, PostFoot, type PostFootProps, PostHead, type PostHeadProps, PostName, type PostNameProps, type PostProps, PostRole, type PostRoleProps, PostUser, type PostUserProps, PostUserStats, type PostUserStatsProps, Progress, type ProgressProps, Quote, type QuoteProps, Radio, type RadioProps, Reaction, type ReactionProps, Reactions, type ReactionsProps, Row, type RowProps, Search, type SearchProps, Segmented, type SegmentedItem, type SegmentedProps, Select, type SelectProps, Shell, type ShellProps, Sidenav, SidenavItem, type SidenavItemProps, type SidenavProps, Skeleton, type SkeletonProps, type SkeletonVariant, Spacer, type SpacerProps, Spinner, type SpinnerProps, Spoiler, type SpoilerProps, Stack, type StackProps, Stat, type StatProps, Switch, type SwitchProps, type TabItem, Table, type TableProps, Tabs, type TabsProps, Tag, type TagProps, Textarea, type TextareaProps, type Theme, type ThemeContextValue, ThemeProvider, type ThemeProviderProps, ThemeToggle, type ThemeToggleProps, Thread, ThreadMain, type ThreadMainProps, ThreadMeta, type ThreadMetaProps, type ThreadProps, ThreadStat, type ThreadStatProps, ThreadStats, type ThreadStatsProps, ThreadTitle, type ThreadTitleProps, type ToastContextValue, type ToastOptions, ToastProvider, type ToastTone, Tooltip, type TooltipProps, Topbar, type TopbarProps, cx, useTheme, useToast };
