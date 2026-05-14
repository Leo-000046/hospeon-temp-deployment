import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CalendarIcon,
  FileTextIcon,
  ReceiptIcon,
  FlaskConicalIcon,
  FolderIcon,
  ShieldIcon,
  ClockIcon,
  ActivityIcon,
  PhoneIcon,
  EditIcon,
  PlusIcon,
  AlertTriangleIcon,
  PrinterIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MonoNumber, MoneyText } from '@/components/ui/MonoNumber';
import {
  StatusBadge,
  AutoStatusBadge } from
'@/components/ui/StatusBadge';
import { AIInsightPanel } from '@/components/ui/AIInsightPanel';
const patients: any[] = [];
import { cn } from '@/lib/cn';
const tabs = [
{
  id: 'overview',
  label: 'Overview',
  icon: ActivityIcon
},
{
  id: 'timeline',
  label: 'Timeline',
  icon: ClockIcon
},
{
  id: 'visits',
  label: 'Visits',
  icon: CalendarIcon
},
{
  id: 'prescriptions',
  label: 'Prescriptions',
  icon: FileTextIcon
},
{
  id: 'labs',
  label: 'Lab Reports',
  icon: FlaskConicalIcon
},
{
  id: 'bills',
  label: 'Bills',
  icon: ReceiptIcon
},
{
  id: 'documents',
  label: 'Documents',
  icon: FolderIcon
},
{
  id: 'consent',
  label: 'Consent',
  icon: ShieldIcon
},
{
  id: 'audit',
  label: 'Audit',
  icon: ShieldIcon
}];

