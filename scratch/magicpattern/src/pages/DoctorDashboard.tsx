import React from 'react';
import { Link } from 'react-router-dom';
import {
  StethoscopeIcon,
  ClockIcon,
  IndianRupeeIcon,
  FileTextIcon,
  PlayIcon,
  ChevronRightIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { MetricCard } from '../components/primitives/MetricCard';
import { Button } from '../components/primitives/Button';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { AutoStatusBadge } from '../components/primitives/StatusBadge';
import { AIInsightPanel } from '../components/primitives/AIInsightPanel';
import { SimpleBarChart, DonutChart } from '../components/charts/MiniChart';
const upNext = [
{
  token: 'T-0042',
  id: 'P-100482',
  name: 'Anjali Kapoor',
  age: 54,
  complaint: 'Chest discomfort, follow-up',
  wait: '4 min',
  status: 'waiting'
},
{
  token: 'T-0043',
  id: 'P-100501',
  name: 'Rohan Mehta',
  age: 38,
  complaint: 'Hypertension review',
  wait: '12 min',
  status: 'waiting'
},
{
  token: 'T-0044',
  id: 'P-100455',
  name: 'Kavita Iyer',
  age: 61,
  complaint: 'Post-angio review',
  wait: '18 min',
  status: 'waiting'
},
{
  token: 'T-0045',
  id: 'P-100529',
  name: 'Suresh Pillai',
  age: 47,
  complaint: 'Palpitations',
  wait: '24 min',
  status: 'waiting'
},
{
  token: 'T-0046',
  id: 'P-100488',
  name: 'Meena Joshi',
  age: 56,
  complaint: 'Cholesterol follow-up',
  wait: '31 min',
  status: 'waiting'
}];

const pendingReports = [
{
  id: 'LAB-2026-04812',
  patient: 'Anjali Kapoor',
  test: 'Lipid Profile, HbA1c',
  received: '32 min ago'
},
{
  id: 'LAB-2026-04809',
  patient: 'Vikram Shah',
  test: 'Troponin-I, CK-MB',
  received: '1 hr 12 min ago',
  critical: true
},
{
  id: 'LAB-2026-04801',
  patient: 'Kavita Iyer',
  test: 'Renal Panel',
  received: '2 hr 40 min ago'
},
{
  id: 'LAB-2026-04798',
  patient: 'Rakesh Malhotra',
  test: 'TSH, Free T4',
  received: '4 hr ago'
}];

const aiBriefing = [
{
  id: 'P-100482',
  text: 'HbA1c trending up over 6 months (7.1 → 8.4). Consider intensifying diabetes regimen.'
},
{
  id: 'P-100455',
  text: 'Post-angio patient — last echo 14 months ago. Recommend repeat assessment today.'
},
{
  id: 'P-100529',
  text: 'New patient with episodic palpitations + family history of SCD. Consider Holter monitor.'
}];

const weeklyVolume = [
{
  label: 'Mon',
  value: 22
},
{
  label: 'Tue',
  value: 18
},
{
  label: 'Wed',
  value: 24
},
{
  label: 'Thu',
  value: 19
},
{
  label: 'Fri',
  value: 21
},
{
  label: 'Sat',
  value: 17
},
{
  label: 'Sun',
  value: 14
}];

const topDx = [
{
  label: 'Hypertension',
  value: 38,
  color: '#3F8E84'
},
{
  label: 'CAD Follow-up',
  value: 24,
  color: '#6BA8A0'
},
{
  label: 'Arrhythmia',
  value: 14,
  color: '#9CC2BC'
},
{
  label: 'Heart Failure',
  value: 9,
  color: '#C4DCD8'
},
{
  label: 'Other',
  value: 15,
  color: '#E5EFED'
}];

export function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Good morning, Dr. Anjali Rao"
        description="Cardiology · Branch: Indiranagar · Tuesday, 12 May 2026"
        actions={
        <>
            <Button variant="ghost">View schedule</Button>
            <Button variant="primary">Start next consultation</Button>
          </>
        } />
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Patients today"
          value={<MonoNumber>18</MonoNumber>}
          hint="6 completed · 12 pending"
          icon={<StethoscopeIcon className="w-4 h-4" />} />
        
        <MetricCard
          label="Pending lab reviews"
          value={<MonoNumber>4</MonoNumber>}
          hint="1 critical"
          icon={<FileTextIcon className="w-4 h-4" />} />
        
        <MetricCard
          label="Avg. consult time"
          value={<MonoNumber>11m 42s</MonoNumber>}
          hint="−1m vs last week"
          trend="down"
          icon={<ClockIcon className="w-4 h-4" />} />
        
        <MetricCard
          label="Revenue this week"
          value={
          <>
              <span className="font-mono">₹2,18,400</span>
            </>
          }
          hint="+8.4% vs last week"
          trend="up"
          icon={<IndianRupeeIcon className="w-4 h-4" />} />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card padding="none">
            <SectionTitle
              title="Up next"
              description="Patients waiting for you"
              className="px-5 pt-5" />
            
            <div className="divide-y divide-line dark:divide-line-dark">
              {upNext.map((p) =>
              <div
                key={p.token}
                className="px-5 py-3 flex items-center gap-4 hover:bg-subtle/40 dark:hover:bg-subtle-dark/40 transition-colors">
                
                  <div className="w-14 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-ink-tertiary">
                      Token
                    </div>
                    <MonoNumber className="text-sm font-semibold text-ink-primary dark:text-ink-primary-dark">
                      {p.token}
                    </MonoNumber>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm font-medium text-ink-primary dark:text-ink-primary-dark">
                      <span className="truncate">{p.name}</span>
                      <span className="text-ink-tertiary text-xs">·</span>
                      <span className="text-ink-tertiary text-xs">
                        <MonoNumber>{p.age}</MonoNumber> yrs
                      </span>
                      <span className="text-ink-tertiary text-xs">·</span>
                      <MonoNumber className="text-ink-tertiary text-xs">
                        {p.id}
                      </MonoNumber>
                    </div>
                    <div className="text-xs text-ink-secondary dark:text-ink-secondary-dark mt-0.5 truncate">
                      {p.complaint}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-ink-tertiary">
                      Waiting
                    </div>
                    <MonoNumber className="text-xs text-ink-secondary">
                      {p.wait}
                    </MonoNumber>
                  </div>
                  <Button variant="primary" className="!py-1.5 !px-3 text-xs">
                    <PlayIcon className="w-3.5 h-3.5" />
                    Start
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <Card padding="none">
            <SectionTitle
              title="Pending lab report reviews"
              description="Awaiting your approval"
              className="px-5 pt-5" />
            
            <div className="divide-y divide-line dark:divide-line-dark">
              {pendingReports.map((r) =>
              <Link
                key={r.id}
                to="/lab/reports"
                className="px-5 py-3 flex items-center gap-4 hover:bg-subtle/40 dark:hover:bg-subtle-dark/40 transition-colors">
                
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <MonoNumber className="text-xs text-ink-tertiary">
                        {r.id}
                      </MonoNumber>
                      {r.critical && <AutoStatusBadge status="critical" />}
                    </div>
                    <div className="text-sm font-medium text-ink-primary dark:text-ink-primary-dark mt-0.5">
                      {r.patient}
                    </div>
                    <div className="text-xs text-ink-secondary dark:text-ink-secondary-dark mt-0.5">
                      {r.test}
                    </div>
                  </div>
                  <div className="text-xs text-ink-tertiary">{r.received}</div>
                  <ChevronRightIcon className="w-4 h-4 text-ink-tertiary" />
                </Link>
              )}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <SectionTitle
                title="Weekly patient volume"
                description="Last 7 days" />
              
              <SimpleBarChart data={weeklyVolume} height={140} />
            </Card>
            <Card>
              <SectionTitle title="Top diagnoses" description="This month" />
              <div className="flex items-center gap-4">
                <DonutChart data={topDx} size={120} />
                <div className="flex-1 space-y-1.5">
                  {topDx.map((d) =>
                  <div
                    key={d.label}
                    className="flex items-center gap-2 text-xs">
                    
                      <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: d.color
                      }} />
                    
                      <span className="flex-1 text-ink-secondary dark:text-ink-secondary-dark truncate">
                        {d.label}
                      </span>
                      <MonoNumber className="text-ink-primary dark:text-ink-primary-dark">
                        {d.value}
                      </MonoNumber>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <AIInsightPanel
            title="AI daily briefing"
            description="Patients flagged for closer attention based on their charts and trends."
            insights={aiBriefing.map((b) => ({
              text:
              <div>
                  <MonoNumber className="text-ink-primary dark:text-ink-primary-dark text-xs font-semibold">
                    {b.id}
                  </MonoNumber>
                  <span className="block mt-0.5">{b.text}</span>
                </div>,

              action: {
                label: 'Open chart',
                to: `/patients/${b.id}`
              }
            }))} />
          

          <Card>
            <SectionTitle title="Today at a glance" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  First slot
                </span>
                <MonoNumber className="text-ink-primary dark:text-ink-primary-dark">
                  09:00
                </MonoNumber>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Lunch break
                </span>
                <MonoNumber className="text-ink-primary dark:text-ink-primary-dark">
                  13:30 – 14:15
                </MonoNumber>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Last slot
                </span>
                <MonoNumber className="text-ink-primary dark:text-ink-primary-dark">
                  18:30
                </MonoNumber>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  IPD rounds
                </span>
                <span className="text-ink-primary dark:text-ink-primary-dark">
                  <MonoNumber>4</MonoNumber> patients
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>);

}