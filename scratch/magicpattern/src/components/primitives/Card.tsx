import React from 'react';
import { cn } from '../../lib/cn';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padded?: boolean;
}
export function Card({
  children,
  className,
  padded = true,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface dark:bg-surface-dark border border-line dark:border-line-dark rounded-2xl shadow-softer',
        padded && 'p-5',
        className
      )}
      {...rest}>
      
      {children}
    </div>);

}
interface SectionTitleProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}
export function SectionTitle({
  title,
  description,
  action,
  className
}: SectionTitleProps) {
  return (
    <div
      className={cn('flex items-start justify-between gap-4 mb-4', className)}>
      
      <div>
        <h3 className="text-sm font-semibold text-ink-primary dark:text-ink-primary-dark">
          {title}
        </h3>
        {description &&
        <p className="text-xs text-ink-secondary dark:text-ink-secondary-dark mt-0.5">
            {description}
          </p>
        }
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>);

}