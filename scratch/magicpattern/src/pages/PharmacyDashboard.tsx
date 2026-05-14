import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCartIcon,
  ReceiptIcon,
  IndianRupeeIcon,
  AlertTriangleIcon,
  PackageIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { MetricCard } from '../components/primitives/MetricCard';
import { Button } from '../components/primitives/Button';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { AIInsightPanel } from '../components/primitives/AIInsightPanel';
import { Sparkline } from '../components/charts/MiniChart';
import { DataTable } from '../components/primitives/DataTable';
const todaySales = [12, 18, 22, 31, 28, 42, 38, 51, 47, 60, 58, 64, 72, 78, 84];
const lowStock = [
{
  name: 'Metformin 500mg',
  batch: 'MET-2025-118',
  qty: 24,
  reorder: 100,
  supplier: 'Cipla'
},
{
  name: 'Atorvastatin 20mg',
  batch: 'ATR-2025-091',
  qty: 18,
  reorder: 80,
  supplier: 'Sun Pharma'
},
{
  name: 'Pantoprazole 40mg',
  batch: 'PTP-2025-203',
  qty: 32,
  reorder: 120,
  supplier: 'Dr Reddy'
},
{
  name: 'Amlodipine 5mg',
  batch: 'AML-2025-076',
  qty: 14,
  reorder: 100,
  supplier: 'Lupin'
}];

const expiring = [
{
  name: 'Cefixime 200mg',
  batch: 'CFX-2024-401',
  expiry: '28 May 2026',
  qty: 42
},
{
  name: 'Azithromycin 500mg',
  batch: 'AZT-2024-322',
  expiry: '02 Jun 2026',
  qty: 28
},
{
  name: 'Insulin (Mixtard)',
  batch: 'INS-2024-118',
  expiry: '08 Jun 2026',
  qty: 14
}];

const topSelling = [
{
  name: 'Paracetamol 650mg',
  units: 84,
  total: 100
},
{
  name: 'Pantoprazole 40mg',
  units: 62,
  total: 100
},
{
  name: 'Metformin 500mg',
  units: 48,
  total: 100
},
{
  name: 'Telmisartan 40mg',
  units: 41,
  total: 100
},
{
  name: 'Atorvastatin 20mg',
  units: 36,
  total: 100
}];

const pendingRx = [
{
  id: 'RX-2026-08412',
  patient: 'Anjali Kapoor',
  items: 3,
  age: '4 min'
},
{
  id: 'RX-2026-08411',
  patient: 'Rohan Mehta',
  items: 5,
  age: '12 min'
},
{
  id: 'RX-2026-08409',
  patient: 'Suresh Pillai',
  items: 2,
  age: '24 min'
}];

