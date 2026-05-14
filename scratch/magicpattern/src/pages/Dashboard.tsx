import React from 'react';
import {
  CalendarCheckIcon,
  UsersIcon,
  BanknoteIcon,
  ReceiptIcon,
  FlaskConicalIcon,
  PackageIcon,
  BedDoubleIcon,
  StethoscopeIcon,
  ArrowUpRightIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { MetricCard } from '../components/primitives/MetricCard';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { DataTable, Column } from '../components/primitives/DataTable';
import { MonoNumber, MoneyText } from '../components/primitives/MonoNumber';
import { AutoStatusBadge } from '../components/primitives/StatusBadge';
import { AIInsightPanel } from '../components/primitives/AIInsightPanel';
import {
  SimpleLineChart,
  SimpleBarChart,
  DonutChart } from
'../components/charts/MiniChart';
import { queue, invoices, aiInsights } from '../lib/mockData';
const opdTrend = [
{
  label: 'Mon',
  value: 42
},
{
  label: 'Tue',
  value: 51
},
{
  label: 'Wed',
  value: 47
},
{
  label: 'Thu',
  value: 58
},
{
  label: 'Fri',
  value: 64
},
{
  label: 'Sat',
  value: 72
},
{
  label: 'Sun',
  value: 38
}];

const revenueTrend = [
{
  label: 'W1',
  value: 184200
},
{
  label: 'W2',
  value: 212400
},
{
  label: 'W3',
  value: 198600
},
{
  label: 'W4',
  value: 241800
},
{
  label: 'W5',
  value: 226400
},
{
  label: 'W6',
  value: 268900
},
{
  label: 'W7',
  value: 254200
}];

const deptRevenue = [
{
  label: 'General Medicine',
  value: 84200,
  color: '#3F8E84'
},
{
  label: 'Cardiology',
  value: 62400,
  color: '#5A7A8C'
},
{
  label: 'Pediatrics',
  value: 38600,
  color: '#B8893A'
},
{
  label: 'Orthopedics',
  value: 41200,
  color: '#4F8A5C'
},
{
  label: 'Gynecology',
  value: 28400,
  color: '#9A9A98'
}];

const appointmentStatus = [
{
  label: 'Completed',
  value: 28,
  color: '#4F8A5C'
},
{
  label: 'In progress',
  value: 6,
  color: '#5A7A8C'
},
{
  label: 'Waiting',
  value: 8,
  color: '#B8893A'
},
{
  label: 'No-show',
  value: 2,
  color: '#B84A4A'
}];

const queueCols: Column<(typeof queue)[number]>[] = [
{
  key: 'token',
  header: 'Token',
  width: '90px',
  render: (r) => <MonoNumber weight="medium">{r.token}</MonoNumber>
},
{
  key: 'patient',
  header: 'Patient',
  render: (r) =>
  <div>
        <div className="font-medium text-ink-primary dark:text-ink-primary-dark">
          {r.patient}
        </div>
        <MonoNumber size="xs" className="text-ink-tertiary">
          {r.pid}
        </MonoNumber>
      </div>

},
{
  key: 'doctor',
  header: 'Doctor',
  render: (r) => <span className="text-ink-secondary">{r.doctor}</span>
},
{
  key: 'time',
  header: 'Time',
  render: (r) => <MonoNumber size="sm">{r.time}</MonoNumber>
},
{
  key: 'waited',
  header: 'Waited',
  render: (r) =>
  <MonoNumber size="sm" className="text-ink-secondary">
        {r.waited}
      </MonoNumber>

},
{
  key: 'status',
  header: 'Status',
  render: (r) => <AutoStatusBadge status={r.status} />
},
{
  key: 'payment',
  header: 'Payment',
  render: (r) => <AutoStatusBadge status={r.payment} />
}];

const paymentCols: Column<(typeof invoices)[number]>[] = [
{
  key: 'id',
  header: 'Invoice',
  render: (r) => <MonoNumber size="sm">{r.id}</MonoNumber>
},
{
  key: 'patient',
  header: 'Patient',
  render: (r) => <span className="font-medium">{r.patient}</span>
},
{
  key: 'amount',
  header: 'Amount',
  align: 'right',
  render: (r) => <MoneyText amount={r.amount} weight="medium" size="sm" />
},
{
  key: 'balance',
  header: 'Balance',
  align: 'right',
  render: (r) =>
  r.balance > 0 ?
  <MoneyText amount={r.balance} size="sm" className="text-warning" /> :

  <span className="text-ink-tertiary text-xs">—</span>

},
{
  key: 'status',
  header: 'Status',
  render: (r) => <AutoStatusBadge status={r.status} />
}];

export function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Good morning, Anjali"
        description="Here's what's happening at Hospeon Kochi — MG Road today."
        breadcrumbs={[
        {
          label: 'Overview'
        },
        {
          label: 'Dashboard'
        }]
        }
        actions={
        <>
            <Button variant="secondary">Export today</Button>
            <Button variant="primary">New appointment</Button>
          </>
        } />
      

      {/* Top metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Appointments today"
          value="44"
          icon={<CalendarCheckIcon />}
          delta={{
            value: '+8',
            trend: 'up',
            tone: 'positive'
          }} />
        
        <MetricCard
          label="Waiting patients"
          value="8"
          icon={<UsersIcon />}
          tone="warning"
          sublabel="avg 14m" />
        
        <MetricCard
          label="Revenue today"
          value="₹68,420"
          icon={<BanknoteIcon />}
          delta={{
            value: '+12%',
            trend: 'up',
            tone: 'positive'
          }} />
        
        <MetricCard
          label="Pending bills"
          value="₹24,180"
          icon={<ReceiptIcon />}
          tone="warning"
          delta={{
            value: '−4%',
            trend: 'down',
            tone: 'positive'
          }} />
        
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Lab reports pending"
          value="14"
          icon={<FlaskConicalIcon />}
          sublabel="3 urgent" />
        
        <MetricCard
          label="Pharmacy low stock"
          value="7"
          icon={<PackageIcon />}
          tone="danger" />
        
        <MetricCard
          label="Bed occupancy"
          value="68%"
          icon={<BedDoubleIcon />}
          sublabel="17/25" />
        
        <MetricCard
          label="Doctors on duty"
          value="5/6"
          icon={<StethoscopeIcon />}
          sublabel="1 on leave" />
        
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Revenue trend"
            description="Last 7 weeks · Net collection"
            action={
            <button className="text-xs text-ink-secondary hover:text-ink-primary inline-flex items-center gap-1">
                View report <ArrowUpRightIcon className="w-3 h-3" />
              </button>
            } />
          
          <SimpleLineChart data={revenueTrend} height={220} />
        </Card>
        <Card>
          <SectionTitle
            title="Appointments today"
            description="Status breakdown" />
          
          <DonutChart
            data={appointmentStatus}
            centerValue="44"
            centerLabel="Total"
            size={150} />
          
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <SectionTitle title="OPD visits" description="Last 7 days" />
          <SimpleBarChart data={opdTrend} height={180} color="#5A7A8C" />
        </Card>
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Department-wise revenue"
            description="Month to date" />
          
          <div className="space-y-3 mt-2">
            {deptRevenue.map((d) => {
              const max = Math.max(...deptRevenue.map((x) => x.value));
              return (
                <div key={d.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-secondary">{d.label}</span>
                    <MoneyText amount={d.value} size="sm" weight="medium" />
                  </div>
                  <div className="h-1.5 rounded-full bg-subtle dark:bg-subtle-dark overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${d.value / max * 100}%`,
                        backgroundColor: d.color
                      }} />
                    
                  </div>
                </div>);

            })}
          </div>
        </Card>
      </div>

      {/* AI insights + tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <SectionTitle
              title="Active queue"
              description={

              <span className="text-xs text-ink-secondary">
                    {queue.length} patients · live
                  </span> as
              any
              }
              action={
              <Button size="sm" variant="ghost">
                  Open queue →
                </Button>
              } />
            
            <DataTable
              data={queue.slice(0, 6)}
              columns={queueCols}
              dense
              rowKey={(r) => r.token} />
            
          </Card>
        </div>
        <AIInsightPanel
          title="Today's operational insights"
          subtitle="AI-generated · refreshed 2m ago"
          insights={aiInsights as any} />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle
            title="Recent payments"
            action={
            <Button size="sm" variant="ghost">
                View all →
              </Button>
            } />
          
          <DataTable
            data={invoices.slice(0, 5)}
            columns={paymentCols}
            dense
            rowKey={(r) => r.id} />
          
        </Card>
        <Card>
          <SectionTitle title="Pending tasks" />
          <div className="space-y-3">
            {[
            {
              task: 'Approve lab reports',
              count: 4,
              tone: 'warning' as const
            },
            {
              task: 'Review AI-drafted prescriptions',
              count: 2,
              tone: 'info' as const
            },
            {
              task: 'Follow-up calls due',
              count: 12,
              tone: 'info' as const
            },
            {
              task: 'Discharge summaries to finalize',
              count: 1,
              tone: 'warning' as const
            },
            {
              task: 'Pharmacy purchase orders pending',
              count: 3,
              tone: 'info' as const
            }].
            map((t, i) =>
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-line dark:border-line-dark last:border-0">
              
                <span className="text-sm text-ink-primary dark:text-ink-primary-dark">
                  {t.task}
                </span>
                <div className="flex items-center gap-3">
                  <MonoNumber
                  size="sm"
                  weight="medium"
                  className="text-ink-secondary">
                  
                    {t.count}
                  </MonoNumber>
                  <button className="text-xs text-accent hover:underline">
                    Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>);

}