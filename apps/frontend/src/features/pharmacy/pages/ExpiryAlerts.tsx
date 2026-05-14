import React from 'react';
import {
  DownloadIcon,
  AlertTriangleIcon,
  PackageIcon,
  TruckIcon,
  SparklesIcon } from
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
interface ExpiryItem {
  medicine: string;
  batch: string;
  expiry: string;
  daysLeft: number;
  qty: number;
  value: number;
  category: 'Expired' | 'Critical' | 'Warning' | 'Watch';
}
const items: ExpiryItem[] = [
{
  medicine: 'Salbutamol Inhaler',
  batch: 'B-1422',
  expiry: '2026-04-30',
  daysLeft: -12,
  qty: 4,
  value: 792,
  category: 'Expired'
},
{
  medicine: 'Cefixime 200mg',
  batch: 'B-2018',
  expiry: '2026-05-18',
  daysLeft: 6,
  qty: 18,
  value: 2556,
  category: 'Critical'
},
{
  medicine: 'Amlodipine 5mg',
  batch: 'B-2241',
  expiry: '2026-06-19',
  daysLeft: 38,
  qty: 18,
  value: 1170,
  category: 'Warning'
},
{
  medicine: 'Doxycycline 100mg',
  batch: 'B-1844',
  expiry: '2026-07-04',
  daysLeft: 53,
  qty: 32,
  value: 1856,
  category: 'Warning'
},
{
  medicine: 'Pantoprazole 40mg',
  batch: 'B-2102',
  expiry: '2026-07-22',
  daysLeft: 71,
  qty: 6,
  value: 426,
  category: 'Watch'
},
{
  medicine: 'Salbutamol Inhaler',
  batch: 'B-1820',
  expiry: '2026-08-12',
  daysLeft: 92,
  qty: 28,
  value: 5544,
  category: 'Watch'
},
{
  medicine: 'Atorvastatin 20mg',
  batch: 'B-2241',
  expiry: '2026-08-22',
  daysLeft: 102,
  qty: 24,
  value: 2112,
  category: 'Watch'
}];

const categoryTone = {
  Expired: 'danger',
  Critical: 'danger',
  Warning: 'warning',
  Watch: 'neutral'
} as const;
export function ExpiryAlerts() {
  const totalValue = items.reduce((s, i) => s + i.value, 0);
  const cols: Column<ExpiryItem>[] = [
  {
    key: 'medicine',
    header: 'Medicine',
    render: (r) => <span className="font-medium">{r.medicine}</span>
  },
  {
    key: 'batch',
    header: 'Batch',
    render: (r) => <MonoNumber size="sm">{r.batch}</MonoNumber>
  },
  {
    key: 'expiry',
    header: 'Expiry date',
    render: (r) => <MonoNumber size="sm">{r.expiry}</MonoNumber>
  },
  {
    key: 'daysLeft',
    header: 'Days left',
    render: (r) =>
    <MonoNumber
      size="sm"
      weight="medium"
      className={
      r.daysLeft < 0 ?
      'text-danger' :
      r.daysLeft < 30 ?
      'text-danger' :
      r.daysLeft < 60 ?
      'text-warning' :
      'text-ink-secondary'
      }>
      
          {r.daysLeft < 0 ?
      `Expired ${Math.abs(r.daysLeft)}d ago` :
      `${r.daysLeft}d`}
        </MonoNumber>

  },
  {
    key: 'qty',
    header: 'Quantity',
    align: 'right',
    render: (r) => <MonoNumber size="sm">{r.qty}</MonoNumber>
  },
  {
    key: 'value',
    header: 'Stock value',
    align: 'right',
    render: (r) => <MoneyText amount={r.value} size="sm" weight="medium" />
  },
  {
    key: 'category',
    header: 'Status',
    render: (r) =>
    <StatusBadge tone={categoryTone[r.category] as any} dot size="sm">
          {r.category}
        </StatusBadge>

  },
  {
    key: 'actions',
    header: '',
    width: '160px',
    render: (r) =>
    <div className="flex items-center gap-1.5 justify-end">
          <Button size="sm" variant="ghost">
            Return
          </Button>
          <Button size="sm" variant="secondary">
            Discount sale
          </Button>
        </div>

  }];

  return (
    <div>
      <PageHeader
        title="Expiry alerts"
        description="Monitor medicine batches nearing expiry. Take action — return to supplier or promote with discounts — before losses occur."
        breadcrumbs={[
        {
          label: 'Pharmacy'
        },
        {
          label: 'Expiry alerts'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<DownloadIcon />}>
              Export
            </Button>
            <Button variant="primary" icon={<TruckIcon />}>
              Generate return note
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Expired stock"
          value="₹792"
          tone="danger"
          icon={<AlertTriangleIcon />}
          sublabel="4 units" />
        
        <MetricCard
          label="Critical (≤30d)"
          value="₹2,556"
          tone="danger"
          sublabel="1 batch" />
        
        <MetricCard
          label="Warning (30–60d)"
          value="₹3,026"
          tone="warning"
          sublabel="2 batches" />
        
        <MetricCard
          label="Total at-risk"
          value={`₹${totalValue.toLocaleString('en-IN')}`}
          icon={<PackageIcon />} />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
        <Card>
          <FilterBar searchPlaceholder="Search medicine or batch…">
            <FilterChip active count={items.length}>
              All
            </FilterChip>
            <FilterChip
              count={items.filter((i) => i.category === 'Expired').length}>
              
              Expired
            </FilterChip>
            <FilterChip
              count={items.filter((i) => i.category === 'Critical').length}>
              
              Critical
            </FilterChip>
            <FilterChip
              count={items.filter((i) => i.category === 'Warning').length}>
              
              Warning
            </FilterChip>
            <FilterChip
              count={items.filter((i) => i.category === 'Watch').length}>
              
              Watch list
            </FilterChip>
          </FilterBar>
          <DataTable
            data={items}
            columns={cols}
            rowKey={(r) => `${r.medicine}-${r.batch}`} />
          
        </Card>

        <div className="space-y-4">
          <AIInsightPanel
            title="AI expiry strategy"
            subtitle="Loss-minimization suggestions"
            needsReview
            insights={[
            {
              tone: 'danger',
              title: 'Cefixime 200mg — act this week',
              body: '18 units expire in 6 days. Average weekly demand: 8 units. Push to walk-in patients or return to supplier within 48h.',
              action: 'Generate return note'
            },
            {
              tone: 'warning',
              title: 'Amlodipine 5mg — discount strategy',
              body: '38 days remaining. Suggest 15% discount or bundle with monthly prescription refills. Projected loss avoided: ₹1,170.',
              action: 'Create promo'
            },
            {
              tone: 'info',
              title: 'Supplier return eligibility',
              body: 'Doxycycline batch B-1844 is within supplier return window (60+ days). Total returnable: ₹1,856.'
            }]
            } />
          

          <Card>
            <SectionTitle title="Supplier contact" />
            <div className="space-y-3 text-sm">
              {[
              {
                name: 'MediCorp Distributors',
                items: 3,
                value: 4378
              },
              {
                name: 'PharmaWell India',
                items: 2,
                value: 7656
              },
              {
                name: 'Apex Pharma',
                items: 1,
                value: 426
              }].
              map((s, i) =>
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-line dark:border-line-dark last:border-0">
                
                  <div>
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-ink-tertiary">
                      <MonoNumber size="xs">{s.items}</MonoNumber> batches
                      returnable
                    </div>
                  </div>
                  <MoneyText amount={s.value} size="sm" weight="medium" />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>);

}