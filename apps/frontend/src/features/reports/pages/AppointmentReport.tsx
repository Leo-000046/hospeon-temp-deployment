import React from 'react';
import { DownloadIcon, FilterIcon } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { MetricCard } from '@/components/ui/MetricCard';
import { MonoNumber } from '@/components/ui/MonoNumber';
import {
  SimpleLineChart,
  DonutChart,
  SimpleBarChart } from
'@/components/data-display/MiniChart';
import { StatusBadge } from '@/components/ui/StatusBadge';
export function AppointmentReport() {
  const trend = [
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

  const statusSplit = [
  {
    label: 'Completed',
    value: 182,
    color: '#4F8A5C'
  },
  {
    label: 'No-show',
    value: 22,
    color: '#B84A4A'
  },
  {
    label: 'Cancelled',
    value: 18,
    color: '#9A9A98'
  },
  {
    label: 'Rescheduled',
    value: 14,
    color: '#B8893A'
  }];

  const hourly = [
  {
    label: '9a',
    value: 24
  },
  {
    label: '10a',
    value: 32
  },
  {
    label: '11a',
    value: 38
  },
  {
    label: '12p',
    value: 22
  },
  {
    label: '1p',
    value: 14
  },
  {
    label: '2p',
    value: 18
  },
  {
    label: '3p',
    value: 26
  },
  {
    label: '4p',
    value: 34
  },
  {
    label: '5p',
    value: 40
  },
  {
    label: '6p',
    value: 32
  }];

  const doctors = [
  {
    name: 'Dr. Anjali Menon',
    total: 68,
    completed: 64,
    noShow: 2,
    wait: 8,
    util: 92
  },
  {
    name: 'Dr. Rahul Verma',
    total: 54,
    completed: 48,
    noShow: 4,
    wait: 14,
    util: 96
  },
  {
    name: 'Dr. Priya Nair',
    total: 42,
    completed: 38,
    noShow: 3,
    wait: 12,
    util: 78
  },
  {
    name: 'Dr. Sameer Iqbal',
    total: 38,
    completed: 36,
    noShow: 1,
    wait: 6,
    util: 68
  },
  {
    name: 'Dr. Lakshmi Pillai',
    total: 34,
    completed: 32,
    noShow: 2,
    wait: 9,
    util: 72
  }];

  return (
    <div>
      <PageHeader
        title="Appointment report"
        description="Booking patterns, no-show rates, doctor utilization, and waiting times."
        breadcrumbs={[
        {
          label: 'Reports'
        },
        {
          label: 'Appointments'
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
          <Select label="Date range" defaultValue="month">
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="quarter">Quarter</option>
          </Select>
          <Select label="Branch">
            <option>All branches</option>
          </Select>
          <Select label="Doctor">
            <option>All doctors</option>
          </Select>
          <Select label="Department">
            <option>All departments</option>
          </Select>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <MetricCard
          label="Booked"
          value="236"
          delta={{
            value: '+14%',
            trend: 'up',
            tone: 'positive'
          }} />
        
        <MetricCard label="Completed" value="182" sublabel="77.1%" />
        <MetricCard label="No-show" value="22" tone="warning" sublabel="9.3%" />
        <MetricCard label="Cancelled" value="18" sublabel="7.6%" />
        <MetricCard label="Avg waiting" value="14m" sublabel="target ≤ 15m" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <SectionTitle title="Bookings trend" description="Last 7 days" />
          <SimpleLineChart data={trend} height={220} />
        </Card>
        <Card>
          <SectionTitle title="Status breakdown" />
          <DonutChart
            data={statusSplit}
            centerValue="236"
            centerLabel="Total" />
          
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card>
          <SectionTitle
            title="Hourly distribution"
            description="Most booked time slots" />
          
          <SimpleBarChart data={hourly} height={180} color="#5A7A8C" />
        </Card>
        <Card className="lg:col-span-2">
          <SectionTitle title="Doctor performance" />
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line dark:border-line-dark text-xs uppercase tracking-wide text-ink-tertiary">
                <th className="text-left py-2 font-medium">Doctor</th>
                <th className="text-right py-2 font-medium">Booked</th>
                <th className="text-right py-2 font-medium">Completed</th>
                <th className="text-right py-2 font-medium">No-show</th>
                <th className="text-right py-2 font-medium">Avg wait</th>
                <th className="text-right py-2 font-medium">Utilisation</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) =>
              <tr
                key={d.name}
                className="border-b border-line dark:border-line-dark last:border-0">
                
                  <td className="py-2.5 font-medium text-sm">{d.name}</td>
                  <td className="py-2.5 text-right">
                    <MonoNumber size="sm">{d.total}</MonoNumber>
                  </td>
                  <td className="py-2.5 text-right">
                    <MonoNumber size="sm" className="text-success">
                      {d.completed}
                    </MonoNumber>
                  </td>
                  <td className="py-2.5 text-right">
                    <MonoNumber
                    size="sm"
                    className={d.noShow > 3 ? 'text-warning' : ''}>
                    
                      {d.noShow}
                    </MonoNumber>
                  </td>
                  <td className="py-2.5 text-right">
                    <MonoNumber size="sm">{d.wait}m</MonoNumber>
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="inline-flex items-center gap-2 justify-end">
                      <div className="w-16 h-1.5 rounded-full bg-subtle dark:bg-subtle-dark overflow-hidden">
                        <div
                        className={`h-full ${d.util > 90 ? 'bg-warning' : 'bg-accent'}`}
                        style={{
                          width: `${d.util}%`
                        }} />
                      
                      </div>
                      <MonoNumber size="sm" weight="medium">
                        {d.util}%
                      </MonoNumber>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>

      <Card>
        <SectionTitle
          title="No-show patterns"
          description="Slots with elevated no-show risk" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
          {
            slot: 'Wed 09:00–11:00',
            rate: '22%',
            vol: 48,
            tone: 'warning' as const
          },
          {
            slot: 'Sat 16:00–18:00',
            rate: '18%',
            vol: 32,
            tone: 'warning' as const
          },
          {
            slot: 'Mon 18:00–20:00',
            rate: '4%',
            vol: 28,
            tone: 'success' as const
          }].
          map((p, i) =>
          <div
            key={i}
            className="p-3 rounded-xl border border-line dark:border-line-dark">
            
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{p.slot}</p>
                <StatusBadge tone={p.tone} size="sm">
                  {p.rate}
                </StatusBadge>
              </div>
              <p className="text-xs text-ink-secondary">
                No-show rate over <MonoNumber size="xs">{p.vol}</MonoNumber>{' '}
                slots
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>);

}