import React from 'react';
import {
  LockIcon,
  DownloadIcon,
  BanknoteIcon,
  SmartphoneIcon,
  CreditCardIcon,
  GlobeIcon,
  AlertTriangleIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { MonoNumber, MoneyText } from '@/components/ui/MonoNumber';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DonutChart } from '@/components/data-display/MiniChart';
export function DayClosing() {
  const modes = [
  {
    l: 'Cash',
    icon: BanknoteIcon,
    count: 18,
    amount: 24200,
    color: '#9A9A98'
  },
  {
    l: 'UPI',
    icon: SmartphoneIcon,
    count: 24,
    amount: 32400,
    color: '#3F8E84'
  },
  {
    l: 'Card',
    icon: CreditCardIcon,
    count: 6,
    amount: 8600,
    color: '#5A7A8C'
  },
  {
    l: 'Online',
    icon: GlobeIcon,
    count: 4,
    amount: 3220,
    color: '#B8893A'
  }];

  const totalCollected = modes.reduce((s, m) => s + m.amount, 0);
  const staff = [
  {
    name: 'Priya R.',
    role: 'Receptionist',
    cash: 16400,
    upi: 18200,
    card: 4200,
    total: 38800
  },
  {
    name: 'Sunil K.',
    role: 'Accountant',
    cash: 7800,
    upi: 14200,
    card: 4400,
    total: 26400
  },
  {
    name: 'Manoj P.',
    role: 'Pharmacist',
    cash: 0,
    upi: 0,
    card: 0,
    total: 3220
  }];

  return (
    <div>
      <PageHeader
        title="Day closing"
        description="Reconcile today's collections and close the day."
        breadcrumbs={[
        {
          label: 'Billing'
        },
        {
          label: 'Day closing'
        }]
        }
        meta={
        <div className="text-sm text-ink-secondary">
            Tuesday, 12 May 2026 ·{' '}
            <MonoNumber size="sm" className="text-ink-tertiary">
              opened 08:00 by Priya R.
            </MonoNumber>
          </div>
        }
        actions={
        <>
            <Button variant="secondary" icon={<DownloadIcon />}>
              Export
            </Button>
            <Button variant="primary" icon={<LockIcon />}>
              Close day
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Gross collection"
          value="₹70,820"
          sublabel="incl. tax" />
        
        <MetricCard label="Refunds" value="−₹1,200" tone="warning" />
        <MetricCard label="Discounts" value="−₹1,200" />
        <MetricCard
          label="Net collection"
          value="₹68,420"
          delta={{
            value: '+12%',
            trend: 'up',
            tone: 'positive'
          }} />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Collection by payment mode"
            description="Today" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <DonutChart
              data={modes.map((m) => ({
                label: m.l,
                value: m.amount,
                color: m.color
              }))}
              centerValue="₹68k"
              centerLabel="Net collected" />
            
            <div className="space-y-2">
              {modes.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.l}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-subtle/40 dark:bg-subtle-dark/40">
                    
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: m.color + '22',
                          color: m.color
                        }}>
                        
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{m.l}</div>
                        <div className="text-[10px] text-ink-tertiary">
                          <MonoNumber size="xs">{m.count}</MonoNumber>{' '}
                          transactions
                        </div>
                      </div>
                    </div>
                    <MoneyText amount={m.amount} size="sm" weight="semibold" />
                  </div>);

              })}
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Reconciliation" />
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-secondary">Expected cash</span>
              <MoneyText amount={24200} size="sm" weight="medium" />
            </div>
            <div className="flex justify-between">
              <span className="text-ink-secondary">Counted cash</span>
              <input
                className="w-24 h-7 text-right rounded-md border border-line dark:border-line-dark bg-surface dark:bg-surface-dark px-2 text-sm font-mono"
                defaultValue="24200" />
              
            </div>
            <div className="flex justify-between pt-2 border-t border-line dark:border-line-dark">
              <span>Variance</span>
              <span className="text-success font-medium">₹0</span>
            </div>
            <hr className="border-line dark:border-line-dark" />
            <div className="flex justify-between">
              <span className="text-ink-secondary">UPI settlements</span>
              <StatusBadge tone="warning" size="sm">
                Pending
              </StatusBadge>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-secondary">Card settlements</span>
              <StatusBadge tone="success" size="sm">
                Settled
              </StatusBadge>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-warning-soft/60 flex gap-2">
            <AlertTriangleIcon className="w-4 h-4 text-warning mt-0.5 shrink-0" />
            <p className="text-xs text-ink-primary">
              Ensure cash drawer matches before closing. Once closed,
              transactions cannot be added to this day.
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle title="Staff-wise collection" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line dark:border-line-dark text-xs text-ink-tertiary uppercase tracking-wide">
                <th className="text-left py-2 font-medium">Staff</th>
                <th className="text-left py-2 font-medium">Role</th>
                <th className="text-right py-2 font-medium">Cash</th>
                <th className="text-right py-2 font-medium">UPI</th>
                <th className="text-right py-2 font-medium">Card</th>
                <th className="text-right py-2 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) =>
              <tr
                key={s.name}
                className="border-b border-line dark:border-line-dark last:border-0">
                
                  <td className="py-3 font-medium">{s.name}</td>
                  <td className="py-3">
                    <StatusBadge tone="neutral" size="sm">
                      {s.role}
                    </StatusBadge>
                  </td>
                  <td className="py-3 text-right">
                    <MoneyText amount={s.cash} size="sm" />
                  </td>
                  <td className="py-3 text-right">
                    <MoneyText amount={s.upi} size="sm" />
                  </td>
                  <td className="py-3 text-right">
                    <MoneyText amount={s.card} size="sm" />
                  </td>
                  <td className="py-3 text-right">
                    <MoneyText amount={s.total} size="sm" weight="semibold" />
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t border-line dark:border-line-dark font-semibold">
                <td colSpan={2} className="py-3">
                  Total
                </td>
                <td className="py-3 text-right">
                  <MoneyText amount={24200} size="sm" weight="semibold" />
                </td>
                <td className="py-3 text-right">
                  <MoneyText amount={32400} size="sm" weight="semibold" />
                </td>
                <td className="py-3 text-right">
                  <MoneyText amount={8600} size="sm" weight="semibold" />
                </td>
                <td className="py-3 text-right">
                  <MoneyText
                    amount={totalCollected}
                    size="sm"
                    weight="semibold" />
                  
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>);

}