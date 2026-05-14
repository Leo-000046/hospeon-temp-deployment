import React from 'react';
import { cn } from '../../lib/cn';
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'subtle';
type Size = 'sm' | 'md' | 'lg';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}
const variantStyles: Record<Variant, string> = {
  primary:
  'bg-accent text-white hover:bg-accent/90 active:bg-accent/80 disabled:bg-accent/40',
  secondary:
  'bg-surface dark:bg-surface-dark text-ink-primary dark:text-ink-primary-dark border border-line dark:border-line-dark hover:bg-subtle dark:hover:bg-subtle-dark',
  ghost:
  'text-ink-secondary dark:text-ink-secondary-dark hover:bg-subtle dark:hover:bg-subtle-dark hover:text-ink-primary dark:hover:text-ink-primary-dark',
  danger: 'bg-danger text-white hover:bg-danger/90',
  subtle:
  'bg-subtle dark:bg-subtle-dark text-ink-primary dark:text-ink-primary-dark hover:bg-line dark:hover:bg-line-dark'
};
const sizeStyles: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-3.5 text-sm',
  lg: 'h-10 px-4 text-sm'
};
export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  iconRight,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-1 focus-visible:ring-offset-canvas',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      {...rest}>
      
      {icon && <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4">{icon}</span>}
      {children}
      {iconRight &&
      <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4">{iconRight}</span>
      }
    </button>);

}
// Icon-only button
export function IconButton({
  className,
  children,
  size = 'md',
  variant = 'ghost',
  ...rest
}: Omit<ButtonProps, 'icon' | 'iconRight'>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
        variantStyles[variant],
        size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-10 w-10' : 'h-9 w-9',
        '[&>svg]:w-4 [&>svg]:h-4',
        className
      )}
      {...rest}>
      
      {children}
    </button>);

}