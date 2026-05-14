import React, { useState } from 'react';
import {
  PlusIcon,
  AlertTriangleIcon,
  CheckIcon,
  ClockIcon,
  ArrowRightLeftIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MonoNumber } from '@/components/ui/MonoNumber';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Select } from '@/components/ui/Input';
import { cn } from '@/lib/cn';
const tabs = [
'Vitals',
'Medication chart',
'Nursing notes',
'Doctor instructions',
'Tasks',
'I&O',
'Shift handover'] as
const;
const beds = [
{
  bed: 'C-04',
  patient: 'Joseph Mathew',
  pid: 'P-100480',
  alert: true
},
{
  bed: 'A-12',
  patient: 'Lakshmi Devi',
  pid: 'P-100475',
  alert: false
},
{
  bed: 'P-08',
  patient: 'Abdul Rasheed',
  pid: 'P-100476',
  alert: false
}];

export function NursingStation() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Medication chart');
  const [bed, setBed] = useState(beds[0]);
  return (
    <div>
      <PageHeader
        title="Nursing station"
        description="Monitor in-patient care: vitals, medications, notes, and shift handover."
        breadcrumbs={[
        {
          label: 'Hospital'
        },
        {
          label: 'Nursing station'
        }]
        }
        meta={
        <div className="flex items-center gap-3 text-sm">
            <span className="text-ink-secondary">
              Shift:{' '}
              <span className="text-ink-primary dark:text-ink-primary-dark font-medium">
                Day · 08:00–20:00
              </span>
            </span>
            <span className="text-ink-tertiary">·</span>
            <span className="text-ink-secondary">
              Nurse on duty:{' '}
              <span className="text-ink-primary dark:text-ink-primary-dark font-medium">
                Sini K.
              </span>
            </span>
          </div>
        }
        actions={
        <Button variant="primary" icon={<ArrowRightLeftIcon />}>
            Handover shift
          </Button>
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
        {/* Bed selector */}
        <Card padded>
          <SectionTitle
            title="In-patients"
            description={`${beds.length} active`} />
          
          <div className="space-y-2">
            {beds.map((b) =>
            <button
              key={b.bed}
              onClick={() => setBed(b)}
              className={cn(
                'w-full text-left p-3 rounded-xl border transition-colors',
                bed.bed === b.bed ?
                'border-accent bg-accent-soft' :
                'border-line dark:border-line-dark hover:bg-subtle dark:hover:bg-subtle-dark'
              )}>
              
                <div className="flex items-center justify-between mb-1">
                  <MonoNumber size="sm" weight="semibold">
                    {b.bed}
                  </MonoNumber>
                  {b.alert &&
                <AlertTriangleIcon className="w-3.5 h-3.5 text-danger" />
                }
                </div>
                <div className="text-sm font-medium">{b.patient}</div>
                <MonoNumber size="xs" className="text-ink-tertiary">
                  {b.pid}
                </MonoNumber>
              </button>
            )}
          </div>
        </Card>

        <div>
          {/* Tabs */}
          <Card padded={false}>
            <div className="px-4 border-b border-line dark:border-line-dark overflow-x-auto">
              <div className="flex items-center gap-1">
                {tabs.map((t) =>
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    'px-3 py-2.5 text-sm border-b-2 whitespace-nowrap',
                    tab === t ?
                    'border-accent text-ink-primary dark:text-ink-primary-dark font-medium' :
                    'border-transparent text-ink-secondary hover:text-ink-primary'
                  )}>
                  
                    {t}
                  </button>
                )}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold">
                    {bed.patient} ·{' '}
                    <MonoNumber size="sm" className="text-ink-tertiary">
                      Bed {bed.bed}
                    </MonoNumber>
                  </h3>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Admitted 2 days ago · Dr. Rahul Verma · Cardiac ICU
                  </p>
                </div>
                <Button size="sm" variant="secondary" icon={<PlusIcon />}>
                  Add entry
                </Button>
              </div>

              {tab === 'Medication chart' && <MedicationChart />}
              {tab === 'Vitals' && <VitalsTab />}
              {tab === 'Nursing notes' && <NotesTab />}
              {tab === 'Doctor instructions' && <InstructionsTab />}
              {tab === 'Tasks' && <TasksTab />}
              {tab === 'I&O' && <IOTab />}
              {tab === 'Shift handover' && <HandoverTab />}
            </div>
          </Card>
        </div>
      </div>
    </div>);

}
function MedicationChart() {
  const meds = [
  {
    name: 'Aspirin 75mg',
    dose: '1 tab',
    route: 'PO',
    schedule: ['06:00', '14:00', '22:00'],
    given: [true, true, false]
  },
  {
    name: 'Atorvastatin 40mg',
    dose: '1 tab',
    route: 'PO',
    schedule: ['22:00'],
    given: [false]
  },
  {
    name: 'Metoprolol 50mg',
    dose: '1 tab',
    route: 'PO',
    schedule: ['08:00', '20:00'],
    given: [true, false]
  },
  {
    name: 'Heparin 5000u',
    dose: '5000 units',
    route: 'SC',
    schedule: ['08:00', '16:00', '00:00'],
    given: [true, true, false]
  },
  {
    name: 'Pantoprazole 40mg',
    dose: '1 vial',
    route: 'IV',
    schedule: ['08:00'],
    given: [true]
  }];

  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line dark:border-line-dark text-xs uppercase tracking-wide text-ink-tertiary">
            <th className="text-left py-2 font-medium">Medication</th>
            <th className="text-left py-2 font-medium">Route</th>
            {[
            '06:00',
            '08:00',
            '14:00',
            '16:00',
            '20:00',
            '22:00',
            '00:00'].
            map((t) =>
            <th key={t} className="text-center py-2 font-medium">
                <MonoNumber size="xs">{t}</MonoNumber>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {meds.map((m, i) =>
          <tr
            key={i}
            className="border-b border-line dark:border-line-dark last:border-0">
            
              <td className="py-3">
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-ink-tertiary">{m.dose}</div>
              </td>
              <td className="py-3">
                <StatusBadge tone="neutral" size="sm">
                  {m.route}
                </StatusBadge>
              </td>
              {[
            '06:00',
            '08:00',
            '14:00',
            '16:00',
            '20:00',
            '22:00',
            '00:00'].
            map((t) => {
              const idx = m.schedule.indexOf(t);
              if (idx === -1)
              return (
                <td key={t} className="py-3 text-center text-ink-tertiary">
                      —
                    </td>);

              const given = m.given[idx];
              const now = '15:00';
              const overdue = !given && t < now;
              return (
                <td key={t} className="py-3 text-center">
                    {given ?
                  <div className="inline-flex w-6 h-6 rounded-full bg-success-soft text-success items-center justify-center">
                        <CheckIcon className="w-3 h-3" />
                      </div> :
                  overdue ?
                  <div className="inline-flex w-6 h-6 rounded-full bg-danger-soft text-danger items-center justify-center">
                        <AlertTriangleIcon className="w-3 h-3" />
                      </div> :

                  <div className="inline-flex w-6 h-6 rounded-full bg-subtle dark:bg-subtle-dark text-ink-tertiary items-center justify-center">
                        <ClockIcon className="w-3 h-3" />
                      </div>
                  }
                  </td>);

            })}
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-success-soft" />
          <span className="text-ink-secondary">Given</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-subtle dark:bg-subtle-dark" />
          <span className="text-ink-secondary">Scheduled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-danger-soft" />
          <span className="text-ink-secondary">Missed / overdue</span>
        </div>
      </div>
    </div>);

}
function VitalsTab() {
  const records = [
  {
    time: '14:00',
    bp: '128/82',
    pulse: '76',
    temp: '98.6',
    spo2: '98',
    rr: '16'
  },
  {
    time: '10:00',
    bp: '134/86',
    pulse: '82',
    temp: '99.1',
    spo2: '97',
    rr: '18'
  },
  {
    time: '06:00',
    bp: '142/90',
    pulse: '88',
    temp: '99.4',
    spo2: '96',
    rr: '20'
  }];

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-line dark:border-line-dark text-xs uppercase tracking-wide text-ink-tertiary">
          <th className="text-left py-2 font-medium">Time</th>
          <th className="text-right py-2 font-medium">BP</th>
          <th className="text-right py-2 font-medium">Pulse</th>
          <th className="text-right py-2 font-medium">Temp</th>
          <th className="text-right py-2 font-medium">SpO₂</th>
          <th className="text-right py-2 font-medium">RR</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r) =>
        <tr
          key={r.time}
          className="border-b border-line dark:border-line-dark last:border-0">
          
            <td className="py-2.5">
              <MonoNumber size="sm">Today {r.time}</MonoNumber>
            </td>
            <td className="py-2.5 text-right">
              <MonoNumber size="sm" weight="medium">
                {r.bp}
              </MonoNumber>
            </td>
            <td className="py-2.5 text-right">
              <MonoNumber size="sm">{r.pulse}</MonoNumber>
            </td>
            <td className="py-2.5 text-right">
              <MonoNumber size="sm">{r.temp}</MonoNumber>
            </td>
            <td className="py-2.5 text-right">
              <MonoNumber size="sm">{r.spo2}</MonoNumber>
            </td>
            <td className="py-2.5 text-right">
              <MonoNumber size="sm">{r.rr}</MonoNumber>
            </td>
          </tr>
        )}
      </tbody>
    </table>);

}
function NotesTab() {
  return (
    <div className="space-y-3">
      {[
      {
        time: '14:30',
        author: 'Sini K. (Nurse)',
        note: 'Patient resting comfortably. Pain rated 2/10. Encouraged ambulation; walked to bathroom with assistance.'
      },
      {
        time: '11:00',
        author: 'Sini K. (Nurse)',
        note: 'Dressing changed on left forearm IV site. No signs of infection. Patient tolerated procedure well.'
      },
      {
        time: '08:15',
        author: 'Reema D. (Nurse, Night)',
        note: 'Reported palpitations at 04:00. ECG done, no acute changes. Dr. Verma informed.'
      }].
      map((n, i) =>
      <div
        key={i}
        className="flex gap-3 p-3 rounded-xl bg-subtle/50 dark:bg-subtle-dark/50">
        
          <MonoNumber
          size="xs"
          className="text-ink-tertiary w-16 shrink-0 mt-0.5">
          
            {n.time}
          </MonoNumber>
          <div className="flex-1">
            <p className="text-xs font-medium">{n.author}</p>
            <p className="text-sm mt-0.5 text-ink-primary dark:text-ink-primary-dark">
              {n.note}
            </p>
          </div>
        </div>
      )}
    </div>);

}
function InstructionsTab() {
  return (
    <div className="space-y-3">
      {[
      {
        from: 'Dr. Rahul Verma',
        time: '09:30',
        text: 'Continue current cardiac meds. Add Heparin 5000u SC TID. Monitor BP q4h.',
        priority: 'high'
      },
      {
        from: 'Dr. Rahul Verma',
        time: 'Yesterday 18:00',
        text: 'NPO after midnight for repeat ECG in morning.',
        priority: 'normal'
      }].
      map((ins, i) =>
      <div
        key={i}
        className="p-3 rounded-xl border border-line dark:border-line-dark">
        
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold">{ins.from}</p>
            <div className="flex items-center gap-2">
              {ins.priority === 'high' &&
            <StatusBadge tone="warning" size="sm">
                  High
                </StatusBadge>
            }
              <MonoNumber size="xs" className="text-ink-tertiary">
                {ins.time}
              </MonoNumber>
            </div>
          </div>
          <p className="text-sm text-ink-primary dark:text-ink-primary-dark">
            {ins.text}
          </p>
        </div>
      )}
    </div>);

}
function TasksTab() {
  const tasks = [
  {
    task: 'Take 16:00 vitals',
    due: '16:00',
    done: false
  },
  {
    task: 'Administer 16:00 Heparin',
    due: '16:00',
    done: false
  },
  {
    task: 'Change IV dressing — left forearm',
    due: 'EOD',
    done: false
  },
  {
    task: 'Take 14:00 vitals',
    due: '14:00',
    done: true
  },
  {
    task: 'Morning medications',
    due: '08:00',
    done: true
  }];

  return (
    <ul className="space-y-2">
      {tasks.map((t, i) =>
      <li
        key={i}
        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-subtle/50 dark:hover:bg-subtle-dark/50">
        
          <input
          type="checkbox"
          defaultChecked={t.done}
          className="w-4 h-4 rounded text-accent" />
        
          <span
          className={cn(
            'flex-1 text-sm',
            t.done && 'line-through text-ink-tertiary'
          )}>
          
            {t.task}
          </span>
          <MonoNumber size="xs" className="text-ink-tertiary">
            {t.due}
          </MonoNumber>
        </li>
      )}
    </ul>);

}
function IOTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card padded>
        <SectionTitle title="Intake" />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-secondary">Oral</span>
            <MonoNumber size="sm">850 mL</MonoNumber>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-secondary">IV fluids</span>
            <MonoNumber size="sm">1200 mL</MonoNumber>
          </div>
          <div className="flex justify-between pt-2 border-t border-line dark:border-line-dark">
            <span className="font-medium">Total</span>
            <MonoNumber size="sm" weight="semibold">
              2050 mL
            </MonoNumber>
          </div>
        </div>
      </Card>
      <Card padded>
        <SectionTitle title="Output" />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-secondary">Urine</span>
            <MonoNumber size="sm">1450 mL</MonoNumber>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-secondary">Drain</span>
            <MonoNumber size="sm">120 mL</MonoNumber>
          </div>
          <div className="flex justify-between pt-2 border-t border-line dark:border-line-dark">
            <span className="font-medium">Total</span>
            <MonoNumber size="sm" weight="semibold">
              1570 mL
            </MonoNumber>
          </div>
        </div>
      </Card>
      <div className="col-span-2 p-3 rounded-xl bg-success-soft/60 text-xs text-ink-primary">
        Net balance:{' '}
        <MonoNumber size="sm" weight="semibold" className="text-success">
          +480 mL
        </MonoNumber>{' '}
        · Within expected range
      </div>
    </div>);

}
function HandoverTab() {
  return (
    <div className="space-y-4">
      <Card padded className="bg-subtle/40 dark:bg-subtle-dark/40 border-0">
        <SectionTitle
          title="Outgoing shift summary"
          description="To be filled before handover" />
        
        <textarea
          rows={6}
          className="w-full rounded-lg bg-surface dark:bg-surface-dark border border-line dark:border-line-dark p-3 text-sm focus:outline-none focus:border-accent"
          defaultValue="Patient stable. BP trending down through the day (142/90 → 128/82). All scheduled meds given except 16:00 Heparin (due). Patient ambulated x2. No complaints of chest pain. Dr. Verma to round at 17:30." />
        
      </Card>
      <div className="flex items-center gap-3">
        <Select label="Incoming nurse" className="flex-1">
          <option>Reema D. (Night)</option>
          <option>Anu P.</option>
        </Select>
        <Button variant="primary">Confirm handover</Button>
      </div>
    </div>);

}