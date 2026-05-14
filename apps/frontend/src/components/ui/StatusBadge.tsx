import React from 'react';
import { cn } from '@/lib/cn';
type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
interface StatusBadgeProps {
  children: React.ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}
const toneStyles: Record<Tone, string> = {
  neutral:
  'bg-subtle text-ink-secondary dark:bg-subtle-dark dark:text-ink-secondary-dark',
  info: 'bg-info-soft text-info dark:bg-info-soft-dark',
  success: 'bg-success-soft text-success dark:bg-success-soft-dark',
  warning: 'bg-warning-soft text-warning dark:bg-warning-soft-dark',
  danger: 'bg-danger-soft text-danger dark:bg-danger-soft-dark',
  accent: 'bg-accent-soft text-accent dark:bg-accent-soft-dark'
};
const dotStyles: Record<Tone, string> = {
  neutral: 'bg-ink-tertiary',
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  accent: 'bg-accent'
};
export function StatusBadge({
  children,
  tone = 'neutral',
  dot = false,
  className,
  size = 'sm'
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
        toneStyles[tone],
        className
      )}>
      
      {dot &&
      <span className={cn('w-1.5 h-1.5 rounded-full', dotStyles[tone])} />
      }
      {children}
    </span>);

}
// Auto-map common statuses to tones
export function AutoStatusBadge({ status }: {status: string;}) {
  const s = status.toLowerCase();
  let tone: Tone = 'neutral';
  if (
  ['paid', 'completed', 'approved', 'active', 'available', 'ready'].some(
    (k) => s.includes(k)
  ))

  tone = 'success';else
  if (
  [
  'waiting',
  'in consultation',
  'in progress',
  'pending review',
  'partial',
  'arrived'].
  some((k) => s.includes(k)))

  tone = 'info';else
  if (
  [
  'pending',
  'lab pending',
  'pharmacy pending',
  'booked',
  'expiring',
  'cleaning'].
  some((k) => s.includes(k)))

  tone = 'warning';else
  if (
  ['no-show', 'cancelled', 'out', 'critical', 'expired', 'overdue'].some(
    (k) => s.includes(k)
  ))

  tone = 'danger';
  return (
    <StatusBadge tone={tone} dot>
      {status}
    </StatusBadge>);

}