import React from 'react';
import {
  PlusIcon,
  BedDoubleIcon,
  UsersIcon,
  ActivityIcon,
  BellIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DataTable, Column } from '@/components/ui/DataTable';
import { MonoNumber } from '@/components/ui/MonoNumber';
import {
  StatusBadge,
  AutoStatusBadge } from
'@/components/ui/StatusBadge';
import { MetricCard } from '@/components/ui/MetricCard';
const admissions: any[] = [];
import { cn } from '@/lib/cn';
export function IPD() {
  const cols: Column<(typeof admissions)[number]>[] = [
  {
    key: 'id',
    header: 'Admission',
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
    key: 'ward',
    header: 'Ward / Bed',
    render: (r) =>
    <div className="text-sm">
          <div>{r.ward}</div>
          <MonoNumber size="xs" className="text-ink-tertiary">
            {r.bed}
          </MonoNumber>
        </div>

  },
  {
    key: 'doctor',
    header: 'Doctor',
    render: (r) => <span className="text-ink-secondary">{r.doctor}</span>
  },
  {
    key: 'admitted',
    header: 'Admitted',
    render: (r) => <MonoNumber size="sm">{r.admitted}</MonoNumber>
  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <AutoStatusBadge status={r.status} />
  },
  {
    key: 'billing',
    header: 'Billing',
    render: (r) =>
    <span className="text-xs text-ink-secondary">{r.billing}</span>

  },
  {
    key: 'actions',
    header: '',
    width: '90px',
    render: () =>
    <Button size="sm" variant="ghost">
          Open →
        </Button>

  }];

  return (
    <div>
      <PageHeader
        title="IPD admissions"
        description="All active and recent in-patient admissions."
        breadcrumbs={[
        {
          label: 'Hospital'
        },
        {
          label: 'IPD admissions'
        }]
        }
        actions={
        <>
            <Button variant="secondary">Discharge queue</Button>
            <Button variant="primary" icon={<PlusIcon />}>
              New admission
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard label="Active admissions" value="17" icon={<UsersIcon />} />
        <MetricCard
          label="Bed occupancy"
          value="68%"
          sublabel="17/25"
          icon={<BedDoubleIcon />} />
        
        <MetricCard
          label="Discharges today"
          value="3"
          icon={<ActivityIcon />} />
        
        <MetricCard
          label="Critical alerts"
          value="2"
          tone="danger"
          icon={<BellIcon />} />
        
      </div>

      <Card>
        <SectionTitle title="Active admissions" />
        <DataTable data={admissions} columns={cols} rowKey={(r) => r.id} />
      </Card>
    </div>);

}
export function BedBoard() {
  const wards = [
  {
    name: 'Cardiac ICU',
    beds: [
    {
      num: 'C-01',
      status: 'Occupied',
      patient: 'A. Rajan',
      doctor: 'Dr. R. Verma',
      days: 3,
      alert: true
    },
    {
      num: 'C-02',
      status: 'Occupied',
      patient: 'S. Iqbal',
      doctor: 'Dr. R. Verma',
      days: 1
    },
    {
      num: 'C-03',
      status: 'Cleaning',
      patient: null,
      doctor: null,
      days: 0
    },
    {
      num: 'C-04',
      status: 'Occupied',
      patient: 'Joseph Mathew',
      doctor: 'Dr. R. Verma',
      days: 2
    },
    {
      num: 'C-05',
      status: 'Available',
      patient: null,
      doctor: null,
      days: 0
    },
    {
      num: 'C-06',
      status: 'Reserved',
      patient: null,
      doctor: null,
      days: 0
    }]

  },
  {
    name: 'General Ward A',
    beds: Array.from(
      {
        length: 10
      },
      (_, i) => ({
        num: `A-${String(i + 1).padStart(2, '0')}`,
        status:
        i < 6 ?
        'Occupied' :
        i === 6 ?
        'Cleaning' :
        i === 7 ?
        'Maintenance' :
        'Available',
        patient:
        i < 6 ?
        [
        'R. Pillai',
        'M. Devi',
        'A. Kumar',
        'S. Nair',
        'V. Menon',
        'Lakshmi Devi'][
        i] :
        null,
        doctor: i < 6 ? 'Dr. A. Menon' : null,
        days: i < 6 ? i + 1 : 0
      })
    )
  },
  {
    name: 'Pulmonary Ward',
    beds: Array.from(
      {
        length: 8
      },
      (_, i) => ({
        num: `P-${String(i + 1).padStart(2, '0')}`,
        status: i < 5 ? 'Occupied' : i === 5 ? 'Reserved' : 'Available',
        patient:
        i < 5 ?
        [
        'B. Rao',
        'F. Beevi',
        'K. Sharma',
        'P. Joseph',
        'Abdul Rasheed'][
        i] :
        null,
        doctor: i < 5 ? 'Dr. A. Menon' : null,
        days: i < 5 ? i + 1 : 0
      })
    )
  }];

  const statusColor: Record<string, string> = {
    Available: 'bg-success-soft border-success/20 text-success',
    Occupied: 'bg-info-soft border-info/20',
    Cleaning: 'bg-warning-soft border-warning/20 text-warning',
    Maintenance: 'bg-subtle dark:bg-subtle-dark border-line text-ink-tertiary',
    Reserved: 'bg-accent-soft border-accent/20 text-accent'
  };
  return (
    <div>
      <PageHeader
        title="Beds & wards"
        description="Live view of bed occupancy across all wards."
        breadcrumbs={[
        {
          label: 'Hospital'
        },
        {
          label: 'Beds & wards'
        }]
        }
        actions={
        <Button variant="primary" icon={<PlusIcon />}>
            Admit patient
          </Button>
        } />
      

      <Card className="mb-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {[
          {
            l: 'Available',
            c: 'bg-success'
          },
          {
            l: 'Occupied',
            c: 'bg-info'
          },
          {
            l: 'Cleaning',
            c: 'bg-warning'
          },
          {
            l: 'Maintenance',
            c: 'bg-ink-tertiary'
          },
          {
            l: 'Reserved',
            c: 'bg-accent'
          }].
          map((s) =>
          <div key={s.l} className="flex items-center gap-1.5">
              <span className={cn('w-2.5 h-2.5 rounded-sm', s.c)} />
              <span className="text-ink-secondary">{s.l}</span>
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-4">
        {wards.map((w) =>
        <Card key={w.name}>
            <SectionTitle
            title={w.name}
            description={`${w.beds.filter((b) => b.status === 'Occupied').length} occupied · ${w.beds.filter((b) => b.status === 'Available').length} available`} />
          
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {w.beds.map((b) =>
            <div
              key={b.num}
              className={cn(
                'rounded-xl border p-3 min-h-[100px] flex flex-col',
                statusColor[b.status]
              )}>
              
                  <div className="flex items-center justify-between mb-2">
                    <MonoNumber size="sm" weight="semibold">
                      {b.num}
                    </MonoNumber>
                    <span className="text-[10px] uppercase font-medium tracking-wide">
                      {b.status}
                    </span>
                  </div>
                  {b.patient ?
              <>
                      <p className="text-xs font-medium text-ink-primary dark:text-ink-primary-dark truncate">
                        {b.patient}
                      </p>
                      <p className="text-[10px] text-ink-tertiary truncate">
                        {b.doctor}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2 text-[10px]">
                        <span className="text-ink-tertiary">
                          Day <MonoNumber size="xs">{b.days}</MonoNumber>
                        </span>
                        {'alert' in b && (b as any).alert &&
                  <StatusBadge tone="danger" size="sm">
                            Alert
                          </StatusBadge>
                  }
                      </div>
                    </> :

              <div className="flex-1 flex items-center justify-center text-[10px] text-ink-tertiary">
                      {b.status}
                    </div>
              }
                </div>
            )}
            </div>
          </Card>
        )}
      </div>
    </div>);

}