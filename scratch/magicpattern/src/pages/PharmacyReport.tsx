import React from 'react';
import { DownloadIcon, FilterIcon } from 'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Select } from '../components/primitives/Input';
import { MetricCard } from '../components/primitives/MetricCard';
import { MonoNumber, MoneyText } from '../components/primitives/MonoNumber';
import { SimpleLineChart, SimpleBarChart } from '../components/charts/MiniChart';
import { StatusBadge } from '../components/primitives/StatusBadge';
export function PharmacyReport() {
  const salesTrend = [
  {
    label: 'Apr 1',
    value: 12400
  },
  {
    label: 'Apr 8',
    value: 14200
  },
  {
    label: 'Apr 15',
    value: 13800
  },
  {
    label: 'Apr 22',
    value: 16400
  },
  {
    label: 'Apr 29',
    value: 18200
  },
  {
    label: 'May 6',
    value: 17400
  },
  {
    label: 'May 12',
    value: 19800
  }];

  const categories = [
  {
    label: 'Antidiabetic',
    value: 28400
  },
  {
    label: 'Antihypertensive',
    value: 22600
  },
  {
    label: 'Antibiotic',
    value: 18200
  },
  {
    label: 'Analgesic',
    value: 14800
  },
  {
    label: 'PPI',
    value: 9400
  },
  {
    label: 'Statin',
    value: 8200
  }];

  const topSelling = [
  {
    name: 'Metformin 500mg',
    units: 1240,
    revenue: 52080,
    margin: '33%'
  },
  {
    name: 'Atorvastatin 20mg',
    units: 842,
    revenue: 74096,
    margin: '39%'
  },
  {
    name: 'Paracetamol 650mg',
    units: 2180,
    revenue: 52320,
    margin: '42%'
  },
  {
    name: 'Pantoprazole 40mg',
    units: 624,
    revenue: 44304,
    margin: '38%'
  },
  {
    name: 'Amlodipine 5mg',
    units: 542,
    revenue: 35230,
    margin: '37%'
  }];

  return (
    <div>
      <PageHeader
        title="Pharmacy report"
        description="Sales, stock health, margins, and expiry risk."
        breadcrumbs={[
        {
          label: 'Reports'
        },
        {
          label: 'Pharmacy'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<FilterIcon />}>
              Filters
            </Button>
            <Button variant="primary" icon={<DownloadIcon />}>
              Export PDF
            </Button>
          </>
        } />
      

      <Card className="mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Select label="Date range">
            <option>This month</option>
            <option>Last 30 days</option>
            <option>Quarter</option>
          </Select>
          <Select label="Branch">
            <option>All branches</option>
          </Select>
          <Select label="Category">
            <option>All categories</option>
          </Select>
          <Select label="Supplier">
            <option>All suppliers</option>
          </Select>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <MetricCard
          label="Sales"
          value="₹4.82L"
          delta={{
            value: '+22%',
            trend: 'up',
            tone: 'positive'
          }} />
        
        <MetricCard
          label="Purchase"
          value="₹3.84L"
          delta={{
            value: '+8%',
            trend: 'up',
            tone: 'neutral'
          }} />
        
        <MetricCard
          label="Avg margin"
          value="38%"
          delta={{
            value: '+1.2pt',
            trend: 'up',
            tone: 'positive'
          }} />
        
        <MetricCard label="Stock valuation" value="₹4.21L" />
        <MetricCard label="Expiry risk" value="₹14.2k" tone="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <SectionTitle title="Sales trend" description="Last 7 weeks" />
          <SimpleLineChart data={salesTrend} height={220} />
        </Card>
        <Card>
          <SectionTitle
            title="Category mix"
            description="Revenue by category" />
          
          <div className="space-y-2.5 mt-2">
            {categories.map((c) => {
              const max = Math.max(...categories.map((x) => x.value));
              return (
                <div key={c.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-ink-secondary">{c.label}</span>
                    <MoneyText amount={c.value} size="sm" weight="medium" />
                  </div>
                  <div className="h-1.5 rounded-full bg-subtle dark:bg-subtle-dark overflow-hidden">
                    <div
                      className="h-full bg-accent"
                      style={{
                        width: `${c.value / max * 100}%`
                      }} />
                    
                  </div>
                </div>);

            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle
            title="Top selling medicines"
            description="By revenue this month" />
          
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line dark:border-line-dark text-xs uppercase tracking-wide text-ink-tertiary">
                <th className="text-left py-2 font-medium">Medicine</th>
                <th className="text-right py-2 font-medium">Units</th>
                <th className="text-right py-2 font-medium">Revenue</th>
                <th className="text-right py-2 font-medium">Margin</th>
              </tr>
            </thead>
            <tbody>
              {topSelling.map((m) =>
              <tr
                key={m.name}
                className="border-b border-line dark:border-line-dark last:border-0">
                
                  <td className="py-2.5 font-medium text-sm">{m.name}</td>
                  <td className="py-2.5 text-right">
                    <MonoNumber size="sm">{m.units}</MonoNumber>
                  </td>
                  <td className="py-2.5 text-right">
                    <MoneyText amount={m.revenue} size="sm" weight="medium" />
                  </td>
                  <td className="py-2.5 text-right">
                    <MonoNumber size="sm" className="text-success">
                      {m.margin}
                    </MonoNumber>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        <Card>
          <SectionTitle title="Stock health" />
          <div className="space-y-3">
            {[
            {
              label: 'In stock',
              count: 218,
              value: 380000,
              tone: 'success' as const
            },
            {
              label: 'Low stock',
              count: 18,
              value: 24000,
              tone: 'warning' as const
            },
            {
              label: 'Out of stock',
              count: 12,
              value: 0,
              tone: 'danger' as const
            },
            {
              label: 'Expiring (30d)',
              count: 8,
              value: 12000,
              tone: 'warning' as const
            },
            {
              label: 'Expired',
              count: 2,
              value: 800,
              tone: 'danger' as const
            }].
            map((s, i) =>
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-line dark:border-line-dark last:border-0">
              
                <div className="flex items-center gap-3">
                  <StatusBadge tone={s.tone} dot size="sm">
                    {s.label}
                  </StatusBadge>
                  <MonoNumber size="sm" className="text-ink-secondary">
                    {s.count} SKUs
                  </MonoNumber>
                </div>
                <MoneyText amount={s.value} size="sm" weight="medium" />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>);

}