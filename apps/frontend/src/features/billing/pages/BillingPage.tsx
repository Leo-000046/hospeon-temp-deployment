import React, { useState } from 'react';
import {
  PlusIcon,
  DownloadIcon,
  ReceiptIcon,
  EyeIcon,
  PrinterIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { FilterBar, FilterChip } from '@/components/ui/FilterBar';
import { DataTable, Column } from '@/components/ui/DataTable';
import { MonoNumber, MoneyText } from '@/components/ui/MonoNumber';
import { AutoStatusBadge } from '@/components/ui/StatusBadge';
import { MetricCard } from '@/components/ui/MetricCard';
const invoices: any[] = [];
export function Invoices() {
  const [filter, setFilter] = useState('all');
  const cols: Column<(typeof invoices)[number]>[] = [
  {
    key: 'id',
    header: 'Invoice',
    render: (r) =>
    <MonoNumber size="sm" weight="medium">
          {r.id}
        </MonoNumber>

  },
  {
    key: 'patient',
    header: 'Patient',
    render: (r) =>
    <div>
          <div className="font-medium">{r.patient}</div>
          <MonoNumber size="xs" className="text-ink-tertiary">
            {r.pid}
          </MonoNumber>
        </div>

  },
  {
    key: 'date',
    header: 'Date',
    render: (r) => <MonoNumber size="sm">{r.date}</MonoNumber>
  },
  {
    key: 'amount',
    header: 'Amount',
    align: 'right',
    render: (r) => <MoneyText amount={r.amount} weight="medium" size="sm" />
  },
  {
    key: 'paid',
    header: 'Paid',
    align: 'right',
    render: (r) =>
    <MoneyText amount={r.paid} size="sm" className="text-ink-secondary" />

  },
  {
    key: 'balance',
    header: 'Balance',
    align: 'right',
    render: (r) =>
    r.balance > 0 ?
    <MoneyText
      amount={r.balance}
      size="sm"
      weight="medium"
      className="text-warning" /> :


    <span className="text-ink-tertiary">—</span>

  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <AutoStatusBadge status={r.status} />
  },
  {
    key: 'actions',
    header: '',
    width: '100px',
    render: () =>
    <div className="flex items-center gap-1 justify-end">
          <IconButton size="sm" variant="ghost">
            <EyeIcon />
          </IconButton>
          <IconButton size="sm" variant="ghost">
            <PrinterIcon />
          </IconButton>
        </div>

  }];

  return (
    <div>
      <PageHeader
        title="Invoices"
        description="All invoices generated across your branches."
        breadcrumbs={[
        {
          label: 'Billing'
        },
        {
          label: 'Invoices'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<DownloadIcon />}>
              Export
            </Button>
            <Button variant="primary" icon={<PlusIcon />}>
              New invoice
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Today's collection"
          value="₹68,420"
          icon={<ReceiptIcon />}
          delta={{
            value: '+12%',
            trend: 'up',
            tone: 'positive'
          }} />
        
        <MetricCard label="Outstanding" value="₹24,180" tone="warning" />
        <MetricCard label="Invoices generated" value="42" sublabel="today" />
        <MetricCard label="Refunds" value="₹1,200" />
      </div>

      <Card>
        <FilterBar searchPlaceholder="Search invoice number, patient…">
          {['all', 'paid', 'partial', 'pending', 'refunded'].map((f) =>
          <FilterChip
            key={f}
            active={filter === f}
            onClick={() => setFilter(f)}>
            
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </FilterChip>
          )}
        </FilterBar>
        <DataTable data={invoices} columns={cols} rowKey={(r) => r.id} />
      </Card>
    </div>);

}