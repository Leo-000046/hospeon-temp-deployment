import React, { useState } from 'react';
import {
  ClockIcon,
  RefreshCwIcon,
  MonitorIcon,
  PlusIcon,
  ChevronRightIcon,
  PhoneIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FilterBar, FilterChip } from '@/components/ui/FilterBar';
import { DataTable, Column } from '@/components/ui/DataTable';
import { MonoNumber } from '@/components/ui/MonoNumber';
import {
  AutoStatusBadge,
  StatusBadge } from
'@/components/ui/StatusBadge';
const queue: any[] = [];
export function Queue() {
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const cols: Column<(typeof queue)[number]>[] = [
  {
    key: 'token',
    header: 'Token',
    width: '100px',
    render: (r) =>
    <div className="inline-flex items-center justify-center min-w-[64px] h-8 px-2 rounded-lg bg-subtle dark:bg-subtle-dark">
          <MonoNumber weight="semibold" size="sm">
            {r.token}
          </MonoNumber>
        </div>

  },
  {
    key: 'patient',
    header: 'Patient',
    render: (r) =>
    <div>
          <div className="font-medium">{r.patient}</div>
          <div className="text-xs text-ink-tertiary">
            <MonoNumber size="xs">{r.pid}</MonoNumber>
          </div>
        </div>

  },
  {
    key: 'doctor',
    header: 'Doctor',
    render: (r) => <span className="text-ink-secondary">{r.doctor}</span>
  },
  {
    key: 'time',
    header: 'Appt time',
    render: (r) => <MonoNumber size="sm">{r.time}</MonoNumber>
  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <AutoStatusBadge status={r.status} />
  },
  {
    key: 'waited',
    header: 'Waiting',
    render: (r) =>
    <span
      className={
      r.waited !== '—' && parseInt(r.waited) > 20 ?
      'text-warning font-medium' :
      'text-ink-secondary'
      }>
      
          <MonoNumber size="sm">{r.waited}</MonoNumber>
        </span>

  },
  {
    key: 'payment',
    header: 'Payment',
    render: (r) => <AutoStatusBadge status={r.payment} />
  },
  {
    key: 'actions',
    header: '',
    width: '100px',
    render: () =>
    <Button size="sm" variant="ghost" iconRight={<ChevronRightIcon />}>
          Open
        </Button>

  }];

  const statusGroups: {
    key: string;
    label: string;
    tone: any;
  }[] = [
  {
    key: 'Booked',
    label: 'Booked',
    tone: 'neutral'
  },
  {
    key: 'Arrived',
    label: 'Arrived',
    tone: 'info'
  },
  {
    key: 'Waiting',
    label: 'Waiting',
    tone: 'info'
  },
  {
    key: 'In consultation',
    label: 'In consultation',
    tone: 'accent'
  },
  {
    key: 'Lab pending',
    label: 'Lab pending',
    tone: 'warning'
  },
  {
    key: 'Pharmacy pending',
    label: 'Pharmacy pending',
    tone: 'warning'
  },
  {
    key: 'Completed',
    label: 'Completed',
    tone: 'success'
  }];

  return (
    <div>
      <PageHeader
        title="Today's queue"
        description="Live view of all patients across the clinic. Updates automatically every 30 seconds."
        breadcrumbs={[
        {
          label: 'Overview'
        },
        {
          label: "Today's queue"
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<MonitorIcon />}>
              Waiting room display
            </Button>
            <Button variant="secondary" icon={<RefreshCwIcon />}>
              Refresh
            </Button>
            <Button variant="primary" icon={<PlusIcon />}>
              Walk-in
            </Button>
          </>
        } />
      

      <Card>
        <FilterBar
          searchPlaceholder="Search by patient, token, doctor…"
          rightActions={
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-subtle dark:bg-subtle-dark">
              {(['list', 'kanban'] as const).map((v) =>
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 h-8 text-xs font-medium rounded-md ${view === v ? 'bg-surface dark:bg-surface-dark text-ink-primary shadow-softer' : 'text-ink-secondary'}`}>
              
                  {v === 'list' ? 'List' : 'Board'}
                </button>
            )}
            </div>
          }>
          
          <FilterChip active count={queue.length}>
            All
          </FilterChip>
          <FilterChip
            count={queue.filter((q) => q.status === 'Waiting').length}>
            
            Waiting
          </FilterChip>
          <FilterChip
            count={queue.filter((q) => q.status === 'In consultation').length}>
            
            In consultation
          </FilterChip>
          <FilterChip count={2}>Lab pending</FilterChip>
        </FilterBar>

        {view === 'list' ?
        <DataTable data={queue} columns={cols} rowKey={(r) => r.token} /> :

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3 mt-2">
            {statusGroups.map((g) => {
            const items = queue.filter((q) => q.status === g.key);
            return (
              <div
                key={g.key}
                className="bg-subtle/50 dark:bg-subtle-dark/50 rounded-xl p-3 min-h-[200px]">
                
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-ink-primary dark:text-ink-primary-dark">
                      {g.label}
                    </span>
                    <MonoNumber size="xs" className="text-ink-tertiary">
                      {items.length}
                    </MonoNumber>
                  </div>
                  <div className="space-y-2">
                    {items.map((q) =>
                  <div
                    key={q.token}
                    className="bg-surface dark:bg-surface-dark border border-line dark:border-line-dark rounded-lg p-2.5">
                    
                        <div className="flex items-center justify-between mb-1">
                          <MonoNumber size="xs" weight="semibold">
                            {q.token}
                          </MonoNumber>
                          <MonoNumber size="xs" className="text-ink-tertiary">
                            {q.time}
                          </MonoNumber>
                        </div>
                        <div className="text-xs font-medium truncate">
                          {q.patient}
                        </div>
                        <div className="text-[10px] text-ink-tertiary truncate">
                          {q.doctor}
                        </div>
                      </div>
                  )}
                    {items.length === 0 &&
                  <p className="text-xs text-ink-tertiary text-center py-4">
                        No patients
                      </p>
                  }
                  </div>
                </div>);

          })}
          </div>
        }
      </Card>
    </div>);

}