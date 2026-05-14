import React, { useState } from 'react';
import {
  AlertTriangleIcon,
  CheckIcon,
  MinusIcon,
  CircleIcon,
  SparklesIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MonoNumber } from '@/components/ui/MonoNumber';
import { cn } from '@/lib/cn';
const slots = [
'06:00',
'08:00',
'10:00',
'12:00',
'14:00',
'16:00',
'18:00',
'20:00',
'22:00'];

interface Med {
  drug: string;
  dose: string;
  route: string;
  freq: string;
  highAlert?: boolean;
  // status per slot index: 'given' | 'due' | 'missed' | 'held' | 'na'
  status: (
  string |
  {
    state: 'given';
    initials: string;
    time: string;
  })[];

}
const meds: Med[] = [
{
  drug: 'Aspirin',
  dose: '75 mg',
  route: 'PO',
  freq: 'OD',
  status: [
  'na',
  {
    state: 'given',
    initials: 'SR',
    time: '08:04'
  },
  'na',
  'na',
  'na',
  'na',
  'na',
  'na',
  'na']

},
{
  drug: 'Atorvastatin',
  dose: '40 mg',
  route: 'PO',
  freq: 'HS',
  status: ['na', 'na', 'na', 'na', 'na', 'na', 'na', 'due', 'na']
},
{
  drug: 'Enoxaparin',
  dose: '60 mg',
  route: 'SC',
  freq: 'BD',
  highAlert: true,
  status: [
  'na',
  {
    state: 'given',
    initials: 'PK',
    time: '08:12'
  },
  'na',
  'na',
  'na',
  'na',
  'na',
  'due',
  'na']

},
{
  drug: 'Metoprolol',
  dose: '25 mg',
  route: 'PO',
  freq: 'BD',
  status: [
  'na',
  {
    state: 'given',
    initials: 'SR',
    time: '08:08'
  },
  'na',
  'na',
  'missed',
  'na',
  'na',
  'due',
  'na']

},
{
  drug: 'Pantoprazole',
  dose: '40 mg',
  route: 'IV',
  freq: 'OD',
  status: [
  {
    state: 'given',
    initials: 'SR',
    time: '06:14'
  },
  'na',
  'na',
  'na',
  'na',
  'na',
  'na',
  'na',
  'na']

},
{
  drug: 'Insulin Aspart',
  dose: '8 U',
  route: 'SC',
  freq: 'TDS',
  highAlert: true,
  status: [
  'na',
  {
    state: 'given',
    initials: 'PK',
    time: '08:00'
  },
  'na',
  {
    state: 'given',
    initials: 'PK',
    time: '12:04'
  },
  'na',
  'na',
  'due',
  'na',
  'na']

},
{
  drug: 'Paracetamol',
  dose: '1 g',
  route: 'IV',
  freq: 'PRN',
  status: ['na', 'na', 'held', 'na', 'na', 'na', 'na', 'na', 'na']
}];

