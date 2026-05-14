import React from 'react';
import {
  DownloadIcon,
  BanknoteIcon,
  SmartphoneIcon,
  CreditCardIcon,
  GlobeIcon,
  EyeIcon,
  ReceiptIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { FilterBar, FilterChip } from '@/components/ui/FilterBar';
import { DataTable, Column } from '@/components/ui/DataTable';
import { MonoNumber, MoneyText } from '@/components/ui/MonoNumber';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MetricCard } from '@/components/ui/MetricCard';
interface Payment {
  id: string;
  invoice: string;
  patient: string;
  pid: string;
  amount: number;
  mode: 'Cash' | 'UPI' | 'Card' | 'Online' | 'Bank';
  ref: string;
  collected: string;
  collectedBy: string;
  status: 'Settled' | 'Pending settlement' | 'Refunded' | 'Failed';
}
const payments: Payment[] = [
{
  id: 'PMT-2026-08124',
  invoice: 'INV-2026-04812',
  patient: 'Ramesh Kumar',
  pid: 'P-100482',
  amount: 1160,
  mode: 'UPI',
  ref: 'AXIS@1024',
  collected: '2026-05-12 12:18',
  collectedBy: 'Priya R.',
  status: 'Settled'
},
{
  id: 'PMT-2026-08123',
  invoice: 'INV-2026-04811',
  patient: 'Fathima Beevi',
  pid: 'P-100481',
  amount: 850,
  mode: 'Cash',
  ref: '—',
  collected: '2026-05-12 11:42',
  collectedBy: 'Priya R.',
  status: 'Settled'
},
{
  id: 'PMT-2026-08122',
  invoice: 'INV-2026-04810',
  patient: 'Joseph Mathew',
  pid: 'P-100480',
  amount: 4000,
  mode: 'Card',
  ref: '****4421',
  collected: '2026-05-12 10:30',
  collectedBy: 'Sunil K.',
  status: 'Pending settlement'
},
{
  id: 'PMT-2026-08121',
  invoice: 'INV-2026-04809',
  patient: 'Ananya Suresh',
  pid: 'P-100479',
  amount: 1250,
  mode: 'UPI',
  ref: 'GPAY@4812',
  collected: '2026-05-12 09:48',
  collectedBy: 'Priya R.',
  status: 'Settled'
},
{
  id: 'PMT-2026-08120',
  invoice: 'INV-2026-04808',
  patient: 'Suresh Pillai',
  pid: 'P-100478',
  amount: 500,
  mode: 'Cash',
  ref: '—',
  collected: '2026-05-12 09:22',
  collectedBy: 'Priya R.',
  status: 'Settled'
},
{
  id: 'PMT-2026-08119',
  invoice: 'INV-2026-04807',
  patient: 'Meera Krishnan',
  pid: 'P-100477',
  amount: 1800,
  mode: 'Online',
  ref: 'rzp_pay_8221',
  collected: '2026-05-11 18:12',
  collectedBy: 'system',
  status: 'Settled'
},
{
  id: 'PMT-2026-08118',
  invoice: 'INV-2026-04806',
  patient: 'Abdul Rasheed',
  pid: 'P-100476',
  amount: 2400,
  mode: 'UPI',
  ref: 'PHONEPE@1284',
  collected: '2026-05-11 16:04',
  collectedBy: 'Priya R.',
  status: 'Settled'
},
{
  id: 'PMT-2026-08117',
  invoice: 'INV-2026-04805',
  patient: 'Lakshmi Devi',
  pid: 'P-100475',
  amount: 800,
  mode: 'Card',
  ref: '****8842',
  collected: '2026-05-11 14:20',
  collectedBy: 'Sunil K.',
  status: 'Failed'
}];