export function PharmacyDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Pharmacy"
        description="Live operational view"
        actions={
        <>
            <Link to="/pharmacy/stock">
              <Button variant="secondary">
                <PackageIcon className="w-4 h-4" />
                Stock entry
              </Button>
            </Link>
            <Link to="/pharmacy/sales">
              <Button variant="primary">
                <ShoppingCartIcon className="w-4 h-4" />
                New sale
              </Button>
            </Link>
          </>
        } />
      

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Today's sales"
          value={
          <>
              <span className="font-mono">₹84,320</span>
            </>
          }
          hint="+12% vs yesterday"
          trend="up"
          icon={<IndianRupeeIcon className="w-4 h-4" />} />
        
        <MetricCard
          label="Bills issued"
          value={<MonoNumber>62</MonoNumber>}
          hint="Avg. ₹1,360"
          icon={<ReceiptIcon className="w-4 h-4" />} />
        
        <MetricCard
          label="Avg. bill value"
          value={
          <>
              <span className="font-mono">₹1,360</span>
            </>
          }
          hint="−4% vs last week"
          trend="down" />
        
        <MetricCard
          label="Stockouts"
          value={<MonoNumber>4</MonoNumber>}
          hint="Reorder needed"
          icon={<AlertTriangleIcon className="w-4 h-4" />} />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-start justify-between mb-3">
              <SectionTitle
                title="Today's sales trend"
                description="Hourly, since 08:00" />
              
              <div className="text-right">
                <MonoNumber className="text-2xl font-semibold text-ink-primary dark:text-ink-primary-dark">
                  ₹84,320
                </MonoNumber>
                <div className="text-xs text-success">+12.4%</div>
              </div>
            </div>
            <Sparkline data={todaySales} height={56} />
          </Card>

          <Card>
            <SectionTitle
              title="Low stock alerts"
              description="Below reorder point" />
            
            <DataTable
              data={lowStock}
              columns={[
              {
                key: 'name',
                header: 'Medicine'
              },
              {
                key: 'batch',
                header: 'Batch',
                render: (r) =>
                <MonoNumber className="text-xs text-ink-tertiary">
                      {r.batch}
                    </MonoNumber>

              },
              {
                key: 'qty',
                header: 'In stock',
                align: 'right',
                render: (r) =>
                <MonoNumber className="text-warning font-semibold">
                      {r.qty}
                    </MonoNumber>

              },
              {
                key: 'reorder',
                header: 'Reorder pt.',
                align: 'right',
                render: (r) =>
                <MonoNumber className="text-ink-tertiary">
                      {r.reorder}
                    </MonoNumber>

              },
              {
                key: 'supplier',
                header: 'Supplier'
              },
              {
                key: 'action',
                header: '',
                align: 'right',
                render: () =>
                <Button variant="ghost" className="!py-1 !px-2.5 text-xs">
                      Reorder
                    </Button>

              }]
              }
              dense />
            
          </Card>

          <Card>
            <SectionTitle title="Expiring within 30 days" />
            <div className="space-y-2">
              {expiring.map((e) =>
              <div
                key={e.batch}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-warning-soft/40 border border-warning-soft">
                
                  <AlertTriangleIcon className="w-4 h-4 text-warning shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ink-primary dark:text-ink-primary-dark">
                      {e.name}
                    </div>
                    <MonoNumber className="text-[11px] text-ink-tertiary">
                      {e.batch}
                    </MonoNumber>
                  </div>
                  <MonoNumber className="text-xs text-ink-secondary">
                    {e.qty} units
                  </MonoNumber>
                  <MonoNumber className="text-xs font-semibold text-warning">
                    {e.expiry}
                  </MonoNumber>
                </div>
              )}
            </div>
            <Link
              to="/pharmacy/expiry"
              className="text-xs text-accent hover:underline mt-3 inline-block">
              
              View all expiry alerts →
            </Link>
          </Card>
        </div>

        <div className="space-y-6">
          <AIInsightPanel
            title="AI inventory suggestions"
            description="Based on consumption patterns of the last 60 days."
            insights={[
            {
              text: 'Reorder Metformin 500mg — projected stockout in 4 days at current consumption rate.',
              action: {
                label: 'Create PO',
                to: '/pharmacy/purchase'
              }
            },
            {
              text: 'Slow-moving: Cefuroxime 250mg — 0 sales in 18 days. Consider returning to supplier.',
              action: {
                label: 'Review batch'
              }
            },
            {
              text: 'Promotional bundle opportunity: Paracetamol + Pantoprazole together in 38% of bills.'
            }]
            } />
          

          <Card>
            <SectionTitle title="Top selling today" />
            <div className="space-y-2.5">
              {topSelling.map((t) =>
              <div key={t.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-primary dark:text-ink-primary-dark truncate">
                      {t.name}
                    </span>
                    <MonoNumber className="text-ink-tertiary">
                      {t.units}
                    </MonoNumber>
                  </div>
                  <div className="h-1.5 bg-subtle dark:bg-subtle-dark rounded-full overflow-hidden">
                    <div
                    className="h-full bg-accent rounded-full"
                    style={{
                      width: `${t.units / t.total * 100}%`
                    }} />
                  
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Pending prescriptions"
              description="Awaiting dispense" />
            
            <div className="space-y-2">
              {pendingRx.map((r) =>
              <div
                key={r.id}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-subtle/50 dark:hover:bg-subtle-dark/50">
                
                  <div className="flex-1 min-w-0">
                    <MonoNumber className="text-[11px] text-ink-tertiary">
                      {r.id}
                    </MonoNumber>
                    <div className="text-xs text-ink-primary dark:text-ink-primary-dark truncate">
                      {r.patient}
                    </div>
                  </div>
                  <MonoNumber className="text-[11px] text-ink-secondary">
                    {r.items} items
                  </MonoNumber>
                  <Button variant="ghost" className="!py-1 !px-2 text-xs">
                    Dispense
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>);

}