export function PatientProfile() {
  const { id } = useParams();
  const patient = patients.find((p) => p.id === id) || patients[0];
  const [tab, setTab] = useState('overview');
  return (
    <div>
      <PageHeader
        breadcrumbs={[
        {
          label: 'Patients',
          href: '/patients'
        },
        {
          label: patient.name
        }]
        }
        title={patient.name}
        meta={
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-secondary">
            <MonoNumber size="sm" weight="medium">
              {patient.id}
            </MonoNumber>
            <span className="text-ink-tertiary">·</span>
            <span>
              <MonoNumber size="sm">{patient.age}</MonoNumber> ·{' '}
              {patient.gender === 'M' ? 'Male' : 'Female'}
            </span>
            <span className="text-ink-tertiary">·</span>
            <span className="inline-flex items-center gap-1">
              <PhoneIcon className="w-3 h-3" />
              <MonoNumber size="sm">{patient.phone}</MonoNumber>
            </span>
            <StatusBadge tone="neutral">Blood: {patient.blood}</StatusBadge>
            {patient.balance > 0 &&
          <StatusBadge tone="warning" dot>
                Outstanding {`₹${patient.balance}`}
              </StatusBadge>
          }
          </div>
        }
        actions={
        <>
            <Button variant="secondary" icon={<PrinterIcon />}>
              Print
            </Button>
            <Button variant="secondary" icon={<EditIcon />}>
              Edit
            </Button>
            <Button variant="primary" icon={<PlusIcon />}>
              Start consultation
            </Button>
          </>
        } />
      

      {/* Tabs */}
      <div className="border-b border-line dark:border-line-dark mb-6 -mx-4 lg:-mx-6 px-4 lg:px-6 overflow-x-auto">
        <div className="flex items-center gap-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-2.5 text-sm border-b-2 transition-colors whitespace-nowrap',
                  tab === t.id ?
                  'border-accent text-ink-primary dark:text-ink-primary-dark font-medium' :
                  'border-transparent text-ink-secondary hover:text-ink-primary'
                )}>
                
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>);

          })}
        </div>
      </div>

      {tab === 'overview' &&
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            {/* Vitals */}
            <Card>
              <SectionTitle
              title="Latest vitals"
              description="Recorded 2 days ago at consultation"
              action={
              <Button size="sm" variant="ghost">
                    View history
                  </Button>
              } />
            
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
              {
                label: 'BP',
                value: '138/86',
                unit: 'mmHg',
                abnormal: true
              },
              {
                label: 'Pulse',
                value: '78',
                unit: 'bpm'
              },
              {
                label: 'Temp',
                value: '98.4',
                unit: '°F'
              },
              {
                label: 'SpO₂',
                value: '97',
                unit: '%'
              },
              {
                label: 'Weight',
                value: '72.5',
                unit: 'kg'
              },
              {
                label: 'Height',
                value: '168',
                unit: 'cm'
              },
              {
                label: 'BMI',
                value: '25.7',
                unit: 'kg/m²'
              },
              {
                label: 'FBS',
                value: '142',
                unit: 'mg/dL',
                abnormal: true
              }].
              map((v) =>
              <div
                key={v.label}
                className={cn(
                  'p-3 rounded-xl',
                  v.abnormal ?
                  'bg-warning-soft' :
                  'bg-subtle/60 dark:bg-subtle-dark/60'
                )}>
                
                    <div className="text-[10px] uppercase tracking-wider text-ink-tertiary font-medium">
                      {v.label}
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <MonoNumber
                    size="lg"
                    weight="semibold"
                    className={v.abnormal ? 'text-warning' : ''}>
                    
                        {v.value}
                      </MonoNumber>
                      <span className="text-[10px] text-ink-tertiary">
                        {v.unit}
                      </span>
                    </div>
                  </div>
              )}
              </div>
            </Card>

            {/* Recent visits */}
            <Card>
              <SectionTitle title="Recent visits" />
              <div className="space-y-3">
                {[
              {
                date: '2026-05-08',
                doctor: 'Dr. Anjali Menon',
                dept: 'General Medicine',
                diagnosis: 'Hypertension follow-up',
                status: 'Completed'
              },
              {
                date: '2026-04-21',
                doctor: 'Dr. Anjali Menon',
                dept: 'General Medicine',
                diagnosis: 'Diabetic review',
                status: 'Completed'
              },
              {
                date: '2026-03-14',
                doctor: 'Dr. Rahul Verma',
                dept: 'Cardiology',
                diagnosis: 'Cardiac evaluation',
                status: 'Completed'
              }].
              map((v, i) =>
              <div
                key={i}
                className="flex items-start justify-between gap-4 p-3 rounded-xl hover:bg-subtle/60 dark:hover:bg-subtle-dark/60 -mx-3">
                
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent-soft text-accent flex items-center justify-center text-xs font-mono shrink-0">
                        {v.date.slice(8, 10)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink-primary dark:text-ink-primary-dark">
                          {v.diagnosis}
                        </p>
                        <p className="text-xs text-ink-secondary mt-0.5">
                          {v.doctor} · {v.dept}
                        </p>
                        <MonoNumber size="xs" className="text-ink-tertiary">
                          {v.date}
                        </MonoNumber>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      View →
                    </Button>
                  </div>
              )}
              </div>
            </Card>

            {/* Active medications */}
            <Card>
              <SectionTitle title="Active medications" />
              <div className="space-y-2">
                {[
              {
                name: 'Metformin 500mg',
                dose: '1 tab',
                freq: 'BD',
                dur: 'Ongoing'
              },
              {
                name: 'Telmisartan 40mg',
                dose: '1 tab',
                freq: 'OD',
                dur: 'Ongoing'
              },
              {
                name: 'Atorvastatin 20mg',
                dose: '1 tab',
                freq: 'HS',
                dur: '90 days'
              }].
              map((m, i) =>
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-line dark:border-line-dark last:border-0">
                
                    <div>
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-ink-tertiary">
                        {m.dose} · {m.freq} · {m.dur}
                      </p>
                    </div>
                    <StatusBadge tone="success" dot size="sm">
                      Active
                    </StatusBadge>
                  </div>
              )}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <SectionTitle title="Patient overview" />
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-tertiary">Patient ID</dt>
                  <dd>
                    <MonoNumber size="sm" weight="medium">
                      {patient.id}
                    </MonoNumber>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-tertiary">Age / Gender</dt>
                  <dd>
                    <MonoNumber size="sm">{patient.age}</MonoNumber> ·{' '}
                    {patient.gender === 'M' ? 'Male' : 'Female'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-tertiary">Blood group</dt>
                  <dd className="font-medium">{patient.blood}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-tertiary">Last visit</dt>
                  <dd>
                    <MonoNumber size="sm">{patient.lastVisit}</MonoNumber>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-tertiary">Next appointment</dt>
                  <dd className="text-ink-tertiary">—</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-tertiary">Outstanding</dt>
                  <dd>
                    {patient.balance > 0 ?
                  <MoneyText
                    amount={patient.balance}
                    size="sm"
                    weight="medium"
                    className="text-warning" /> :


                  <span className="text-success">Cleared</span>
                  }
                  </dd>
                </div>
              </dl>
              {patient.allergies.length > 0 &&
            <div className="mt-4 p-3 rounded-xl bg-danger-soft border border-danger/20">
                  <div className="flex items-center gap-1.5 mb-1.5 text-danger">
                    <AlertTriangleIcon className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Allergies
                    </span>
                  </div>
                  <p className="text-sm text-ink-primary">
                    {patient.allergies.join(', ')}
                  </p>
                </div>
            }
              {patient.conditions.length > 0 &&
            <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary mb-2">
                    Known conditions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.conditions.map((c) =>
                <StatusBadge key={c} tone="neutral">
                        {c}
                      </StatusBadge>
                )}
                  </div>
                </div>
            }
            </Card>

            <AIInsightPanel
            title="AI patient summary"
            subtitle="Generated · review before relying"
            needsReview
            insights={[
            {
              tone: 'info',
              title: 'Clinical summary',
              body: '54-year-old male with hypertension and Type 2 diabetes. Last HbA1c 7.8%. BP trending up over last 3 visits.'
            },
            {
              tone: 'warning',
              title: 'Risk notes',
              body: 'Lipid profile pending. BMI in overweight range. Consider cardiovascular risk assessment.'
            },
            {
              tone: 'success',
              title: 'Suggested follow-up questions',
              body: 'Has medication adherence improved? Any dietary changes? Home BP readings?'
            }]
            } />
          
          </div>
        </div>
      }

      {tab !== 'overview' &&
      <Card className="py-16 text-center">
          <p className="text-sm text-ink-secondary">
            This tab content is part of the patient record. Select{' '}
            <span className="font-medium text-ink-primary">Overview</span> to
            see the full demo view.
          </p>
        </Card>
      }
    </div>);

}