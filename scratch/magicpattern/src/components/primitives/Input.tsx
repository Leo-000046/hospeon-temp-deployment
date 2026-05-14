import React from 'react';
import { cn } from '../../lib/cn';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  label?: string;
  hint?: string;
  mono?: boolean;
}
export function Input({
  icon,
  iconRight,
  error,
  label,
  hint,
  mono,
  className,
  id,
  ...rest
}: InputProps) {
  const inputId = id || rest.name;
  return (
    <div className="w-full">
      {label &&
      <label
        htmlFor={inputId}
        className="block text-xs font-medium text-ink-primary dark:text-ink-primary-dark mb-1.5">
        
          {label}
        </label>
      }
      <div className="relative">
        {icon &&
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-tertiary [&>svg]:w-4 [&>svg]:h-4 pointer-events-none">
            {icon}
          </span>
        }
        <input
          id={inputId}
          className={cn(
            'w-full h-9 rounded-lg bg-surface dark:bg-surface-dark border border-line dark:border-line-dark',
            'text-sm text-ink-primary dark:text-ink-primary-dark placeholder:text-ink-tertiary',
            'transition-colors focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15',
            icon ? 'pl-9' : 'pl-3',
            iconRight ? 'pr-9' : 'pr-3',
            mono && 'font-mono tabular-nums',
            error && 'border-danger focus:border-danger focus:ring-danger/15',
            className
          )}
          {...rest} />
        
        {iconRight &&
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-tertiary [&>svg]:w-4 [&>svg]:h-4">
            {iconRight}
          </span>
        }
      </div>
      {hint && !error &&
      <p className="mt-1 text-xs text-ink-tertiary">{hint}</p>
      }
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>);

}
export function Textarea({
  label,
  hint,
  error,
  className,
  id,
  rows = 4,
  ...rest




}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {label?: string;hint?: string;error?: string;}) {
  const tId = id || rest.name;
  return (
    <div className="w-full">
      {label &&
      <label
        htmlFor={tId}
        className="block text-xs font-medium mb-1.5 text-ink-primary dark:text-ink-primary-dark">
        
          {label}
        </label>
      }
      <textarea
        id={tId}
        rows={rows}
        className={cn(
          'w-full rounded-lg bg-surface dark:bg-surface-dark border border-line dark:border-line-dark px-3 py-2',
          'text-sm placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15',
          error && 'border-danger',
          className
        )}
        {...rest} />
      
      {hint && !error &&
      <p className="mt-1 text-xs text-ink-tertiary">{hint}</p>
      }
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>);

}
export function Select({
  label,
  hint,
  error,
  className,
  id,
  children,
  ...rest




}: React.SelectHTMLAttributes<HTMLSelectElement> & {label?: string;hint?: string;error?: string;}) {
  const sId = id || rest.name;
  return (
    <div className="w-full">
      {label &&
      <label
        htmlFor={sId}
        className="block text-xs font-medium mb-1.5 text-ink-primary dark:text-ink-primary-dark">
        
          {label}
        </label>
      }
      <select
        id={sId}
        className={cn(
          'w-full h-9 rounded-lg bg-surface dark:bg-surface-dark border border-line dark:border-line-dark px-3',
          'text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15',
          error && 'border-danger',
          className
        )}
        {...rest}>
        
        {children}
      </select>
      {hint && !error &&
      <p className="mt-1 text-xs text-ink-tertiary">{hint}</p>
      }
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>);

}