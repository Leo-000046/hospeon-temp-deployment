import React, { useState } from 'react';
import {
  PlusIcon,
  DownloadIcon,
  ShoppingCartIcon,
  AlertTriangleIcon,
  PackageIcon,
  TruckIcon,
  EyeIcon,
  EditIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { FilterBar, FilterChip } from '@/components/ui/FilterBar';
import { DataTable, Column } from '@/components/ui/DataTable';
import { MonoNumber, MoneyText } from '@/components/ui/MonoNumber';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MetricCard } from '@/components/ui/MetricCard';
import { AIInsightPanel } from '@/components/ui/AIInsightPanel';
const medicines: any[] = [];
export function Medicines() {
  const [filter, setFilter] = useState('all');
  const filtered = medicines.filter((m) => {
    if (filter === 'low') return m.stock > 0 && m.stock < 20;
    if (filter === 'out') return m.stock === 0;
    if (filter === 'expiring') return m.expiry === 'Expiring';
    return true;
  });
  const cols: Column<(typeof medicines)[number]>[] = [
  {
    key: 'name',
    header: 'Medicine',
    render: (r) =>
    <div>
          <div className="font-medium">{r.name}</div>
          <div className="text-xs text-ink-tertiary">{r.generic}</div>
        </div>

  },
  {
    key: 'category',
    header: 'Category',
    render: (r) =>
    <StatusBadge tone="neutral" size="sm">
          {r.category}
        </StatusBadge>

  },
  {
    key: 'stock',
    header: 'Stock',
    align: 'right',
    render: (r) =>
    <div className="flex items-center justify-end gap-2">
          <MonoNumber
        size="sm"
        weight="medium"
        className={
        r.stock === 0 ? 'text-danger' : r.stock < 20 ? 'text-warning' : ''
        }>
        
            {r.stock}
          </MonoNumber>
          {r.stock === 0 &&
      <StatusBadge tone="danger" size="sm">
              Out
            </StatusBadge>
      }
          {r.stock > 0 && r.stock < 20 &&
      <StatusBadge tone="warning" size="sm">
              Low
            </StatusBadge>
      }
        </div>

  },
  {
    key: 'batches',
    header: 'Batches',
    align: 'right',
    render: (r) =>
    <MonoNumber size="sm" className="text-ink-secondary">
          {r.batches}
        </MonoNumber>

  },
  {
    key: 'expiry',
    header: 'Expiry status',
    render: (r) =>
    r.expiry === 'Expiring' ?
    <StatusBadge tone="warning" dot size="sm">
            Expiring soon
          </StatusBadge> :
    r.expiry === 'Out' ?
    <StatusBadge tone="neutral" size="sm">
            —
          </StatusBadge> :

    <StatusBadge tone="success" dot size="sm">
            OK
          </StatusBadge>

  },
  {
    key: 'mrp',
    header: 'MRP',
    align: 'right',
    render: (r) => <MoneyText amount={r.mrp} size="sm" />
  },
  {
    key: 'cost',
    header: 'Cost',
    align: 'right',
    render: (r) =>
    <MoneyText amount={r.cost} size="sm" className="text-ink-secondary" />

  },
  {
    key: 'actions',
    header: '',
    width: '80px',
    render: () =>
    <div className="flex items-center gap-1 justify-end">
          <IconButton size="sm" variant="ghost">
            <EyeIcon />
          </IconButton>
          <IconButton size="sm" variant="ghost">
            <EditIcon />
          </IconButton>
        </div>

  }];

  return (
    <div>
      <PageHeader
        title="Medicines"
        description="Master list of all medicines stocked in your pharmacy."
        breadcrumbs={[
        {
          label: 'Pharmacy'
        },
        {
          label: 'Medicines'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<TruckIcon />}>
              Stock entry
            </Button>
            <Button variant="secondary" icon={<DownloadIcon />}>
              Export
            </Button>
            <Button variant="primary" icon={<PlusIcon />}>
              Add medicine
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard label="Total SKUs" value="248" icon={<PackageIcon />} />
        <MetricCard
          label="Low stock"
          value="7"
          tone="warning"
          icon={<AlertTriangleIcon />} />
        
        <MetricCard label="Expiring (30 days)" value="12" tone="warning" />
        <MetricCard label="Stock value" value="₹4.2L" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <Card>
          <FilterBar searchPlaceholder="Search medicine, generic, manufacturer…">
            <FilterChip
              active={filter === 'all'}
              onClick={() => setFilter('all')}
              count={medicines.length}>
              
              All
            </FilterChip>
            <FilterChip
              active={filter === 'low'}
              onClick={() => setFilter('low')}
              count={
              medicines.filter((m) => m.stock > 0 && m.stock < 20).length
              }>
              
              Low stock
            </FilterChip>
            <FilterChip
              active={filter === 'out'}
              onClick={() => setFilter('out')}
              count={medicines.filter((m) => m.stock === 0).length}>
              
              Out of stock
            </FilterChip>
            <FilterChip
              active={filter === 'expiring'}
              onClick={() => setFilter('expiring')}
              count={medicines.filter((m) => m.expiry === 'Expiring').length}>
              
              Expiring soon
            </FilterChip>
          </FilterBar>
          <DataTable data={filtered} columns={cols} rowKey={(r) => r.name} />
        </Card>

        <AIInsightPanel
          title="Pharmacy AI assistant"
          subtitle="Stock & purchase insights"
          insights={[
          {
            tone: 'warning',
            title: 'Reorder Pantoprazole',
            body: 'Stock at 6 units. Average sale 12/week. Suggested PO: 100 units.',
            action: 'Create PO'
          },
          {
            tone: 'danger',
            title: 'Cefixime 200mg out of stock',
            body: 'No stock since 2 days. 4 prescriptions affected today.',
            action: 'Order now'
          },
          {
            tone: 'info',
            title: 'Likely expiry loss',
            body: 'Amlodipine batch B-2241 will expire in 38 days. 18 units = ₹1,170 risk.'
          }]
          } />
        
      </div>
    </div>);

}