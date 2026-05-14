import React from 'react';
import { DownloadIcon, ShieldCheckIcon, FilterIcon } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FilterBar, FilterChip } from '@/components/ui/FilterBar';
import { Select } from '@/components/ui/Input';
import { DataTable, Column } from '@/components/ui/DataTable';
import { MonoNumber } from '@/components/ui/MonoNumber';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MetricCard } from '@/components/ui/MetricCard';
interface AuditEntry {
  time: string;
  user: string;
  role: string;
  action: string;
  entity: string;
  pid: string;
  ip: string;
  device: string;
  reason?: string;
  sensitivity: 'low' | 'medium' | 'high';
}
const entries: AuditEntry[] = [
{
  time: '2026-05-12 12:42:18',
  user: 'Dr. Anjali Menon',
  role: 'Doctor',
  action: 'Viewed',
  entity: 'Patient record',
  pid: 'P-100482',
  ip: '49.207.182.14',
  device: 'macOS · Chrome 124',
  sensitivity: 'low'
},
{
  time: '2026-05-12 12:38:04',
  user: 'Dr. Anjali Menon',
  role: 'Doctor',
  action: 'Updated prescription',
  entity: 'Prescription RX-9824',
  pid: 'P-100482',
  ip: '49.207.182.14',
  device: 'macOS · Chrome 124',
  sensitivity: 'medium'
},
{
  time: '2026-05-12 12:18:51',
  user: 'Priya R.',
  role: 'Receptionist',
  action: 'Collected payment',
  entity: 'Invoice INV-2026-04812',
  pid: 'P-100482',
  ip: '49.207.182.18',
  device: 'Windows · Edge 124',
  sensitivity: 'medium'
},
{
  time: '2026-05-12 11:32:09',
  user: 'Anu V.',
  role: 'Lab Technician',
  action: 'Submitted result',
  entity: 'Lab order LAB-2026-1243',
  pid: 'P-100482',
  ip: '49.207.182.22',
  device: 'Windows · Chrome 124',
  sensitivity: 'medium'
},
{
  time: '2026-05-12 10:14:42',
  user: 'Manoj P.',
  role: 'Pharmacist',
  action: 'Dispensed medicines',
  entity: 'Sale PSL-2026-1184',
  pid: 'P-100480',
  ip: '49.207.182.40',
  device: 'Android · Chrome 124',
  sensitivity: 'low'
},
{
  time: '2026-05-12 09:48:21',
  user: 'Dr. Rahul Verma',
  role: 'Doctor',
  action: 'Started consultation',
  entity: 'Consultation CN-3812',
  pid: 'P-100480',
  ip: '49.207.182.16',
  device: 'iPad · Safari 17',
  sensitivity: 'low'
},
{
  time: '2026-05-12 09:12:08',
  user: 'Dr. Anjali Menon',
  role: 'Admin',
  action: 'Exported report',
  entity: 'Revenue report (May 2026)',
  pid: '—',
  ip: '49.207.182.14',
  device: 'macOS · Chrome 124',
  reason: 'Monthly review with partner',
  sensitivity: 'high'
},
{
  time: '2026-05-12 08:42:33',
  user: 'Sunil K.',
  role: 'Accountant',
  action: 'Refund approved',
  entity: 'Refund REF-218',
  pid: 'P-100463',
  ip: '49.207.182.18',
  device: 'Windows · Chrome 124',
  reason: 'Service not provided',
  sensitivity: 'high'
},
{
  time: '2026-05-12 08:02:14',
  user: 'Priya R.',
  role: 'Receptionist',
  action: 'Logged in',
  entity: 'Session',
  pid: '—',
  ip: '49.207.182.18',
  device: 'Windows · Edge 124',
  sensitivity: 'low'
},
{
  time: '2026-05-12 07:30:00',
  user: 'Anu V.',
  role: 'Lab Technician',
  action: 'Logged in',
  entity: 'Session',
  pid: '—',
  ip: '49.207.182.22',
  device: 'Windows · Chrome 124',
  sensitivity: 'low'
},
{
  time: '2026-05-11 22:14:08',
  user: 'system',
  role: 'System',
  action: 'Automated backup',
  entity: 'Daily DB backup',
  pid: '—',
  ip: '—',
  device: 'Internal',
  sensitivity: 'low'
},
{
  time: '2026-05-11 19:42:21',
  user: 'Dr. Anjali Menon',
  role: 'Admin',
  action: 'Changed permissions',
  entity: 'Role: Receptionist',
  pid: '—',
  ip: '49.207.182.14',
  device: 'macOS · Chrome 124',
  reason: 'Added refund approval permission',
  sensitivity: 'high'
}];