function StatusCell({ value }: {value: any;}) {
  if (value === 'na')
  return <span className="text-ink-tertiary text-xs">·</span>;
  if (value === 'due')
  return (
    <div className="w-7 h-7 mx-auto rounded-full border-2 border-warning bg-warning-soft flex items-center justify-center">
        <CircleIcon className="w-3 h-3 text-warning fill-current" />
      </div>);

  if (value === 'missed')
  return (
    <div className="w-7 h-7 mx-auto rounded-full border-2 border-danger bg-danger-soft flex items-center justify-center">
        <span className="text-[10px] font-bold text-danger">!</span>
      </div>);

  if (value === 'held')
  return (
    <div className="w-7 h-7 mx-auto rounded-full bg-subtle dark:bg-subtle-dark border border-line flex items-center justify-center">
        <MinusIcon className="w-3 h-3 text-ink-tertiary" />
      </div>);

  if (value?.state === 'given')
  return (
    <div className="w-7 h-7 mx-auto rounded-full bg-success text-white flex flex-col items-center justify-center leading-none">
        <CheckIcon className="w-3 h-3" />
        <span className="text-[8px] font-mono mt-0.5">{value.initials}</span>
      </div>);

  return null;
}
export function MAR() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{
    med: string;
    time: string;
  } | null>(null);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Medication Administration Record"
        description="Bed W1-03 · Vikram Shah"
        breadcrumbs={[
        {
          label: 'IPD',
          to: '/ipd'
        },
        {
          label: 'Bed W1-03'
        },
        {
          label: 'MAR'
        }]
        }
        actions={<Button variant="primary">Add medication</Button>} />
      

      {/* Patient strip */}
      <Card>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ink-tertiary mb-1">
              Patient
            </div>
            <div className="text-ink-primary dark:text-ink-primary-dark font-medium">
              Vikram Shah
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ink-tertiary mb-1">
              ID
            </div>
            <MonoNumber>P-100501</MonoNumber>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ink-tertiary mb-1">
              Age / Sex
            </div>
            <span>
              <MonoNumber>62</MonoNumber>M
            </span>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ink-tertiary mb-1">
              Bed
            </div>
            <MonoNumber>W1-03</MonoNumber>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ink-tertiary mb-1">
              Weight
            </div>
            <MonoNumber>72 kg</MonoNumber>
          </div>
          <div className="rounded-lg bg-warning-soft px-3 py-1 text-warning text-xs font-semibold inline-flex items-center gap-1.5">
            <AlertTriangleIcon className="w-3.5 h-3.5" />
            Allergy: Penicillin
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* MAR grid */}
        <Card padding="none">
          <div className="px-5 pt-5">
            <SectionTitle
              title="Today · 12 May 2026"
              description="Click any cell to record administration" />
            
          </div>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead className="bg-subtle/40 dark:bg-subtle-dark/40 border-y border-line dark:border-line-dark">
                <tr>
                  <th className="text-left px-5 py-2.5 text-xs uppercase tracking-wider text-ink-tertiary sticky left-0 bg-subtle/40 dark:bg-subtle-dark/40 min-w-[260px]">
                    Medication
                  </th>
                  {slots.map((s) =>
                  <th key={s} className="px-2 py-2.5 text-center">
                      <MonoNumber className="text-xs text-ink-tertiary">
                        {s}
                      </MonoNumber>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-line dark:divide-line-dark">
                {meds.map((m) =>
                <tr
                  key={m.drug}
                  className="hover:bg-subtle/30 dark:hover:bg-subtle-dark/30">
                  
                    <td className="px-5 py-3 sticky left-0 bg-surface dark:bg-surface-dark">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="text-sm font-medium text-ink-primary dark:text-ink-primary-dark">
                            {m.drug}{' '}
                            <MonoNumber className="text-ink-tertiary font-normal">
                              {m.dose}
                            </MonoNumber>
                          </div>
                          <div className="text-xs text-ink-tertiary">
                            {m.route} · {m.freq}
                          </div>
                        </div>
                        {m.highAlert &&
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-danger-soft text-danger font-bold">
                            HA
                          </span>
                      }
                      </div>
                    </td>
                    {m.status.map((s, i) =>
                  <td key={i} className="px-1 py-2 text-center">
                        <button
                      onClick={() => {
                        setDrawerOpen(true);
                        setSelectedCell({
                          med: m.drug,
                          time: slots[i]
                        });
                      }}
                      className="w-full">
                      
                          <StatusCell value={s} />
                        </button>
                      </td>
                  )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-line dark:border-line-dark flex flex-wrap gap-4 text-xs text-ink-tertiary">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
                <CheckIcon className="w-2.5 h-2.5 text-white" />
              </div>
              Given
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full border-2 border-warning bg-warning-soft" />
              Due
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full border-2 border-danger bg-danger-soft" />
              Missed
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-subtle dark:bg-subtle-dark border border-line" />
              Held
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] uppercase px-1 rounded bg-danger-soft text-danger font-bold">
                HA
              </span>
              High-alert med
            </div>
          </div>
        </Card>

        {/* Right rail */}
        <div className="space-y-6">
          <Card>
            <SectionTitle
              title="High-alert meds"
              description="Require double-verification" />
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-danger-soft/40 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                <span className="text-ink-primary dark:text-ink-primary-dark">
                  Enoxaparin 60mg SC
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-danger-soft/40 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                <span className="text-ink-primary dark:text-ink-primary-dark">
                  Insulin Aspart 8U SC
                </span>
              </div>
            </div>
          </Card>

          <div className="rounded-2xl bg-accent-soft/50 border border-accent-soft p-5">
            <div className="flex items-center gap-2 mb-3">
              <SparklesIcon className="w-4 h-4 text-accent" />
              <div className="text-sm font-semibold text-accent">
                AI drug interaction check
              </div>
              <span className="ml-auto text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-warning-soft text-warning font-semibold">
                Needs review
              </span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="rounded-lg bg-surface dark:bg-surface-dark p-3 border border-warning-soft">
                <div className="text-warning font-semibold mb-1">
                  Moderate · Aspirin + Enoxaparin
                </div>
                <div className="text-ink-secondary dark:text-ink-secondary-dark">
                  Increased bleeding risk. Monitor for bruising, melena,
                  hematuria.
                </div>
              </div>
              <div className="rounded-lg bg-surface dark:bg-surface-dark p-3 border border-line dark:border-line-dark">
                <div className="text-ink-primary dark:text-ink-primary-dark font-semibold mb-1">
                  Mild · Metoprolol + Insulin
                </div>
                <div className="text-ink-secondary dark:text-ink-secondary-dark">
                  Beta-blocker may mask hypoglycemia symptoms. Educate patient.
                </div>
              </div>
            </div>
            <div className="text-[11px] text-ink-tertiary mt-3 leading-relaxed">
              AI checks are decision support. The ordering physician remains
              responsible for medication safety.
            </div>
          </div>

          <Card>
            <SectionTitle title="Allergies" />
            <div className="rounded-lg bg-warning-soft/40 border border-warning-soft p-3 text-sm">
              <div className="font-semibold text-ink-primary dark:text-ink-primary-dark">
                Penicillin
              </div>
              <div className="text-xs text-ink-secondary dark:text-ink-secondary-dark mt-0.5">
                Severe rash · 2018
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mini drawer */}
      {drawerOpen &&
      <div
        className="fixed inset-0 z-50 bg-black/30"
        onClick={() => setDrawerOpen(false)}>
        
          <div
          className="absolute right-0 top-0 h-full w-full max-w-md bg-surface dark:bg-surface-dark border-l border-line dark:border-line-dark shadow-2xl p-6 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}>
          
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs text-ink-tertiary">
                  Confirm administration
                </div>
                <h3 className="text-lg font-semibold text-ink-primary dark:text-ink-primary-dark">
                  {selectedCell?.med}
                </h3>
                <MonoNumber className="text-xs text-ink-secondary">
                  Scheduled for {selectedCell?.time}
                </MonoNumber>
              </div>
              <button
              onClick={() => setDrawerOpen(false)}
              className="text-ink-tertiary hover:text-ink-primary">
              
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs text-ink-tertiary mb-1">
                  Nurse initials
                </label>
                <input
                className="w-full px-3 py-2 rounded-lg border border-line dark:border-line-dark bg-canvas dark:bg-canvas-dark font-mono"
                defaultValue="SR" />
              
              </div>
              <div>
                <label className="block text-xs text-ink-tertiary mb-1">
                  Time given
                </label>
                <input
                type="time"
                className="w-full px-3 py-2 rounded-lg border border-line dark:border-line-dark bg-canvas dark:bg-canvas-dark font-mono"
                defaultValue="08:00" />
              
              </div>
              <div>
                <label className="block text-xs text-ink-tertiary mb-1">
                  Witness (required for high-alert)
                </label>
                <input
                className="w-full px-3 py-2 rounded-lg border border-line dark:border-line-dark bg-canvas dark:bg-canvas-dark"
                placeholder="e.g. PK" />
              
              </div>
              <div>
                <label className="block text-xs text-ink-tertiary mb-1">
                  Notes
                </label>
                <textarea
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-line dark:border-line-dark bg-canvas dark:bg-canvas-dark"
                placeholder="Patient tolerated well, vital signs stable…" />
              
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="secondary" className="flex-1">
                  Hold dose
                </Button>
                <Button
                variant="primary"
                className="flex-1"
                onClick={() => setDrawerOpen(false)}>
                
                  Confirm given
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}