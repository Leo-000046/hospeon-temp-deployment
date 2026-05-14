import React from 'react';
import {
  PlusIcon,
  DownloadIcon,
  TestTubeIcon,
  FlaskConicalIcon,
  AlertCircleIcon,
  ClockIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { FilterBar, FilterChip } from '../components/primitives/FilterBar';
import { DataTable, Column } from '../components/primitives/DataTable';
import { MonoNumber } from '../components/primitives/MonoNumber';
import {
  StatusBadge,
  AutoStatusBadge } from
'../components/primitives/StatusBadge';
import { MetricCard } from '../components/primitives/MetricCard';
import { labOrders } from '../lib/mockData';
export function LabOrders() {
  const cols: Column<(typeof labOrders)[number]>[] = [
  {
    key: 'id',
    header: 'Order',
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
    key: 'tests',
    header: 'Tests',
    render: (r) =>
    <div className="flex flex-wrap gap-1">
          {r.tests.slice(0, 2).map((t) =>
      <StatusBadge key={t} tone="neutral" size="sm">
              {t}
            </StatusBadge>
      )}
          {r.tests.length > 2 &&
      <span className="text-xs text-ink-tertiary">
              +{r.tests.length - 2}
            </span>
      }
        </div>

  },
  {
    key: 'doctor',
    header: 'Doctor',
    render: (r) =>
    <span className="text-ink-secondary text-sm">{r.doctor}</span>

  },
  {
    key: 'sample',
    header: 'Sample',
    render: (r) => <AutoStatusBadge status={r.sample} />
  },
  {
    key: 'payment',
    header: 'Payment',
    render: (r) => <AutoStatusBadge status={r.payment} />
  },
  {
    key: 'report',
    header: 'Report',
    render: (r) => <AutoStatusBadge status={r.report} />
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
        title="Lab orders"
        description="All diagnostic orders across departments and branches."
        breadcrumbs={[
        {
          label: 'Diagnostics'
        },
        {
          label: 'Lab orders'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<DownloadIcon />}>
              Export
            </Button>
            <Button variant="primary" icon={<PlusIcon />}>
              New lab order
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Samples pending"
          value="8"
          icon={<TestTubeIcon />}
          tone="warning" />
        
        <MetricCard
          label="In progress"
          value="14"
          icon={<FlaskConicalIcon />} />
        
        <MetricCard label="Awaiting approval" value="6" icon={<ClockIcon />} />
        <MetricCard
          label="Critical results"
          value="2"
          icon={<AlertCircleIcon />}
          tone="danger" />
        
      </div>

      <Card>
        <FilterBar searchPlaceholder="Search order, patient, test…">
          <FilterChip active count={labOrders.length}>
            All
          </FilterChip>
          <FilterChip count={2}>Pending sample</FilterChip>
          <FilterChip count={1}>In progress</FilterChip>
          <FilterChip count={1}>Pending review</FilterChip>
          <FilterChip count={1}>Approved</FilterChip>
        </FilterBar>
        <DataTable data={labOrders} columns={cols} rowKey={(r) => r.id} />
      </Card>
    </div>);

}
export function LabReportReview() {
  return (
    <div>
      <PageHeader
        title="Lab report — LAB-2026-1243"
        breadcrumbs={[
        {
          label: 'Diagnostics',
          href: '/lab/orders'
        },
        {
          label: 'Reports'
        },
        {
          label: 'Review'
        }]
        }
        actions={
        <>
            <Button variant="secondary">Reject</Button>
            <Button variant="primary">Approve & send</Button>
          </>
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
        <Card>
          <SectionTitle
            title="Test results"
            description="Reviewed by Dr. Anjali Menon · pending approval" />
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-tertiary mb-3">
                Glucose Panel
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line dark:border-line-dark text-xs text-ink-tertiary uppercase tracking-wide">
                      <th className="py-2 text-left font-medium">Parameter</th>
                      <th className="py-2 text-right font-medium">Result</th>
                      <th className="py-2 text-right font-medium">
                        Reference range
                      </th>
                      <th className="py-2 text-right font-medium">Unit</th>
                      <th className="py-2 text-right font-medium">Flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                    {
                      p: 'Fasting Blood Sugar',
                      r: '142',
                      ref: '70–100',
                      u: 'mg/dL',
                      flag: 'High'
                    },
                    {
                      p: 'Post-prandial BS',
                      r: '198',
                      ref: '< 140',
                      u: 'mg/dL',
                      flag: 'High'
                    },
                    {
                      p: 'HbA1c',
                      r: '7.8',
                      ref: '< 5.7',
                      u: '%',
                      flag: 'High'
                    }].
                    map((row) =>
                    <tr
                      key={row.p}
                      className="border-b border-line dark:border-line-dark last:border-0">
                      
                        <td className="py-2.5">{row.p}</td>
                        <td className="py-2.5 text-right">
                          <MonoNumber
                          size="sm"
                          weight="semibold"
                          className={
                          row.flag === 'High' ? 'text-warning' : ''
                          }>
                          
                            {row.r}
                          </MonoNumber>
                        </td>
                        <td className="py-2.5 text-right">
                          <MonoNumber size="sm" className="text-ink-tertiary">
                            {row.ref}
                          </MonoNumber>
                        </td>
                        <td className="py-2.5 text-right text-xs text-ink-tertiary">
                          {row.u}
                        </td>
                        <td className="py-2.5 text-right">
                          {row.flag === 'High' ?
                        <StatusBadge tone="warning" size="sm">
                              ↑ High
                            </StatusBadge> :

                        <span className="text-xs text-ink-tertiary">—</span>
                        }
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-tertiary mb-3">
                Lipid Profile
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line dark:border-line-dark text-xs text-ink-tertiary uppercase tracking-wide">
                      <th className="py-2 text-left font-medium">Parameter</th>
                      <th className="py-2 text-right font-medium">Result</th>
                      <th className="py-2 text-right font-medium">
                        Reference range
                      </th>
                      <th className="py-2 text-right font-medium">Unit</th>
                      <th className="py-2 text-right font-medium">Flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                    {
                      p: 'Total Cholesterol',
                      r: '218',
                      ref: '< 200',
                      u: 'mg/dL',
                      flag: 'High'
                    },
                    {
                      p: 'HDL',
                      r: '38',
                      ref: '> 40',
                      u: 'mg/dL',
                      flag: 'Low'
                    },
                    {
                      p: 'LDL',
                      r: '142',
                      ref: '< 100',
                      u: 'mg/dL',
                      flag: 'High'
                    },
                    {
                      p: 'Triglycerides',
                      r: '186',
                      ref: '< 150',
                      u: 'mg/dL',
                      flag: 'High'
                    }].
                    map((row) =>
                    <tr
                      key={row.p}
                      className="border-b border-line dark:border-line-dark last:border-0">
                      
                        <td className="py-2.5">{row.p}</td>
                        <td className="py-2.5 text-right">
                          <MonoNumber
                          size="sm"
                          weight="semibold"
                          className={row.flag !== 'OK' ? 'text-warning' : ''}>
                          
                            {row.r}
                          </MonoNumber>
                        </td>
                        <td className="py-2.5 text-right">
                          <MonoNumber size="sm" className="text-ink-tertiary">
                            {row.ref}
                          </MonoNumber>
                        </td>
                        <td className="py-2.5 text-right text-xs text-ink-tertiary">
                          {row.u}
                        </td>
                        <td className="py-2.5 text-right">
                          {row.flag === 'High' ?
                        <StatusBadge tone="warning" size="sm">
                              ↑ High
                            </StatusBadge> :
                        row.flag === 'Low' ?
                        <StatusBadge tone="warning" size="sm">
                              ↓ Low
                            </StatusBadge> :

                        <span className="text-xs text-ink-tertiary">—</span>
                        }
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <SectionTitle title="Order info" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-tertiary">Order ID</dt>
                <dd>
                  <MonoNumber size="sm">LAB-2026-1243</MonoNumber>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-tertiary">Patient</dt>
                <dd>Ramesh Kumar</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-tertiary">Patient ID</dt>
                <dd>
                  <MonoNumber size="sm">P-100482</MonoNumber>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-tertiary">Ordered by</dt>
                <dd>Dr. Anjali Menon</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-tertiary">Collected</dt>
                <dd>
                  <MonoNumber size="sm">2026-05-12 08:14</MonoNumber>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-tertiary">Reported</dt>
                <dd>
                  <MonoNumber size="sm">2026-05-12 11:32</MonoNumber>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-tertiary">Turnaround</dt>
                <dd>
                  <MonoNumber size="sm">3h 18m</MonoNumber>
                </dd>
              </div>
            </dl>
          </Card>

          <Card className="border-accent/30">
            <SectionTitle
              title="AI report explainer"
              description="Patient-friendly · for doctor review" />
            
            <div className="bg-accent-soft/40 dark:bg-accent-soft-dark/40 rounded-lg p-3 text-xs leading-relaxed text-ink-primary dark:text-ink-primary-dark">
              <p>
                <strong>For doctor:</strong> Patient shows poorly controlled
                T2DM (HbA1c 7.8%) and dyslipidemia with elevated LDL and
                triglycerides. Consider intensifying statin therapy and
                reinforcing diet/exercise.
              </p>
              <p className="mt-2">
                <strong>For patient:</strong> Your blood sugar is higher than
                the safe range, and your "bad cholesterol" (LDL) is also higher
                than ideal. Please follow your doctor's advice on medicines and
                diet.
              </p>
            </div>
            <StatusBadge tone="warning" size="sm" className="mt-3">
              Human approval required
            </StatusBadge>
          </Card>
        </div>
      </div>
    </div>);

}