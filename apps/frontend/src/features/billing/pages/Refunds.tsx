import React, { useState } from 'react';
import {
  PlusIcon,
  DownloadIcon,
  RotateCcwIcon,
  EyeIcon,
  ShieldCheckIcon,
  AlertTriangleIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { FilterBar, FilterChip } from '@/components/ui/FilterBar';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { MonoNumber, MoneyText } from '@/components/ui/MonoNumber';
import {
  AutoStatusBadge,
  StatusBadge } from
'@/components/ui/StatusBadge';
import { MetricCard } from '@/components/ui/MetricCard';
interface Refund {
  id: string;
  invoice: string;
  patient: string;
  pid: string;
  amount: number;
  reason: string;
  requested: string;
  approver?: string;
  status: 'Pending approval' | 'Approved' | 'Processed' | 'Rejected';
  mode: 'Cash' | 'UPI' | 'Card' | 'Bank';
}
const refunds: Refund[] = [
{
  id: 'REF-2026-0218',
  invoice: 'INV-2026-04805',
  patient: 'Lakshmi Devi',
  pid: 'P-100475',
  amount: 800,
  reason: 'Card payment failed but charged',
  requested: '2026-05-12 11:14',
  status: 'Pending approval',
  mode: 'Card'
},
{
  id: 'REF-2026-0217',
  invoice: 'INV-2026-04798',
  patient: 'V. Krishnan',
  pid: 'P-100471',
  amount: 1200,
  reason: 'Service not provided',
  requested: '2026-05-11 14:42',
  approver: 'Sunil K.',
  status: 'Approved',
  mode: 'UPI'
},
{
  id: 'REF-2026-0216',
  invoice: 'INV-2026-04785',
  patient: 'Babu Varghese',
  pid: 'P-100463',
  amount: 500,
  reason: 'Wrong amount charged',
  requested: '2026-05-10 09:18',
  approver: 'Sunil K.',
  status: 'Processed',
  mode: 'UPI'
},
{
  id: 'REF-2026-0215',
  invoice: 'INV-2026-04772',
  patient: 'Riya Thomas',
  pid: 'P-100469',
  amount: 350,
  reason: 'Duplicate payment',
  requested: '2026-05-09 16:30',
  approver: 'Sunil K.',
  status: 'Processed',
  mode: 'Cash'
},
{
  id: 'REF-2026-0214',
  invoice: 'INV-2026-04760',
  patient: 'Nimmy J.',
  pid: 'P-100460',
  amount: 2400,
  reason: 'Procedure cancelled',
  requested: '2026-05-08 11:00',
  approver: 'Dr. Anjali Menon',
  status: 'Rejected',
  mode: 'Card'
}];

export function Refunds() {
  const [showNew, setShowNew] = useState(false);
  const pending = refunds.filter((r) => r.status === 'Pending approval');
  const cols: Column<Refund>[] = [
  {
    key: 'id',
    header: 'Refund',
    render: (r) =>
    <MonoNumber size="sm" weight="medium">
          {r.id}
        </MonoNumber>

  },
  {
    key: 'invoice',
    header: 'Invoice',
    render: (r) =>
    <MonoNumber size="xs" className="text-ink-secondary">
          {r.invoice}
        </MonoNumber>

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
    render: (r) =>
    <MoneyText
      amount={r.amount}
      size="sm"
      weight="medium"
      className="text-warning" />


  },
  {
    key: 'reason',
    header: 'Reason',
    render: (r) =>
    <span className="text-sm text-ink-secondary italic">"{r.reason}"</span>

  },
  {
    key: 'requested',
    header: 'Requested',
    render: (r) =>
    <MonoNumber size="xs" className="text-ink-secondary">
          {r.requested}
        </MonoNumber>

  },
  {
    key: 'approver',
    header: 'Approver',
    render: (r) =>
    r.approver ?
    <span className="text-sm">{r.approver}</span> :

    <span className="text-ink-tertiary text-xs">—</span>

  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <AutoStatusBadge status={r.status} />
  },
  {
    key: 'actions',
    header: '',
    width: '120px',
    render: (r) =>
    <div className="flex items-center gap-1 justify-end">
          {r.status === 'Pending approval' ?
      <>
              <Button size="sm" variant="secondary">
                Approve
              </Button>
              <IconButton size="sm" variant="ghost">
                <EyeIcon />
              </IconButton>
            </> :

      <IconButton size="sm" variant="ghost">
              <EyeIcon />
            </IconButton>
      }
        </div>

  }];

  return (
    <div>
      <PageHeader
        title="Refunds"
        description="Refund requests, approvals, and processed reversals — all auditable."
        breadcrumbs={[
        {
          label: 'Billing'
        },
        {
          label: 'Refunds'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<DownloadIcon />}>
              Export
            </Button>
            <Button
            variant="primary"
            icon={<PlusIcon />}
            onClick={() => setShowNew(true)}>
            
              New refund
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Pending approval"
          value={String(pending.length)}
          icon={<AlertTriangleIcon />}
          tone="warning" />
        
        <MetricCard label="This month" value="₹8,400" sublabel="14 refunds" />
        <MetricCard label="Avg refund" value="₹600" />
        <MetricCard label="Refund rate" value="0.8%" sublabel="of revenue" />
      </div>

      <Card>
        <FilterBar searchPlaceholder="Search refund, invoice, patient…">
          <FilterChip active count={refunds.length}>
            All
          </FilterChip>
          <FilterChip count={pending.length}>Pending approval</FilterChip>
          <FilterChip
            count={refunds.filter((r) => r.status === 'Processed').length}>
            
            Processed
          </FilterChip>
          <FilterChip
            count={refunds.filter((r) => r.status === 'Rejected').length}>
            
            Rejected
          </FilterChip>
        </FilterBar>
        <DataTable data={refunds} columns={cols} rowKey={(r) => r.id} />
      </Card>

      {showNew &&
      <>
          <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setShowNew(false)} />
        
          <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-surface dark:bg-surface-dark border-l border-line dark:border-line-dark z-50 shadow-pop flex flex-col">
            <div className="p-5 border-b border-line dark:border-line-dark flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">New refund request</h3>
                <p className="text-xs text-ink-tertiary mt-0.5">
                  All refunds require approval and are logged for audit.
                </p>
              </div>
              <button
              onClick={() => setShowNew(false)}
              className="text-ink-tertiary hover:text-ink-primary">
              
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <Input
              label="Invoice reference *"
              placeholder="Search INV-…"
              mono />
            
              <div className="p-3 rounded-lg bg-subtle/60 dark:bg-subtle-dark/60 text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-ink-tertiary text-xs">Invoice</span>
                  <MonoNumber size="xs">INV-2026-04805</MonoNumber>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-ink-tertiary text-xs">Patient</span>
                  <span>Lakshmi Devi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-tertiary text-xs">Paid</span>
                  <MoneyText amount={800} size="sm" weight="medium" />
                </div>
              </div>
              <Input
              label="Refund amount *"
              mono
              defaultValue="800"
              hint="Max refundable: ₹800" />
            
              <Select label="Reason category *">
                <option>Service not provided</option>
                <option>Duplicate payment</option>
                <option>Wrong amount charged</option>
                <option>Customer complaint</option>
                <option>Procedure cancelled</option>
                <option>Other</option>
              </Select>
              <Textarea
              label="Detailed reason *"
              rows={3}
              placeholder="Explain why this refund is being requested. This will be recorded in the audit log." />
            
              <Select label="Refund mode *">
                <option>Original payment method (Card ****8842)</option>
                <option>UPI</option>
                <option>Cash</option>
                <option>Bank transfer</option>
              </Select>
              <div className="p-3 rounded-lg bg-warning-soft/50 border border-warning/20 flex gap-2 items-start">
                <ShieldCheckIcon className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <p className="text-xs text-ink-primary">
                  This refund requires approval from an Admin or Accountant. The
                  patient will be notified once processed.
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-line dark:border-line-dark flex items-center gap-2">
              <Button variant="ghost" onClick={() => setShowNew(false)}>
                Cancel
              </Button>
              <Button
              variant="primary"
              icon={<RotateCcwIcon />}
              className="ml-auto">
              
                Submit for approval
              </Button>
            </div>
          </div>
        </>
      }
    </div>);

}