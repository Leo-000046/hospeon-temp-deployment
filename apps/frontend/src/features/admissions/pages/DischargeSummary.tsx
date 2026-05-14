import React, { useState } from 'react';
import {
  SparklesIcon,
  PrinterIcon,
  SendIcon,
  CheckIcon,
  ListChecksIcon,
  UserIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { MonoNumber } from '@/components/ui/MonoNumber';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AIInsightPanel } from '@/components/ui/AIInsightPanel';
const admissions: any[] = [];
import { cn } from '@/lib/cn';
type DischargeData = {
  los: string;
  diagnosis: string;
  treatment: string;
  investigations: {
    test: string;
    result: string;
  }[];
  condition: string;
  medications: string[][];
  advice: string;
  followUp: string;
  redFlags: string;
  charges: number;
  deposit: number;
  insurance: number;
};
const dischargeByAdmission: Record<string, DischargeData> = {
  'IPD-2026-0214': {
    los: '2 days',
    diagnosis:
    'Acute decompensated heart failure (NYHA III) with underlying ischemic cardiomyopathy. Type 2 diabetes mellitus, controlled.',
    treatment: `• IV furosemide 40mg BD for 2 days
• Aspirin 75mg OD, Atorvastatin 40mg HS continued
• Metoprolol 50mg BD initiated
• Heparin prophylaxis 5000u SC TID
• Fluid restriction 1.5L/day, low salt diet
• Cardiac rehabilitation education provided`,
    investigations: [
    {
      test: 'ECG (admission)',
      result: 'Sinus rhythm, LBBB, no acute ST changes'
    },
    {
      test: 'Echo',
      result: 'LVEF 38%, global hypokinesia, mild MR'
    },
    {
      test: 'Troponin I',
      result: '0.04 ng/mL (within normal)'
    },
    {
      test: 'NT-proBNP',
      result: '1842 pg/mL (elevated)'
    },
    {
      test: 'HbA1c',
      result: '7.4%'
    }],

    condition:
    'Symptomatically improved. Comfortable at rest. Vitals stable. BP 128/82, pulse 76, SpO₂ 98% on room air. Ambulating independently.',
    medications: [
    ['Aspirin 75mg', '1 tab', 'OD', 'Continue', 'After breakfast'],
    ['Atorvastatin 40mg', '1 tab', 'HS', 'Continue', 'At bedtime'],
    ['Metoprolol 50mg', '1 tab', 'BD', '30 days', 'With food'],
    ['Furosemide 40mg', '1 tab', 'OD', '14 days', 'Morning'],
    ['Metformin 500mg', '1 tab', 'BD', 'Continue', 'After meals']],

    advice: `• Low salt, low fat diet
• Daily weight monitoring
• Restrict fluid to 1.5L/day
• Report weight gain > 2kg in 3 days
• No strenuous activity for 2 weeks`,
    followUp: '2026-05-26 · Dr. Rahul Verma',
    redFlags: `• Chest pain or pressure
• Shortness of breath at rest
• Sudden weight gain
• Swelling of legs`,
    charges: 42800,
    deposit: 25000,
    insurance: 14200
  },
  'IPD-2026-0213': {
    los: '3 days',
    diagnosis:
    'Congestive cardiac failure with volume overload. Underlying valvular heart disease (mitral regurgitation, moderate).',
    treatment: `• IV furosemide 40mg OD, transitioned to oral on day 2
• Spironolactone 25mg OD initiated
• Digoxin 0.125mg OD continued
• Strict input-output charting
• Salt-restricted diet, fluid restriction 1L/day
• Daily weight monitoring`,
    investigations: [
    {
      test: 'ECG',
      result: 'Atrial fibrillation, controlled ventricular rate'
    },
    {
      test: 'Echo',
      result: 'LVEF 42%, moderate MR, mild LA dilatation'
    },
    {
      test: 'Electrolytes',
      result: 'Na 134, K 4.2, normal renal function'
    },
    {
      test: 'Chest X-ray',
      result: 'Mild pulmonary congestion, resolving'
    }],

    condition:
    'Significantly improved. Reduced peripheral edema. BP 122/78, pulse 84 (irregular), SpO₂ 97%. Tolerating oral diuretics well.',
    medications: [
    ['Furosemide 40mg', '1 tab', 'OD', 'Continue', 'Morning'],
    ['Spironolactone 25mg', '1 tab', 'OD', 'Continue', 'After breakfast'],
    ['Digoxin 0.125mg', '1 tab', 'OD', 'Continue', 'Same time daily'],
    ['Warfarin 3mg', '1 tab', 'OD', 'Continue', 'Evening, monitor INR']],

    advice: `• Low salt diet, fluid restriction 1L/day
• Daily weight monitoring at same time
• INR check every 2 weeks
• Avoid NSAIDs and herbal supplements
• Gentle ambulation, no heavy lifting`,
    followUp: '2026-05-23 · Dr. Rahul Verma',
    redFlags: `• Sudden weight gain (> 1.5kg/day)
• Worsening breathlessness
• Bleeding (gums, stools, urine)
• Palpitations or syncope`,
    charges: 38500,
    deposit: 15000,
    insurance: 18000
  },
  'IPD-2026-0212': {
    los: '1 day',
    diagnosis:
    'Acute exacerbation of COPD with type 2 respiratory failure. Underlying chronic obstructive pulmonary disease (GOLD stage 3).',
    treatment: `• Nebulised salbutamol + ipratropium 6-hourly
• IV hydrocortisone 100mg TID
• IV ceftriaxone 1g BD for community-acquired pneumonia coverage
• Controlled oxygen via Venturi mask 28%
• Chest physiotherapy
• Smoking cessation counselling`,
    investigations: [
    {
      test: 'ABG (admission)',
      result: 'pH 7.32, pCO₂ 58, pO₂ 56 — Type 2 RF'
    },
    {
      test: 'ABG (discharge)',
      result: 'pH 7.38, pCO₂ 48, pO₂ 72 — improved'
    },
    {
      test: 'Chest X-ray',
      result: 'Hyperinflation, no consolidation'
    },
    {
      test: 'CBC',
      result: 'WBC 12,400, neutrophilia'
    }],

    condition:
    'Breathing comfortable on room air. SpO₂ 94% at rest. BP 138/86, pulse 92. No accessory muscle use. Able to climb one flight of stairs.',
    medications: [
    ['Salbutamol Inhaler', '2 puffs', 'QID', 'Continue', 'Via spacer'],
    ['Tiotropium Inhaler', '1 puff', 'OD', 'Continue', 'Morning'],
    ['Prednisolone 20mg', '1 tab', 'OD', '5 days taper', 'After breakfast'],
    ['Azithromycin 500mg', '1 tab', 'OD', '3 more days', 'Same time daily']],

    advice: `• Strict smoking cessation — nicotine patch supplied
• Correct inhaler technique demonstrated
• Pneumococcal and influenza vaccination recommended
• Avoid cold exposure and dusty environments
• Pulmonary rehabilitation referral made`,
    followUp: '2026-05-19 · Dr. Anjali Menon',
    redFlags: `• Increased breathlessness
• Change in sputum colour/quantity
• Fever or chest pain
• Confusion or drowsiness`,
    charges: 28400,
    deposit: 20000,
    insurance: 6200
  }
};
export function DischargeSummary() {
  const [selectedId, setSelectedId] = useState(admissions[0].id);
  const selected = admissions.find((a) => a.id === selectedId) || admissions[0];
  const data =
  dischargeByAdmission[selected.id] || dischargeByAdmission['IPD-2026-0214'];
  const patientPays = data.charges - data.deposit - data.insurance;
  const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');
  return (
    <div className="pb-24">
      <PageHeader
        title="Discharge summary"
        breadcrumbs={[
        {
          label: 'Hospital'
        },
        {
          label: 'Discharge summary'
        },
        {
          label: selected.id
        }]
        }
        meta={
        <div className="flex items-center gap-3 text-sm flex-wrap">
            <span>
              {selected.patient} ·{' '}
              <MonoNumber size="sm">{selected.pid}</MonoNumber>
            </span>
            <span className="text-ink-tertiary">·</span>
            <span className="text-ink-secondary">
              Admitted <MonoNumber size="sm">{selected.admitted}</MonoNumber>
            </span>
            <StatusBadge tone="warning" dot>
              Draft
            </StatusBadge>
          </div>
        }
        actions={
        <>
            <Button variant="secondary" icon={<PrinterIcon />}>
              Print
            </Button>
            <Button variant="primary" icon={<CheckIcon />}>
              Finalize & discharge
            </Button>
          </>
        } />
      

      {/* Patient selector */}
      <Card className="mb-4">
        <SectionTitle
          title={
          <span className="flex items-center gap-1.5">
              <UserIcon className="w-3.5 h-3.5 text-accent" />
              Select admitted patient
            </span>
          }
          description={`${admissions.length} active admissions · click to switch`} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {admissions.map((a) => {
            const isActive = a.id === selectedId;
            return (
              <button
                key={a.id}
                onClick={() => setSelectedId(a.id)}
                className={cn(
                  'text-left p-3 rounded-xl border transition-all',
                  isActive ?
                  'border-accent bg-accent-soft/50 ring-1 ring-accent/30' :
                  'border-line dark:border-line-dark bg-surface dark:bg-surface-dark hover:border-accent/40 hover:bg-accent-soft/20'
                )}>
                
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="font-semibold text-sm text-ink-primary dark:text-ink-primary-dark">
                    {a.patient}
                  </div>
                  {isActive &&
                  <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                      <CheckIcon className="w-3 h-3" />
                    </span>
                  }
                </div>
                <div className="flex items-center gap-2 text-xs text-ink-secondary mb-1">
                  <MonoNumber size="sm">{a.pid}</MonoNumber>
                  <span className="text-ink-tertiary">·</span>
                  <MonoNumber size="sm">{a.id}</MonoNumber>
                </div>
                <div className="flex items-center justify-between text-xs text-ink-secondary">
                  <span>
                    {a.ward} · <span className="font-mono">{a.bed}</span>
                  </span>
                  <span>
                    Adm <MonoNumber size="sm">{a.admitted}</MonoNumber>
                  </span>
                </div>
                <div className="mt-1.5 text-xs text-ink-tertiary">
                  {a.doctor}
                </div>
              </button>);

          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        <div className="space-y-4">
          {/* AI draft banner */}
          <div className="p-4 rounded-2xl bg-accent-soft/60 border border-accent/20 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center shrink-0">
              <SparklesIcon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink-primary dark:text-ink-primary-dark">
                AI draft from IPD notes
              </p>
              <p className="text-xs text-ink-secondary mt-0.5">
                Generated from nursing entries, doctor instructions, lab
                reports, and the admission record for {selected.patient}. Review
                every section before finalizing.
              </p>
            </div>
            <Button size="sm" variant="ghost">
              Regenerate
            </Button>
          </div>

          <Card>
            <SectionTitle title="Admission details" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-ink-tertiary mb-1">Admission ID</p>
                <MonoNumber size="sm" weight="medium">
                  {selected.id}
                </MonoNumber>
              </div>
              <div>
                <p className="text-xs text-ink-tertiary mb-1">Ward / Bed</p>
                <span>
                  {selected.ward} ·{' '}
                  <MonoNumber size="sm">{selected.bed}</MonoNumber>
                </span>
              </div>
              <div>
                <p className="text-xs text-ink-tertiary mb-1">
                  Admitting doctor
                </p>
                <span>{selected.doctor}</span>
              </div>
              <div>
                <p className="text-xs text-ink-tertiary mb-1">Length of stay</p>
                <MonoNumber size="sm">{data.los}</MonoNumber>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Final diagnosis" />
            <Textarea
              key={selected.id + '-dx'}
              defaultValue={data.diagnosis}
              rows={2} />
            
          </Card>

          <Card>
            <SectionTitle title="Treatment given" />
            <Textarea
              key={selected.id + '-tx'}
              rows={5}
              defaultValue={data.treatment} />
            
          </Card>

          <Card>
            <SectionTitle title="Investigations" />
            <div className="space-y-2">
              {data.investigations.map((inv, i) =>
              <div
                key={i}
                className="flex items-start justify-between gap-4 py-2 border-b border-line dark:border-line-dark last:border-0">
                
                  <div className="font-medium text-sm">{inv.test}</div>
                  <div className="text-sm text-ink-secondary text-right">
                    {inv.result}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <SectionTitle title="Condition at discharge" />
            <Textarea
              key={selected.id + '-cond'}
              rows={2}
              defaultValue={data.condition} />
            
          </Card>

          <Card>
            <SectionTitle title="Discharge medications" />
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line dark:border-line-dark text-xs text-ink-tertiary uppercase tracking-wide">
                  <th className="text-left py-2 font-medium">Medicine</th>
                  <th className="text-left py-2 font-medium">Dose</th>
                  <th className="text-left py-2 font-medium">Freq</th>
                  <th className="text-left py-2 font-medium">Duration</th>
                  <th className="text-left py-2 font-medium">Instruction</th>
                </tr>
              </thead>
              <tbody>
                {data.medications.map((row, i) =>
                <tr
                  key={i}
                  className="border-b border-line dark:border-line-dark last:border-0">
                  
                    {row.map((c, ci) =>
                  <td key={ci} className="py-2.5 pr-3">
                        <span
                      className={
                      ci > 0 ? 'font-mono text-sm' : 'text-sm font-medium'
                      }>
                      
                          {c}
                        </span>
                      </td>
                  )}
                  </tr>
                )}
              </tbody>
            </table>
          </Card>

          <Card>
            <SectionTitle title="Advice & follow-up" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Textarea
                key={selected.id + '-advice'}
                label="General advice"
                rows={4}
                defaultValue={data.advice} />
              
              <div className="space-y-3">
                <Input
                  key={selected.id + '-fu'}
                  label="Follow-up appointment"
                  defaultValue={data.followUp} />
                
                <Textarea
                  key={selected.id + '-rf'}
                  label="Red flags — return immediately"
                  rows={3}
                  defaultValue={data.redFlags} />
                
              </div>
            </div>
          </Card>
        </div>

        {/* Right side */}
        <div className="space-y-4">
          <Card>
            <SectionTitle
              title={
              <span className="flex items-center gap-1.5">
                  <ListChecksIcon className="w-3.5 h-3.5 text-accent" />
                  Discharge checklist
                </span>
              }
              description="AI-generated · review each item" />
            
            <ul className="space-y-2 text-sm">
              {[
              {
                l: 'Final invoice cleared',
                done: false
              },
              {
                l: 'Discharge medications dispensed',
                done: false
              },
              {
                l: 'Follow-up appointment booked',
                done: true
              },
              {
                l: 'Patient counselling completed',
                done: true
              },
              {
                l: 'Documents handed over',
                done: false
              },
              {
                l: 'Diet chart given',
                done: true
              },
              {
                l: 'Emergency contact noted',
                done: true
              }].
              map((c, i) =>
              <li key={i} className="flex items-center gap-2.5 py-1">
                  <input
                  type="checkbox"
                  defaultChecked={c.done}
                  className="w-4 h-4 rounded text-accent" />
                
                  <span
                  className={c.done ? 'text-ink-secondary line-through' : ''}>
                  
                    {c.l}
                  </span>
                </li>
              )}
            </ul>
          </Card>

          <AIInsightPanel
            title="AI suggestions"
            subtitle="Generated · review before applying"
            needsReview
            insights={[
            {
              tone: 'info',
              title: 'Simplify medication instructions',
              body: 'Generate a patient-friendly schedule in plain Malayalam / Hindi.',
              action: 'Generate'
            },
            {
              tone: 'warning',
              title: 'Missed counselling topic',
              body: 'Salt-reduction technique not covered in nursing notes. Consider adding to advice section.'
            },
            {
              tone: 'success',
              title: 'Cross-check complete',
              body: 'All admission diagnoses are addressed in the treatment section.'
            }]
            } />
          

          <Card>
            <SectionTitle title="Billing summary" />
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Total charges</dt>
                <dd className="font-mono">{fmt(data.charges)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Deposit</dt>
                <dd className="font-mono">{fmt(data.deposit)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Insurance approved</dt>
                <dd className="font-mono">{fmt(data.insurance)}</dd>
              </div>
              <div className="flex justify-between pt-2 border-t border-line dark:border-line-dark">
                <dt className="font-semibold">Patient pays</dt>
                <dd
                  className={cn(
                    'font-mono font-semibold',
                    patientPays > 0 ? 'text-warning' : 'text-success'
                  )}>
                  
                  {fmt(Math.max(patientPays, 0))}
                </dd>
              </div>
            </dl>
            <Button variant="secondary" fullWidth className="mt-3">
              Open final invoice
            </Button>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-surface/95 dark:bg-surface-dark/95 backdrop-blur border-t border-line dark:border-line-dark px-4 lg:px-6 py-3 z-10">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <StatusBadge tone="warning" dot>
              Human approval required before discharge
            </StatusBadge>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap sm:justify-end [&>*]:shrink-0">
            <Button variant="ghost">Save draft</Button>
            <Button variant="secondary" icon={<SendIcon />}>
              Send to patient
            </Button>
            <Button variant="primary" icon={<CheckIcon />}>
              Finalize & discharge
            </Button>
          </div>
        </div>
      </div>
    </div>);

}