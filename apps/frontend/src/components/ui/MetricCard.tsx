import React from 'react';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { Card } from './Card';
import { MonoNumber } from './MonoNumber';
import { cn } from '@/lib/cn';
interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: {
    value: string;
    trend: 'up' | 'down' | 'flat';
    tone?: 'positive' | 'negative' | 'neutral';
  };
  sublabel?: string;
  icon?: React.ReactNode;
  tone?: 'default' | 'warning' | 'danger';
}
export function MetricCard({
  label,
  value,
  delta,
  sublabel,
  icon,
  tone = 'default'
}: MetricCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-medium text-ink-secondary dark:text-ink-secondary-dark uppercase tracking-wide">
          {label}
        </span>
        {icon &&
        <span
          className={cn(
            'shrink-0 w-8 h-8 rounded-lg flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4',
            tone === 'warning' && 'bg-warning-soft text-warning',
            tone === 'danger' && 'bg-danger-soft text-danger',
            tone === 'default' &&
            'bg-subtle dark:bg-subtle-dark text-ink-secondary'
          )}>
          
            {icon}
          </span>
        }
      </div>
      <div className="flex items-baseline gap-2">
        <MonoNumber
          size="3xl"
          weight="semibold"
          className="text-ink-primary dark:text-ink-primary-dark">
          
          {value}
        </MonoNumber>
        {sublabel &&
        <span className="text-sm text-ink-tertiary">{sublabel}</span>
        }
      </div>
      {delta &&
      <div
        className={cn(
          'mt-3 inline-flex items-center gap-1 text-xs',
          delta.tone === 'positive' && 'text-success',
          delta.tone === 'negative' && 'text-danger',
          (!delta.tone || delta.tone === 'neutral') && 'text-ink-secondary'
        )}>
        
          {delta.trend === 'up' && <TrendingUpIcon className="w-3.5 h-3.5" />}
          {delta.trend === 'down' &&
        <TrendingDownIcon className="w-3.5 h-3.5" />
        }
          <MonoNumber size="xs">{delta.value}</MonoNumber>
          <span className="text-ink-tertiary">vs yesterday</span>
        </div>
      }
    </Card>);

}