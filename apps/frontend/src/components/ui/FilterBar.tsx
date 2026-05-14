import React from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from './Input';
import { cn } from '@/lib/cn';
interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  children?: React.ReactNode;
  rightActions?: React.ReactNode;
  className?: string;
}
export function FilterBar({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  children,
  rightActions,
  className
}: FilterBarProps) {
  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row lg:items-center gap-3 mb-4',
        className
      )}>
      
      <div className="flex-1 max-w-md">
        <Input
          icon={<SearchIcon />}
          placeholder={searchPlaceholder || 'Search…'}
          value={searchValue || ''}
          onChange={(e) => onSearchChange?.(e.target.value)} />
        
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      {rightActions &&
      <div className="lg:ml-auto flex items-center gap-2">{rightActions}</div>
      }
    </div>);

}
interface ChipProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  count?: number;
}
export function FilterChip({ active, onClick, children, count }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-9 px-3 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5',
        active ?
        'bg-ink-primary text-white dark:bg-ink-primary-dark dark:text-ink-primary' :
        'bg-surface dark:bg-surface-dark border border-line dark:border-line-dark text-ink-secondary hover:text-ink-primary hover:bg-subtle dark:hover:bg-subtle-dark'
      )}>
      
      {children}
      {count !== undefined &&
      <span
        className={cn(
          'font-mono tabular-nums',
          active ? 'opacity-80' : 'text-ink-tertiary'
        )}>
        
          {count}
        </span>
      }
    </button>);

}