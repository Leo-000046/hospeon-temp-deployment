import React from 'react';
import { InboxIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  compact?: boolean;
}
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  compact = false
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'py-10' : 'py-16',
        className
      )}>
      
      <div className="w-12 h-12 rounded-2xl bg-subtle dark:bg-subtle-dark flex items-center justify-center text-ink-tertiary mb-4 [&>svg]:w-5 [&>svg]:h-5">
        {icon || <InboxIcon />}
      </div>
      <h3 className="text-sm font-semibold text-ink-primary dark:text-ink-primary-dark">
        {title}
      </h3>
      {description &&
      <p className="mt-1 text-sm text-ink-secondary dark:text-ink-secondary-dark max-w-sm">
          {description}
        </p>
      }
      {action && <div className="mt-4">{action}</div>}
    </div>);

}
export function LoadingSkeleton({
  rows = 5,
  className



}: {rows?: number;className?: string;}) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({
        length: rows
      }).map((_, i) =>
      <div
        key={i}
        className="h-10 rounded-lg bg-subtle dark:bg-subtle-dark animate-pulse" />

      )}
    </div>);

}