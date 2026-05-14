import React from 'react';
import {
  PlusIcon,
  ScanLineIcon,
  ImageIcon,
  FileTextIcon,
  AlertCircleIcon,
  DownloadIcon,
  EyeIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { FilterBar, FilterChip } from '@/components/ui/FilterBar';
import { DataTable, Column } from '@/components/ui/DataTable';
import { MonoNumber } from '@/components/ui/MonoNumber';
import {
  StatusBadge,
  AutoStatusBadge } from
'@/components/ui/StatusBadge';
import { MetricCard } from '@/components/ui/MetricCard';
interface RadOrder {
  id: string;
  patient: string;
  pid: string;
  modality: 'X-Ray' | 'Ultrasound' | 'CT' | 'MRI' | 'ECG';
  study: string;
  doctor: string;
  scheduled: string;
  status: 'Scheduled' | 'In progress' | 'Acquired' | 'Reported' | 'Approved';
  critical?: boolean;
}
const orders: RadOrder[] = [
{
  id: 'RAD-2026-0612',
  patient: 'Joseph Mathew',
  pid: 'P-100480',
  modality: 'X-Ray',
  study: 'Chest PA',
  doctor: 'Dr. Rahul Verma',
  scheduled: '2026-05-12 11:00',
  status: 'Reported',
  critical: true
},
{
  id: 'RAD-2026-0611',
  patient: 'Abdul Rasheed',
  pid: 'P-100476',
  modality: 'CT',
  study: 'CT Thorax — plain',
  doctor: 'Dr. Anjali Menon',
  scheduled: '2026-05-12 10:30',
  status: 'In progress'
},
{
  id: 'RAD-2026-0610',
  patient: 'Suresh Pillai',
  pid: 'P-100478',
  modality: 'MRI',
  study: 'MRI Lumbar Spine',
  doctor: 'Dr. Sameer Iqbal',
  scheduled: '2026-05-12 14:00',
  status: 'Scheduled'
},
{
  id: 'RAD-2026-0609',
  patient: 'Meera Krishnan',
  pid: 'P-100477',
  modality: 'Ultrasound',
  study: 'OB Ultrasound 2nd trim',
  doctor: 'Dr. Lakshmi Pillai',
  scheduled: '2026-05-12 09:30',
  status: 'Approved'
},
{
  id: 'RAD-2026-0608',
  patient: 'Ramesh Kumar',
  pid: 'P-100482',
  modality: 'ECG',
  study: 'Resting 12-lead ECG',
  doctor: 'Dr. Anjali Menon',
  scheduled: '2026-05-12 09:00',
  status: 'Approved'
},
{
  id: 'RAD-2026-0607',
  patient: 'Lakshmi Devi',
  pid: 'P-100475',
  modality: 'X-Ray',
  study: 'Knee AP/Lateral',
  doctor: 'Dr. Sameer Iqbal',
  scheduled: '2026-05-11 16:00',
  status: 'Acquired'
}];

export function Radiology() {
  const cols: Column<RadOrder>[] = [
  {
    key: 'id',
    header: 'Order',
    render: (r) =>
    <div className="flex items-center gap-2">
          <MonoNumber size="sm" weight="medium">
            {r.id}
          </MonoNumber>
          {r.critical &&
      <StatusBadge tone="danger" size="sm" dot>
              Critical
            </StatusBadge>
      }
        </div>

  },
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
    key: 'modality',
    header: 'Modality',
    render: (r) =>
    <StatusBadge tone="neutral" size="sm">
          {r.modality}
        </StatusBadge>

  },
  {
    key: 'study',
    header: 'Study',
    render: (r) => <span className="text-sm">{r.study}</span>
  },
  {
    key: 'doctor',
    header: 'Ordered by',
    render: (r) =>
    <span className="text-ink-secondary text-sm">{r.doctor}</span>

  },
  {
    key: 'scheduled',
    header: 'Scheduled',
    render: (r) =>
    <MonoNumber size="sm" className="text-ink-secondary">
          {r.scheduled}
        </MonoNumber>

  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <AutoStatusBadge status={r.status} />
  },
  {
    key: 'actions',
    header: '',
    width: '100px',
    render: () =>
    <div className="flex items-center gap-1 justify-end">
          <IconButton size="sm" variant="ghost">
            <EyeIcon />
          </IconButton>
          <IconButton size="sm" variant="ghost">
            <DownloadIcon />
          </IconButton>
        </div>

  }];

  const modalities = [
  {
    name: 'X-Ray',
    icon: ScanLineIcon,
    today: 8,
    pending: 2
  },
  {
    name: 'Ultrasound',
    icon: ImageIcon,
    today: 6,
    pending: 0
  },
  {
    name: 'CT',
    icon: ScanLineIcon,
    today: 3,
    pending: 1
  },
  {
    name: 'MRI',
    icon: ScanLineIcon,
    today: 2,
    pending: 2
  }];

  return (
    <div>
      <PageHeader
        title="Radiology"
        description="Imaging orders, scheduling, and report approval."
        breadcrumbs={[
        {
          label: 'Diagnostics'
        },
        {
          label: 'Radiology'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<FileTextIcon />}>
              Open viewer
            </Button>
            <Button variant="primary" icon={<PlusIcon />}>
              New imaging order
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard label="Orders today" value="19" icon={<ScanLineIcon />} />
        <MetricCard label="In progress" value="5" tone="warning" />
        <MetricCard label="Awaiting approval" value="3" />
        <MetricCard
          label="Critical findings"
          value="1"
          tone="danger"
          icon={<AlertCircleIcon />} />
        
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {modalities.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.name} className="flex items-center gap-3" padded>
              <div className="w-10 h-10 rounded-xl bg-subtle dark:bg-subtle-dark text-ink-secondary flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">{m.name}</p>
                <p className="text-xs text-ink-tertiary">
                  <MonoNumber size="xs">{m.today}</MonoNumber> today ·{' '}
                  <MonoNumber
                    size="xs"
                    className={m.pending > 0 ? 'text-warning' : ''}>
                    
                    {m.pending}
                  </MonoNumber>{' '}
                  pending
                </p>
              </div>
            </Card>);

        })}
      </div>

      <Card>
        <FilterBar searchPlaceholder="Search order, patient, study…">
          <FilterChip active count={orders.length}>
            All
          </FilterChip>
          <FilterChip count={1}>Scheduled</FilterChip>
          <FilterChip count={1}>In progress</FilterChip>
          <FilterChip count={1}>Awaiting report</FilterChip>
          <FilterChip count={1}>Critical findings</FilterChip>
        </FilterBar>
        <DataTable data={orders} columns={cols} rowKey={(r) => r.id} />
      </Card>
    </div>);

}