const modeIcon = {
  Cash: BanknoteIcon,
  UPI: SmartphoneIcon,
  Card: CreditCardIcon,
  Online: GlobeIcon,
  Bank: BanknoteIcon
};
const statusTone = {
  Settled: 'success',
  'Pending settlement': 'warning',
  Refunded: 'neutral',
  Failed: 'danger'
} as const;
export function Payments() {
  const cols: Column<Payment>[] = [
  {
    key: 'id',
    header: 'Payment ID',
    render: (r) =>
    <MonoNumber size="xs" weight="medium">
          {r.id}
        </MonoNumber>

  },
  {
    key: 'invoice',
    header: 'Invoice',
    render: (r) => <MonoNumber size="xs">{r.invoice}</MonoNumber>
  },
  {
    key: 'patient',
    header: 'Patient',
    render: (r) =>
    <div>
          <div className="font-medium text-sm">{r.patient}</div>
          <MonoNumber size="xs" className="text-ink-tertiary">
            {r.pid}
          </MonoNumber>
        </div>

  },
  {
    key: 'amount',
    header: 'Amount',
    align: 'right',
    render: (r) => <MoneyText amount={r.amount} size="sm" weight="medium" />
  },
  {
    key: 'mode',
    header: 'Mode',
    render: (r) => {
      const Icon = modeIcon[r.mode];
      return (
        <div className="flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5 text-ink-secondary" />
            <span className="text-sm">{r.mode}</span>
          </div>);

    }
  },
  {
    key: 'ref',
    header: 'Reference',
    render: (r) =>
    r.ref === '—' ?
    <span className="text-ink-tertiary text-xs">—</span> :

    <MonoNumber size="xs" className="text-ink-secondary">
            {r.ref}
          </MonoNumber>

  },
  {
    key: 'collected',
    header: 'Collected at',
    render: (r) =>
    <MonoNumber size="xs" className="text-ink-secondary">
          {r.collected}
        </MonoNumber>

  },
  {
    key: 'collectedBy',
    header: 'By',
    render: (r) =>
    <span className="text-xs text-ink-secondary">{r.collectedBy}</span>

  },
  {
    key: 'status',
    header: 'Status',
    render: (r) =>
    <StatusBadge tone={statusTone[r.status]} dot size="sm">
          {r.status}
        </StatusBadge>

  },
  {
    key: 'actions',
    header: '',
    width: '70px',
    render: () =>
    <div className="flex items-center gap-1 justify-end">
          <IconButton size="sm" variant="ghost">
            <EyeIcon />
          </IconButton>
          <IconButton size="sm" variant="ghost">
            <ReceiptIcon />
          </IconButton>
        </div>

  }];

  return (
    <div>
      <PageHeader
        title="Payments"
        description="All payment transactions across modes and branches."
        breadcrumbs={[
        {
          label: 'Billing'
        },
        {
          label: 'Payments'
        }]
        }
        actions={
        <Button variant="primary" icon={<DownloadIcon />}>
            Export
          </Button>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Today's payments"
          value="42"
          icon={<BanknoteIcon />}
          sublabel="₹68,420" />
        
        <MetricCard
          label="UPI"
          value="₹32,400"
          icon={<SmartphoneIcon />}
          sublabel="24 txns" />
        
        <MetricCard
          label="Card"
          value="₹8,600"
          icon={<CreditCardIcon />}
          sublabel="6 txns" />
        
        <MetricCard
          label="Failed transactions"
          value="1"
          icon={<CreditCardIcon />}
          tone="danger" />
        
      </div>

      <Card>
        <FilterBar searchPlaceholder="Search payment, invoice, patient, reference…">
          <FilterChip active count={payments.length}>
            All
          </FilterChip>
          <FilterChip count={payments.filter((p) => p.mode === 'Cash').length}>
            Cash
          </FilterChip>
          <FilterChip count={payments.filter((p) => p.mode === 'UPI').length}>
            UPI
          </FilterChip>
          <FilterChip count={payments.filter((p) => p.mode === 'Card').length}>
            Card
          </FilterChip>
          <FilterChip
            count={payments.filter((p) => p.status === 'Failed').length}>
            
            Failed
          </FilterChip>
        </FilterBar>
        <DataTable data={payments} columns={cols} rowKey={(r) => r.id} dense />
      </Card>
    </div>);

}