const sensitivityTone = {
  low: 'neutral',
  medium: 'info',
  high: 'warning'
} as const;
export function AuditLog() {
  const cols: Column<AuditEntry>[] = [
  {
    key: 'time',
    header: 'Timestamp',
    render: (r) =>
    <MonoNumber size="xs" className="text-ink-secondary">
          {r.time}
        </MonoNumber>

  },
  {
    key: 'user',
    header: 'User',
    render: (r) =>
    <div>
          <div className="text-sm font-medium">{r.user}</div>
          <StatusBadge tone="neutral" size="sm">
            {r.role}
          </StatusBadge>
        </div>

  },
  {
    key: 'action',
    header: 'Action',
    render: (r) => <span className="text-sm font-medium">{r.action}</span>
  },
  {
    key: 'entity',
    header: 'Entity',
    render: (r) =>
    <span className="text-sm text-ink-secondary">{r.entity}</span>

  },
  {
    key: 'pid',
    header: 'Patient ID',
    render: (r) =>
    r.pid === '—' ?
    <span className="text-ink-tertiary">—</span> :

    <MonoNumber size="xs">{r.pid}</MonoNumber>

  },
  {
    key: 'ip',
    header: 'IP / Device',
    render: (r) =>
    <div>
          <MonoNumber size="xs">{r.ip}</MonoNumber>
          <div className="text-[10px] text-ink-tertiary">{r.device}</div>
        </div>

  },
  {
    key: 'sensitivity',
    header: 'Sensitivity',
    render: (r) =>
    <StatusBadge tone={sensitivityTone[r.sensitivity] as any} size="sm">
          {r.sensitivity}
        </StatusBadge>

  },
  {
    key: 'reason',
    header: 'Reason',
    render: (r) =>
    r.reason ?
    <span className="text-xs text-ink-secondary italic">
            "{r.reason}"
          </span> :

    <span className="text-ink-tertiary">—</span>

  }];

  return (
    <div>
      <PageHeader
        title="Audit log"
        description="Immutable record of every action taken in Hospeon. Used for compliance, incident review, and clinical accountability."
        breadcrumbs={[
        {
          label: 'Reports'
        },
        {
          label: 'Audit logs'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<FilterIcon />}>
              Advanced filters
            </Button>
            <Button variant="primary" icon={<DownloadIcon />}>
              Export CSV
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Events today"
          value="248"
          icon={<ShieldCheckIcon />} />
        
        <MetricCard label="High-sensitivity" value="6" tone="warning" />
        <MetricCard label="Failed logins" value="2" tone="danger" />
        <MetricCard label="Retention" value="7 yrs" sublabel="immutable" />
      </div>

      <Card>
        <FilterBar searchPlaceholder="Search user, action, entity, or patient…">
          <FilterChip active count={entries.length}>
            All
          </FilterChip>
          <FilterChip count={3}>High-sensitivity</FilterChip>
          <FilterChip count={1}>Refunds</FilterChip>
          <FilterChip count={2}>Permission changes</FilterChip>
          <Select className="h-9 text-xs w-40">
            <option>All users</option>
          </Select>
          <Select className="h-9 text-xs w-40">
            <option>Today</option>
            <option>Last 7 days</option>
            <option>This month</option>
          </Select>
        </FilterBar>
        <DataTable
          data={entries}
          columns={cols}
          rowKey={(_, i) => String(i)}
          dense />
        
      </Card>
    </div>);

}