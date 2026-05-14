import React from 'react';
import {
  PlusIcon,
  TruckIcon,
  DownloadIcon,
  FileTextIcon,
  EyeIcon,
  CheckIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card } from '../components/primitives/Card';
import { Button, IconButton } from '../components/primitives/Button';
import { FilterBar, FilterChip } from '../components/primitives/FilterBar';
import { DataTable, Column } from '../components/primitives/DataTable';
import { MonoNumber, MoneyText } from '../components/primitives/MonoNumber';
import { AutoStatusBadge } from '../components/primitives/StatusBadge';
import { MetricCard } from '../components/primitives/MetricCard';
interface PO {
  id: string;
  supplier: string;
  created: string;
  items: number;
  value: number;
  expectedDelivery: string;
  status:
  'Draft' |
  'Sent' |
  'Acknowledged' |
  'Partial' |
  'Received' |
  'Cancelled';
  paid: 'Paid' | 'Pending' | 'Partial';
}
const pos: PO[] = [
{
  id: 'PO-2026-0218',
  supplier: 'MediCorp Distributors',
  created: '2026-05-12',
  items: 14,
  value: 84200,
  expectedDelivery: '2026-05-14',
  status: 'Sent',
  paid: 'Pending'
},
{
  id: 'PO-2026-0217',
  supplier: 'PharmaWell India',
  created: '2026-05-11',
  items: 22,
  value: 142800,
  expectedDelivery: '2026-05-13',
  status: 'Acknowledged',
  paid: 'Pending'
},
{
  id: 'PO-2026-0216',
  supplier: 'Apex Pharma',
  created: '2026-05-10',
  items: 6,
  value: 18400,
  expectedDelivery: '2026-05-12',
  status: 'Received',
  paid: 'Paid'
},
{
  id: 'PO-2026-0215',
  supplier: 'MediCorp Distributors',
  created: '2026-05-08',
  items: 18,
  value: 62400,
  expectedDelivery: '2026-05-10',
  status: 'Received',
  paid: 'Paid'
},
{
  id: 'PO-2026-0214',
  supplier: 'BioGenix',
  created: '2026-05-07',
  items: 8,
  value: 26800,
  expectedDelivery: '2026-05-11',
  status: 'Partial',
  paid: 'Partial'
},
{
  id: 'PO-2026-0213',
  supplier: 'PharmaWell India',
  created: '2026-05-04',
  items: 12,
  value: 48200,
  expectedDelivery: '2026-05-08',
  status: 'Received',
  paid: 'Paid'
},
{
  id: 'PO-2026-0212',
  supplier: 'Apex Pharma',
  created: '2026-05-02',
  items: 4,
  value: 8400,
  expectedDelivery: '2026-05-04',
  status: 'Cancelled',
  paid: 'Pending'
}];

export function PurchaseOrders() {
  const cols: Column<PO>[] = [
  {
    key: 'id',
    header: 'PO #',
    render: (r) =>
    <MonoNumber size="sm" weight="medium">
          {r.id}
        </MonoNumber>

  },
  {
    key: 'supplier',
    header: 'Supplier',
    render: (r) => <span className="font-medium">{r.supplier}</span>
  },
  {
    key: 'created',
    header: 'Created',
    render: (r) =>
    <MonoNumber size="sm" className="text-ink-secondary">
          {r.created}
        </MonoNumber>

  },
  {
    key: 'items',
    header: 'Items',
    align: 'right',
    render: (r) => <MonoNumber size="sm">{r.items}</MonoNumber>
  },
  {
    key: 'value',
    header: 'Value',
    align: 'right',
    render: (r) => <MoneyText amount={r.value} size="sm" weight="medium" />
  },
  {
    key: 'expectedDelivery',
    header: 'Expected',
    render: (r) =>
    <MonoNumber size="sm" className="text-ink-secondary">
          {r.expectedDelivery}
        </MonoNumber>

  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <AutoStatusBadge status={r.status} />
  },
  {
    key: 'paid',
    header: 'Payment',
    render: (r) => <AutoStatusBadge status={r.paid} />
  },
  {
    key: 'actions',
    header: '',
    width: '110px',
    render: () =>
    <div className="flex items-center gap-1 justify-end">
          <IconButton size="sm" variant="ghost">
            <EyeIcon />
          </IconButton>
          <IconButton size="sm" variant="ghost">
            <DownloadIcon />
          </IconButton>
          <IconButton size="sm" variant="ghost">
            <CheckIcon />
          </IconButton>
        </div>

  }];

  return (
    <div>
      <PageHeader
        title="Purchase orders"
        description="Track purchase orders from suppliers, deliveries, and payments."
        breadcrumbs={[
        {
          label: 'Pharmacy'
        },
        {
          label: 'Purchase'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<DownloadIcon />}>
              Export
            </Button>
            <Button variant="primary" icon={<PlusIcon />}>
              New PO
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Open POs"
          value="2"
          icon={<FileTextIcon />}
          sublabel="₹227k value" />
        
        <MetricCard
          label="Awaiting delivery"
          value="3"
          icon={<TruckIcon />}
          tone="warning" />
        
        <MetricCard
          label="Spend this month"
          value="₹3.84L"
          delta={{
            value: '+8%',
            trend: 'up',
            tone: 'neutral'
          }} />
        
        <MetricCard
          label="Pending supplier dues"
          value="₹1.42L"
          tone="warning" />
        
      </div>

      <Card>
        <FilterBar searchPlaceholder="Search PO, supplier…">
          <FilterChip active count={pos.length}>
            All
          </FilterChip>
          <FilterChip
            count={
            pos.filter(
              (p) => p.status === 'Sent' || p.status === 'Acknowledged'
            ).length
            }>
            
            Open
          </FilterChip>
          <FilterChip count={pos.filter((p) => p.status === 'Received').length}>
            Received
          </FilterChip>
          <FilterChip count={pos.filter((p) => p.status === 'Partial').length}>
            Partial
          </FilterChip>
          <FilterChip count={pos.filter((p) => p.paid === 'Pending').length}>
            Payment pending
          </FilterChip>
        </FilterBar>
        <DataTable data={pos} columns={cols} rowKey={(r) => r.id} />
      </Card>
    </div>);

}