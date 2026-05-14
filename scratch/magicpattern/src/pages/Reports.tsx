import React from 'react';
import { DownloadIcon, FilterIcon } from 'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Select } from '../components/primitives/Input';
import { MetricCard } from '../components/primitives/MetricCard';
import { MoneyText, MonoNumber } from '../components/primitives/MonoNumber';
import {
  SimpleLineChart,
  DonutChart,
  SimpleBarChart } from
'../components/charts/MiniChart';
const revenueData = [
{
  label: 'Apr 1',
  value: 18420
},
{
  label: 'Apr 8',
  value: 22100
},
{
  label: 'Apr 15',
  value: 19840
},
{
  label: 'Apr 22',
  value: 24800
},
{
  label: 'Apr 29',
  value: 28600
},
{
  label: 'May 6',
  value: 26420
},
{
  label: 'May 12',
  value: 31820
}];

const modeSplit = [
{
  label: 'Cash',
  value: 28400,
  color: '#9A9A98'
},
{
  label: 'UPI',
  value: 42200,
  color: '#3F8E84'
},
{
  label: 'Card',
  value: 18600,
  color: '#5A7A8C'
},
{
  label: 'Online',
  value: 12400,
  color: '#B8893A'
}];

export function RevenueReport() {
  return (
    <div>
      <PageHeader
        title="Revenue report"
        description="Track revenue across branches, doctors, and departments."
        breadcrumbs={[
        {
          label: 'Reports'
        },
        {
          label: 'Revenue'
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Select label="Date range" defaultValue="this-month">
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="this-month">This month</option>
            <option value="last-month">Last month</option>
            <option value="custom">Custom</option>
          </Select>
          <Select label="Branch">
            <option>All branches</option>
            <option>MG Road</option>
            <option>Kakkanad</option>
          </Select>
          <Select label="Doctor">
            <option>All doctors</option>
          </Select>
          <Select label="Department">
            <option>All departments</option>
          </Select>
          <Select label="Payment mode">
            <option>All modes</option>
          </Select>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Gross revenue"
          value="₹14.8L"
          delta={{
            value: '+18%',
            trend: 'up',
            tone: 'positive'
          }} />
        
        <MetricCard label="Discounts" value="₹64,200" />
        <MetricCard label="Refunds" value="₹8,400" tone="warning" />
        <MetricCard
          label="Net collected"
          value="₹14.0L"
          delta={{
            value: '+22%',
            trend: 'up',
            tone: 'positive'
          }} />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Revenue trend"
            description="Daily collection — this month" />
          
          <SimpleLineChart data={revenueData} height={220} />
        </Card>
        <Card>
          <SectionTitle title="Payment mode" />
          <DonutChart
            data={modeSplit}
            centerValue="₹1.4M"
            centerLabel="This month" />
          
        </Card>
      </div>

      <Card>
        <SectionTitle title="Daily breakdown" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line dark:border-line-dark text-xs text-ink-tertiary uppercase tracking-wide">
                <th className="py-2 text-left font-medium">Date</th>
                <th className="py-2 text-right font-medium">Gross</th>
                <th className="py-2 text-right font-medium">Discount</th>
                <th className="py-2 text-right font-medium">Refund</th>
                <th className="py-2 text-right font-medium">Net</th>
                <th className="py-2 text-right font-medium">Collected</th>
              </tr>
            </thead>
            <tbody>
              {[
              {
                d: '2026-05-12',
                g: 68420,
                dis: 2400,
                ref: 0,
                n: 66020,
                c: 64320
              },
              {
                d: '2026-05-11',
                g: 58200,
                dis: 1800,
                ref: 1200,
                n: 55200,
                c: 53400
              },
              {
                d: '2026-05-10',
                g: 71400,
                dis: 3200,
                ref: 0,
                n: 68200,
                c: 68200
              },
              {
                d: '2026-05-09',
                g: 42800,
                dis: 1200,
                ref: 800,
                n: 40800,
                c: 40800
              },
              {
                d: '2026-05-08',
                g: 62100,
                dis: 2100,
                ref: 0,
                n: 60000,
                c: 58200
              }].
              map((r) =>
              <tr
                key={r.d}
                className="border-b border-line dark:border-line-dark last:border-0">
                
                  <td className="py-2.5">
                    <MonoNumber size="sm">{r.d}</MonoNumber>
                  </td>
                  <td className="py-2.5 text-right">
                    <MoneyText amount={r.g} size="sm" />
                  </td>
                  <td className="py-2.5 text-right text-ink-secondary">
                    <MoneyText amount={r.dis} size="sm" />
                  </td>
                  <td className="py-2.5 text-right text-ink-secondary">
                    <MoneyText amount={r.ref} size="sm" />
                  </td>
                  <td className="py-2.5 text-right">
                    <MoneyText amount={r.n} size="sm" weight="medium" />
                  </td>
                  <td className="py-2.5 text-right">
                    <MoneyText
                    amount={r.c}
                    size="sm"
                    weight="medium"
                    className="text-success" />
                  
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>);

}