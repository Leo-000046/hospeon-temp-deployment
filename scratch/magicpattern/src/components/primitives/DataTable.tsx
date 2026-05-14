import React from 'react';
import { cn } from '../../lib/cn';
export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'right' | 'center';
  render?: (row: T, idx: number) => React.ReactNode;
}
interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyState?: React.ReactNode;
  rowKey?: (row: T, idx: number) => string;
  dense?: boolean;
}
export function DataTable<T>({
  columns,
  data,
  onRowClick,
  emptyState,
  rowKey,
  dense
}: DataTableProps<T>) {
  if (data.length === 0 && emptyState) return <>{emptyState}</>;
  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line dark:border-line-dark">
            {columns.map((col) =>
            <th
              key={col.key}
              className={cn(
                'py-2.5 px-3 text-xs font-medium text-ink-secondary dark:text-ink-secondary-dark uppercase tracking-wide whitespace-nowrap',
                col.align === 'right' && 'text-right',
                col.align === 'center' && 'text-center',
                !col.align && 'text-left'
              )}
              style={{
                width: col.width
              }}>
              
                {col.header}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) =>
          <tr
            key={rowKey ? rowKey(row, idx) : idx}
            onClick={() => onRowClick?.(row)}
            className={cn(
              'border-b border-line dark:border-line-dark last:border-b-0',
              onRowClick &&
              'cursor-pointer hover:bg-subtle/60 dark:hover:bg-subtle-dark/60 transition-colors'
            )}>
            
              {columns.map((col) =>
            <td
              key={col.key}
              className={cn(
                'px-3 text-ink-primary dark:text-ink-primary-dark',
                dense ? 'py-2' : 'py-3',
                col.align === 'right' && 'text-right',
                col.align === 'center' && 'text-center'
              )}>
              
                  {col.render ?
              col.render(row, idx) :
              (row as Record<string, React.ReactNode>)[col.key] ??
              null}
                </td>
            )}
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}