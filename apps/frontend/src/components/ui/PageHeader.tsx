import React, { Fragment } from 'react';
import { ChevronRightIcon } from 'lucide-react';
interface Crumb {
  label: string;
  href?: string;
  to?: string;
}
interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  actions?: React.ReactNode;
  meta?: React.ReactNode;
}
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  meta
}: PageHeaderProps) {
  return (
    <div className="mb-5 sm:mb-6">
      {breadcrumbs && breadcrumbs.length > 0 &&
      <nav className="flex flex-wrap items-center gap-1 text-xs text-ink-tertiary mb-2">
          {breadcrumbs.map((c, i) =>
        <Fragment key={i}>
              {i > 0 && <ChevronRightIcon className="w-3 h-3 shrink-0" />}
              {c.href ?
          <a
            href={c.href}
            className="hover:text-ink-primary dark:hover:text-ink-primary-dark">
            
                  {c.label}
                </a> :

          <span className="truncate max-w-[180px] sm:max-w-none">
                  {c.label}
                </span>
          }
            </Fragment>
        )}
        </nav>
      }
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-ink-primary dark:text-ink-primary-dark tracking-tight break-words">
            {title}
          </h1>
          {description &&
          <p className="mt-1 text-sm text-ink-secondary dark:text-ink-secondary-dark max-w-2xl">
              {description}
            </p>
          }
          {meta && <div className="mt-2">{meta}</div>}
        </div>
        {actions &&
        <div className="flex items-center gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap sm:shrink-0 sm:justify-end [&>*]:shrink-0">
            {actions}
          </div>
        }
      </div>
    </div>);

}