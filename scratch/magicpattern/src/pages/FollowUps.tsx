import React from 'react';
import {
  PhoneIcon,
  MessageSquareIcon,
  MailIcon,
  CheckIcon,
  ClockIcon,
  RepeatIcon,
  FilterIcon,
  SparklesIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button, IconButton } from '../components/primitives/Button';
import { FilterBar, FilterChip } from '../components/primitives/FilterBar';
import { DataTable, Column } from '../components/primitives/DataTable';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { StatusBadge } from '../components/primitives/StatusBadge';
import { MetricCard } from '../components/primitives/MetricCard';
import { AIInsightPanel } from '../components/primitives/AIInsightPanel';
interface FollowUp {
  patient: string;
  pid: string;
  reason: string;
  doctor: string;
  due: string;
  dueIn: string;
  contacted: number;
  status: 'Due today' | 'Upcoming' | 'Overdue' | 'Completed' | 'Snoozed';
  channel: 'WhatsApp' | 'SMS' | 'Phone call' | 'Email';
}
const followUps: FollowUp[] = [
{
  patient: 'Ramesh Kumar',
  pid: 'P-100482',
  reason: 'HTN review after med change',
  doctor: 'Dr. Anjali Menon',
  due: '2026-05-12',
  dueIn: 'Today',
  contacted: 0,
  status: 'Due today',
  channel: 'WhatsApp'
},
{
  patient: 'Joseph Mathew',
  pid: 'P-100480',
  reason: 'Post-discharge follow-up',
  doctor: 'Dr. Rahul Verma',
  due: '2026-05-12',
  dueIn: 'Today',
  contacted: 1,
  status: 'Due today',
  channel: 'Phone call'
},
{
  patient: 'Ananya Suresh',
  pid: 'P-100479',
  reason: 'Asthma medication review',
  doctor: 'Dr. Priya Nair',
  due: '2026-05-11',
  dueIn: '1 day ago',
  contacted: 2,
  status: 'Overdue',
  channel: 'WhatsApp'
},
{
  patient: 'Suresh Pillai',
  pid: 'P-100478',
  reason: 'Post-op orthopedic check',
  doctor: 'Dr. Sameer Iqbal',
  due: '2026-05-10',
  dueIn: '2 days ago',
  contacted: 0,
  status: 'Overdue',
  channel: 'WhatsApp'
},
{
  patient: 'Fathima Beevi',
  pid: 'P-100481',
  reason: 'Pediatric review',
  doctor: 'Dr. Priya Nair',
  due: '2026-05-14',
  dueIn: 'In 2 days',
  contacted: 0,
  status: 'Upcoming',
  channel: 'WhatsApp'
},
{
  patient: 'Meera Krishnan',
  pid: 'P-100477',
  reason: 'Antenatal review',
  doctor: 'Dr. Lakshmi Pillai',
  due: '2026-05-15',
  dueIn: 'In 3 days',
  contacted: 0,
  status: 'Upcoming',
  channel: 'WhatsApp'
},
{
  patient: 'Abdul Rasheed',
  pid: 'P-100476',
  reason: 'COPD follow-up',
  doctor: 'Dr. Anjali Menon',
  due: '2026-05-17',
  dueIn: 'In 5 days',
  contacted: 0,
  status: 'Upcoming',
  channel: 'Phone call'
},
{
  patient: 'Lakshmi Devi',
  pid: 'P-100475',
  reason: 'CHF review',
  doctor: 'Dr. Rahul Verma',
  due: '2026-05-09',
  dueIn: '3 days ago',
  contacted: 3,
  status: 'Completed',
  channel: 'Phone call'
}];

