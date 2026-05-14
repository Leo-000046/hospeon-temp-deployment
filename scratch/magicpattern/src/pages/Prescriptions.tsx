import React from 'react';
import {
  PlusIcon,
  DownloadIcon,
  FileTextIcon,
  PrinterIcon,
  SendIcon,
  RepeatIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card } from '../components/primitives/Card';
import { Button, IconButton } from '../components/primitives/Button';
import { FilterBar, FilterChip } from '../components/primitives/FilterBar';
import { DataTable, Column } from '../components/primitives/DataTable';
import { MonoNumber } from '../components/primitives/MonoNumber';
import {
  StatusBadge,
  AutoStatusBadge } from
'../components/primitives/StatusBadge';
import { MetricCard } from '../components/primitives/MetricCard';
interface Prescription {
  id: string;
  patient: string;
  pid: string;
  doctor: string;
  date: string;
  medicines: number;
  status: 'Active' | 'Completed' | 'Cancelled' | 'Dispensed';
  channel: 'Print' | 'WhatsApp' | 'Email' | 'In-app';
}
const prescriptions: Prescription[] = [
{
  id: 'RX-9824',
  patient: 'Ramesh Kumar',
  pid: 'P-100482',
  doctor: 'Dr. Anjali Menon',
  date: '2026-05-12',
  medicines: 3,
  status: 'Active',
  channel: 'WhatsApp'
},
{
  id: 'RX-9823',
  patient: 'Fathima Beevi',
  pid: 'P-100481',
  doctor: 'Dr. Priya Nair',
  date: '2026-05-12',
  medicines: 2,
  status: 'Dispensed',
  channel: 'Print'
},
{
  id: 'RX-9822',
  patient: 'Joseph Mathew',
  pid: 'P-100480',
  doctor: 'Dr. Rahul Verma',
  date: '2026-05-11',
  medicines: 5,
  status: 'Active',
  channel: 'WhatsApp'
},
{
  id: 'RX-9821',
  patient: 'Ananya Suresh',
  pid: 'P-100479',
  doctor: 'Dr. Priya Nair',
  date: '2026-05-11',
  medicines: 2,
  status: 'Completed',
  channel: 'WhatsApp'
},
{
  id: 'RX-9820',
  patient: 'Suresh Pillai',
  pid: 'P-100478',
  doctor: 'Dr. Sameer Iqbal',
  date: '2026-05-10',
  medicines: 4,
  status: 'Dispensed',
  channel: 'Print'
},
{
  id: 'RX-9819',
  patient: 'Meera Krishnan',
  pid: 'P-100477',
  doctor: 'Dr. Lakshmi Pillai',
  date: '2026-05-10',
  medicines: 1,
  status: 'Active',
  channel: 'In-app'
},
{
  id: 'RX-9818',
  patient: 'Abdul Rasheed',
  pid: 'P-100476',
  doctor: 'Dr. Anjali Menon',
  date: '2026-05-09',
  medicines: 4,
  status: 'Active',
  channel: 'WhatsApp'
},
{
  id: 'RX-9817',
  patient: 'Lakshmi Devi',
  pid: 'P-100475',
  doctor: 'Dr. Rahul Verma',
  date: '2026-05-09',
  medicines: 6,
  status: 'Dispensed',
  channel: 'Print'
}];

export function Prescriptions() {
  const cols: Column<Prescription>[] = [
  {
    key: 'id',
    header: 'Rx number',
    render: (r) =>
    <MonoNumber size="sm" weight="medium">
          {r.id}
        </MonoNumber>

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
    key: 'doctor',
    header: 'Doctor',
    render: (r) =>
    <span className="text-ink-secondary text-sm">{r.doctor}</span>

  },
  {
    key: 'date',
    header: 'Date',
    render: (r) =>
    <MonoNumber size="sm" className="text-ink-secondary">
          {r.date}
        </MonoNumber>

  },
  {
    key: 'medicines',
    header: 'Medicines',
    align: 'right',
    render: (r) => <MonoNumber size="sm">{r.medicines}</MonoNumber>
  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <AutoStatusBadge status={r.status} />
  },
  {
    key: 'channel',
    header: 'Sent via',
    render: (r) =>
    <StatusBadge tone="neutral" size="sm">
          {r.channel}
        </StatusBadge>

  },
  {
    key: 'actions',
    header: '',
    width: '110px',
    render: () =>
    <div className="flex items-center gap-1 justify-end">
          <IconButton size="sm" variant="ghost">
            <PrinterIcon />
          </IconButton>
          <IconButton size="sm" variant="ghost">
            <SendIcon />
          </IconButton>
          <IconButton size="sm" variant="ghost">
            <RepeatIcon />
          </IconButton>
        </div>

  }];

  return (
    <div>
      <PageHeader
        title="Prescriptions"
        description="All prescriptions issued across doctors and branches."
        breadcrumbs={[
        {
          label: 'OPD'
        },
        {
          label: 'Prescriptions'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<DownloadIcon />}>
              Export
            </Button>
            <Button variant="primary" icon={<PlusIcon />}>
              New prescription
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Issued today"
          value="28"
          icon={<FileTextIcon />}
          delta={{
            value: '+4',
            trend: 'up',
            tone: 'positive'
          }} />
        
        <MetricCard label="Active" value="64" sublabel="not yet dispensed" />
        <MetricCard label="Dispensed today" value="22" />
        <MetricCard label="Avg medicines / Rx" value="3.4" />
      </div>

      <Card>
        <FilterBar searchPlaceholder="Search Rx number, patient, doctor…">
          <FilterChip active count={prescriptions.length}>
            All
          </FilterChip>
          <FilterChip
            count={prescriptions.filter((p) => p.status === 'Active').length}>
            
            Active
          </FilterChip>
          <FilterChip
            count={prescriptions.filter((p) => p.status === 'Dispensed').length}>
            
            Dispensed
          </FilterChip>
          <FilterChip
            count={prescriptions.filter((p) => p.status === 'Completed').length}>
            
            Completed
          </FilterChip>
        </FilterBar>
        <DataTable data={prescriptions} columns={cols} rowKey={(r) => r.id} />
      </Card>
    </div>);

}