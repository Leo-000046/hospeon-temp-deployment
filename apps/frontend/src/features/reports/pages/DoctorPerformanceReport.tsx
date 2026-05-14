import React from 'react';
import { Link } from 'react-router-dom';
import {
  StethoscopeIcon,
  ClockIcon,
  IndianRupeeIcon,
  StarIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { Select } from '@/components/ui/Input';
import { MonoNumber } from '@/components/ui/MonoNumber';
import { DataTable } from '@/components/ui/DataTable';
import { SimpleLineChart, SimpleBarChart } from '@/components/data-display/MiniChart';
const trend = [142, 158, 134, 168, 172, 188, 162, 192, 204, 178, 196, 218];
const trendLabels = [
'W1',
'W2',
'W3',
'W4',
'W5',
'W6',
'W7',
'W8',
'W9',
'W10',
'W11',
'W12'];

const durationCompare = [12, 14, 11, 13, 15, 12, 14];
const durationLabels = [
'Rao',
'Menon',
'Khanna',
'Sharma',
'Gupta',
'Patel',
'Avg'];

const doctors = [
{
  rank: 1,
  name: 'Dr. Anjali Rao',
  dept: 'Cardiology',
  consults: 218,
  duration: '11m 42s',
  revenue: '₹2,18,400',
  rating: 4.8,
  reviews: 142
},
{
  rank: 2,
  name: 'Dr. Priya Khanna',
  dept: 'Pediatrics',
  consults: 196,
  duration: '13m 04s',
  revenue: '₹1,76,800',
  rating: 4.7,
  reviews: 118
},
{
  rank: 3,
  name: 'Dr. Vikram Menon',
  dept: 'General Med.',
  consults: 184,
  duration: '14m 22s',
  revenue: '₹1,42,600',
  rating: 4.6,
  reviews: 96
},
{
  rank: 4,
  name: 'Dr. Arjun Patel',
  dept: 'ENT',
  consults: 152,
  duration: '12m 18s',
  revenue: '₹1,28,400',
  rating: 4.6,
  reviews: 84
},
{
  rank: 5,
  name: 'Dr. Neha Gupta',
  dept: 'Dermatology',
  consults: 148,
  duration: '15m 02s',
  revenue: '₹1,38,200',
  rating: 4.5,
  reviews: 72
},
{
  rank: 6,
  name: 'Dr. Rajiv Sharma',
  dept: 'Orthopedics',
  consults: 132,
  duration: '13m 44s',
  revenue: '₹1,52,800',
  rating: 4.4,
  reviews: 68
},
{
  rank: 7,
  name: 'Dr. Sunita Bose',
  dept: 'Gynecology',
  consults: 124,
  duration: '16m 12s',
  revenue: '₹1,12,400',
  rating: 4.5,
  reviews: 58
},
{
  rank: 8,
  name: 'Dr. Manoj Reddy',
  dept: 'Diabetology',
  consults: 108,
  duration: '14m 56s',
  revenue: '₹98,200',
  rating: 4.3,
  reviews: 52
}];

export function DoctorPerformanceReport() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctor performance"
        description="Last 12 weeks · All branches"
        actions={
        <>
            <Select className="w-40">
              <option>All doctors</option>
            </Select>
            <Select className="w-40">
              <option>All departments</option>
            </Select>
            <Select className="w-40">
              <option>Last 12 weeks</option>
              <option>Last 30 days</option>
              <option>This year</option>
            </Select>
            <Button variant="secondary">Export CSV</Button>
          </>
        } />
      

      <div className="rounded-2xl bg-subtle/40 dark:bg-subtle-dark/40 border border-line dark:border-line-dark px-4 py-3 text-xs text-ink-secondary dark:text-ink-secondary-dark">
        Performance metrics are intended for{' '}
        <span className="font-semibold text-ink-primary dark:text-ink-primary-dark">
          internal quality improvement
        </span>{' '}
        — not punitive evaluation. Consider context (case mix, complexity,
        scheduling) before drawing conclusions.
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total consultations"
          value={<MonoNumber>1,262</MonoNumber>}
          hint="+8.4% vs prev. period"
          trend="up"
          icon={<StethoscopeIcon className="w-4 h-4" />} />
        
        <MetricCard
          label="Avg. consult duration"
          value={<MonoNumber>13m 28s</MonoNumber>}
          hint="Across all doctors"
          icon={<ClockIcon className="w-4 h-4" />} />
        
        <MetricCard
          label="Revenue generated"
          value={
          <>
              <span className="font-mono">₹13,67,800</span>
            </>
          }
          hint="+12% vs prev. period"
          trend="up"
          icon={<IndianRupeeIcon className="w-4 h-4" />} />
        
        <MetricCard
          label="Avg. patient rating"
          value={
          <>
              <MonoNumber>4.6</MonoNumber> / 5
            </>
          }
          hint="710 reviews"
          icon={<StarIcon className="w-4 h-4" />} />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <SectionTitle
            title="Consultations trend"
            description="Weekly volume" />
          
          <SimpleLineChart data={trend} height={180} />
        </Card>
        <Card>
          <SectionTitle
            title="Avg. duration vs clinic average"
            description="Minutes per consult" />
          
          <SimpleBarChart data={durationCompare} height={180} />
        </Card>
      </div>

      <Card>
        <SectionTitle
          title="Leaderboard"
          description="Ranked by total consultations · click row to drill in" />
        
        <DataTable
          data={doctors}
          columns={[
          {
            key: 'rank',
            header: '#',
            render: (r) =>
            <MonoNumber className="text-ink-tertiary">#{r.rank}</MonoNumber>

          },
          {
            key: 'name',
            header: 'Doctor'
          },
          {
            key: 'dept',
            header: 'Department',
            render: (r) =>
            <span className="text-xs px-2 py-0.5 rounded bg-subtle dark:bg-subtle-dark text-ink-secondary">
                  {r.dept}
                </span>

          },
          {
            key: 'consults',
            header: 'Consults',
            align: 'right',
            render: (r) => <MonoNumber>{r.consults}</MonoNumber>
          },
          {
            key: 'duration',
            header: 'Avg. duration',
            align: 'right',
            render: (r) =>
            <MonoNumber className="text-ink-tertiary">
                  {r.duration}
                </MonoNumber>

          },
          {
            key: 'revenue',
            header: 'Revenue',
            align: 'right',
            render: (r) => <span className="font-mono">{r.revenue}</span>
          },
          {
            key: 'rating',
            header: 'Rating',
            align: 'right',
            render: (r) =>
            <div className="inline-flex items-center gap-1">
                  <StarIcon className="w-3.5 h-3.5 text-warning fill-warning" />
                  <MonoNumber>{r.rating}</MonoNumber>
                  <span className="text-ink-tertiary text-[11px]">
                    ({r.reviews})
                  </span>
                </div>

          }]
          } />
        
      </Card>
    </div>);

}