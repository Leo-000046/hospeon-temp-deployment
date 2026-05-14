import React from 'react';
import { Link } from 'react-router-dom';
import {
  TestTubeIcon,
  FileTextIcon,
  ClockIcon,
  CheckCircle2Icon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { MetricCard } from '../components/primitives/MetricCard';
import { Button } from '../components/primitives/Button';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { AutoStatusBadge } from '../components/primitives/StatusBadge';
import { DataTable } from '../components/primitives/DataTable';
import { AIInsightPanel } from '../components/primitives/AIInsightPanel';
import { SimpleBarChart, DonutChart } from '../components/charts/MiniChart';
const awaitingCollection = [
{
  id: 'LAB-2026-04901',
  patient: 'Anjali Kapoor',
  tests: 'Lipid Profile, HbA1c',
  requested: '09:42'
},
{
  id: 'LAB-2026-04902',
  patient: 'Vikram Shah',
  tests: 'CBC, LFT, Renal Panel',
  requested: '09:48'
},
{
  id: 'LAB-2026-04903',
  patient: 'Kavita Iyer',
  tests: 'Thyroid Profile',
  requested: '10:02'
},
{
  id: 'LAB-2026-04904',
  patient: 'Suresh Pillai',
  tests: 'Vitamin D, B12',
  requested: '10:15'
}];

const awaitingResults = [
{
  id: 'LAB-2026-04891',
  patient: 'Rohan Mehta',
  tests: 'CBC, ESR',
  collected: '08:42',
  tat: '1h 18m'
},
{
  id: 'LAB-2026-04892',
  patient: 'Priya Nair',
  tests: 'Lipid Profile',
  collected: '08:55',
  tat: '1h 05m'
},
{
  id: 'LAB-2026-04893',
  patient: 'Aman Bhatia',
  tests: 'Liver Function',
  collected: '09:14',
  tat: '46m'
}];

const weeklyVolume = [
{
  label: 'Mon',
  value: 82
},
{
  label: 'Tue',
  value: 94
},
{
  label: 'Wed',
  value: 88
},
{
  label: 'Thu',
  value: 102
},
{
  label: 'Fri',
  value: 96
},
{
  label: 'Sat',
  value: 76
},
{
  label: 'Sun',
  value: 64
}];

const modality = [
{
  label: 'Hematology',
  value: 32,
  color: '#3F8E84'
},
{
  label: 'Biochemistry',
  value: 28,
  color: '#6BA8A0'
},
{
  label: 'Microbiology',
  value: 18,
  color: '#9CC2BC'
},
{
  label: 'Immunology',
  value: 12,
  color: '#C4DCD8'
},
{
  label: 'Other',
  value: 10,
  color: '#E5EFED'
}];

export function LabDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Laboratory"
        description="Live workflow & turnaround"
        actions={
        <>
            <Link to="/lab/collection">
              <Button variant="secondary">
                <TestTubeIcon className="w-4 h-4" />
                Collection
              </Button>
            </Link>
            <Link to="/lab/result-entry">
              <Button variant="primary">
                <FileTextIcon className="w-4 h-4" />
                Enter results
              </Button>
            </Link>
          </>
        } />
      

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Samples today"
          value={<MonoNumber>94</MonoNumber>}
          hint="+8 vs yesterday"
          trend="up"
          icon={<TestTubeIcon className="w-4 h-4" />} />
        
        <MetricCard
          label="Pending results"
          value={<MonoNumber>12</MonoNumber>}
          hint="3 overdue"
          icon={<FileTextIcon className="w-4 h-4" />} />
        
        <MetricCard
          label="Avg. TAT"
          value={<MonoNumber>2h 14m</MonoNumber>}
          hint="Target ≤ 3h"
          trend="down"
          icon={<ClockIcon className="w-4 h-4" />} />
        
        <MetricCard
          label="Reports approved"
          value={<MonoNumber>71</MonoNumber>}
          hint="By pathologist"
          icon={<CheckCircle2Icon className="w-4 h-4" />} />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <SectionTitle title="Awaiting sample collection" />
              <Link
                to="/lab/collection"
                className="text-xs text-accent hover:underline">
                
                Open workflow →
              </Link>
            </div>
            <DataTable
              data={awaitingCollection}
              columns={[
              {
                key: 'id',
                header: 'Order',
                render: (r) => <MonoNumber>{r.id}</MonoNumber>
              },
              {
                key: 'patient',
                header: 'Patient'
              },
              {
                key: 'tests',
                header: 'Tests'
              },
              {
                key: 'requested',
                header: 'Requested',
                align: 'right',
                render: (r) =>
                <MonoNumber className="text-ink-tertiary">
                      {r.requested}
                    </MonoNumber>

              },
              {
                key: 'action',
                header: '',
                align: 'right',
                render: () =>
                <Button variant="ghost" className="!py-1 !px-2.5 text-xs">
                      Collect
                    </Button>

              }]
              }
              dense />
            
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <SectionTitle title="Awaiting result entry" />
              <Link
                to="/lab/result-entry"
                className="text-xs text-accent hover:underline">
                
                Enter results →
              </Link>
            </div>
            <DataTable
              data={awaitingResults}
              columns={[
              {
                key: 'id',
                header: 'Order',
                render: (r) => <MonoNumber>{r.id}</MonoNumber>
              },
              {
                key: 'patient',
                header: 'Patient'
              },
              {
                key: 'tests',
                header: 'Tests'
              },
              {
                key: 'collected',
                header: 'Collected',
                render: (r) =>
                <MonoNumber className="text-ink-tertiary">
                      {r.collected}
                    </MonoNumber>

              },
              {
                key: 'tat',
                header: 'Elapsed',
                align: 'right',
                render: (r) =>
                <MonoNumber className="text-warning">{r.tat}</MonoNumber>

              }]
              }
              dense />
            
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <SectionTitle title="Test volume (7 days)" />
              <SimpleBarChart data={weeklyVolume} height={140} />
            </Card>
            <Card>
              <SectionTitle title="Modality breakdown" />
              <div className="flex items-center gap-4">
                <DonutChart data={modality} size={120} />
                <div className="flex-1 space-y-1.5">
                  {modality.map((d) =>
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
                        {d.value}%
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
            title="AI flagged critical values"
            description="Detected by automated rules. Pathologist must verify and approve."
            insights={[
            {
              text:
              <div>
                    <MonoNumber className="text-xs font-semibold">
                      P-100488 · Potassium 6.2 mEq/L
                    </MonoNumber>
                    <span className="block text-ink-secondary dark:text-ink-secondary-dark">
                      Critical high — risk of cardiac arrhythmia.
                    </span>
                    <div className="flex gap-2 mt-2">
                      <Button
                    variant="primary"
                    className="!py-1 !px-2.5 text-xs">
                    
                        Approve
                      </Button>
                      <Button variant="ghost" className="!py-1 !px-2.5 text-xs">
                        Recheck
                      </Button>
                    </div>
                  </div>

            },
            {
              text:
              <div>
                    <MonoNumber className="text-xs font-semibold">
                      P-100501 · Hemoglobin 6.4 g/dL
                    </MonoNumber>
                    <span className="block text-ink-secondary dark:text-ink-secondary-dark">
                      Severe anemia — notify treating doctor.
                    </span>
                    <div className="flex gap-2 mt-2">
                      <Button
                    variant="primary"
                    className="!py-1 !px-2.5 text-xs">
                    
                        Approve
                      </Button>
                      <Button variant="ghost" className="!py-1 !px-2.5 text-xs">
                        Recheck
                      </Button>
                    </div>
                  </div>

            },
            {
              text:
              <div>
                    <MonoNumber className="text-xs font-semibold">
                      P-100455 · Troponin-I 1.84 ng/mL
                    </MonoNumber>
                    <span className="block text-ink-secondary dark:text-ink-secondary-dark">
                      Elevated — possible acute MI.
                    </span>
                  </div>

            }]
            } />
          

          <Card>
            <SectionTitle title="Today" />
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  First sample
                </span>
                <MonoNumber>08:14</MonoNumber>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Total runs
                </span>
                <MonoNumber>14</MonoNumber>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Rejected samples
                </span>
                <MonoNumber className="text-warning">2</MonoNumber>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Out for delivery
                </span>
                <MonoNumber>0</MonoNumber>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>);

}