const statusTone = {
  'Due today': 'info',
  Upcoming: 'neutral',
  Overdue: 'danger',
  Completed: 'success',
  Snoozed: 'warning'
} as const;
const channelIcon = {
  WhatsApp: MessageSquareIcon,
  SMS: PhoneIcon,
  'Phone call': PhoneIcon,
  Email: MailIcon
};
export function FollowUps() {
  const cols: Column<FollowUp>[] = [
  {
    key: 'patient',
    header: 'Patient',
    render: (r) =>
    <div>
          <div className="font-medium">{r.patient}</div>
          <MonoNumber size="xs" className="text-ink-tertiary">
            {r.pid}
          </MonoNumber>
        </div>

  },
  {
    key: 'reason',
    header: 'Reason',
    render: (r) => <span className="text-sm">{r.reason}</span>
  },
  {
    key: 'doctor',
    header: 'Doctor',
    render: (r) =>
    <span className="text-ink-secondary text-sm">{r.doctor}</span>

  },
  {
    key: 'due',
    header: 'Due',
    render: (r) =>
    <div>
          <MonoNumber size="sm">{r.due}</MonoNumber>
          <div
        className={`text-xs ${r.status === 'Overdue' ? 'text-danger' : r.status === 'Due today' ? 'text-info font-medium' : 'text-ink-tertiary'}`}>
        
            {r.dueIn}
          </div>
        </div>

  },
  {
    key: 'contacted',
    header: 'Contact attempts',
    render: (r) =>
    <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) =>
      <span
        key={i}
        className={`w-1.5 h-1.5 rounded-full ${i < r.contacted ? 'bg-accent' : 'bg-line dark:bg-line-dark'}`} />

      )}
          <MonoNumber size="xs" className="text-ink-tertiary ml-1">
            {r.contacted}/3
          </MonoNumber>
        </div>

  },
  {
    key: 'status',
    header: 'Status',
    render: (r) =>
    <StatusBadge tone={statusTone[r.status] as any} dot size="sm">
          {r.status}
        </StatusBadge>

  },
  {
    key: 'channel',
    header: 'Channel',
    render: (r) => {
      const Icon = channelIcon[r.channel];
      return (
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-secondary">
            <Icon className="w-3 h-3" />
            {r.channel}
          </span>);

    }
  },
  {
    key: 'actions',
    header: '',
    width: '180px',
    render: (r) =>
    <div className="flex items-center gap-1 justify-end">
          {r.status !== 'Completed' &&
      <Button size="sm" variant="secondary" icon={<MessageSquareIcon />}>
              Contact
            </Button>
      }
          {r.status !== 'Completed' &&
      <IconButton size="sm" variant="ghost">
              <CheckIcon />
            </IconButton>
      }
          <IconButton size="sm" variant="ghost">
            <ClockIcon />
          </IconButton>
        </div>

  }];

  return (
    <div>
      <PageHeader
        title="Follow-ups"
        description="Patients who need to be contacted for review, reminders, or post-care."
        breadcrumbs={[
        {
          label: 'OPD'
        },
        {
          label: 'Follow-ups'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<FilterIcon />}>
              Filters
            </Button>
            <Button variant="primary" icon={<MessageSquareIcon />}>
              Bulk message
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Due today"
          value="12"
          icon={<ClockIcon />}
          tone="warning" />
        
        <MetricCard label="Overdue" value="6" tone="danger" />
        <MetricCard
          label="Completed this week"
          value="34"
          delta={{
            value: '+18%',
            trend: 'up',
            tone: 'positive'
          }} />
        
        <MetricCard label="Avg attempts" value="1.4" sublabel="before reply" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <Card>
          <FilterBar searchPlaceholder="Search patient, reason, doctor…">
            <FilterChip active count={followUps.length}>
              All
            </FilterChip>
            <FilterChip
              count={followUps.filter((f) => f.status === 'Due today').length}>
              
              Due today
            </FilterChip>
            <FilterChip
              count={followUps.filter((f) => f.status === 'Overdue').length}>
              
              Overdue
            </FilterChip>
            <FilterChip
              count={followUps.filter((f) => f.status === 'Upcoming').length}>
              
              Upcoming
            </FilterChip>
            <FilterChip
              count={followUps.filter((f) => f.status === 'Completed').length}>
              
              Completed
            </FilterChip>
          </FilterBar>
          <DataTable
            data={followUps}
            columns={cols}
            rowKey={(r) => `${r.pid}-${r.due}`} />
          
        </Card>

        <AIInsightPanel
          title="AI follow-up assistant"
          subtitle="Smart suggestions"
          needsReview
          insights={[
          {
            tone: 'warning',
            title: '6 overdue follow-ups',
            body: '4 are post-medication-change reviews — these are high-priority for adverse event detection.',
            action: 'Open overdue list'
          },
          {
            tone: 'info',
            title: 'Best time to call',
            body: 'Patients reply 3.2× more to WhatsApp messages sent between 11:00–13:00 vs evenings.'
          },
          {
            tone: 'success',
            title: 'Auto-draft messages',
            body: 'Generate personalized follow-up messages for all 12 patients due today.',
            action: 'Generate batch'
          }]
          } />
        
      </div>
    </div>);

}