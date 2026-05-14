import React, { useState } from 'react';
import {
  SparklesIcon,
  SaveIcon,
  PrinterIcon,
  SendIcon,
  CheckIcon,
  AlertTriangleIcon,
  PlusIcon,
  SearchIcon,
  FlaskConicalIcon,
  PillIcon,
  FileTextIcon,
  ClipboardListIcon,
  XIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button, IconButton } from '../components/primitives/Button';
import { Input, Textarea } from '../components/primitives/Input';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { StatusBadge } from '../components/primitives/StatusBadge';
import { cn } from '../lib/cn';
const sections = [
{
  id: 'complaint',
  label: 'Complaint'
},
{
  id: 'history',
  label: 'History'
},
{
  id: 'examination',
  label: 'Examination'
},
{
  id: 'diagnosis',
  label: 'Diagnosis'
},
{
  id: 'prescription',
  label: 'Prescription'
},
{
  id: 'labs',
  label: 'Lab Orders'
},
{
  id: 'advice',
  label: 'Advice'
},
{
  id: 'followup',
  label: 'Follow-up'
}];

export function Consultation() {
  const [section, setSection] = useState('complaint');
  const [showAI, setShowAI] = useState(true);
  const [meds, setMeds] = useState([
  {
    name: 'Metformin 500mg',
    dose: '1 tab',
    freq: 'BD',
    dur: '30 days',
    food: 'After food',
    qty: 60
  },
  {
    name: 'Telmisartan 40mg',
    dose: '1 tab',
    freq: 'OD',
    dur: '30 days',
    food: 'Before food',
    qty: 30
  }]
  );
  return (
    <div className="pb-24">
      <PageHeader
        title="Consultation — Ramesh Kumar"
        breadcrumbs={[
        {
          label: 'OPD'
        },
        {
          label: 'Consultations'
        },
        {
          label: 'Active'
        }]
        }
        meta={
        <div className="flex flex-wrap items-center gap-3 text-sm">
            <MonoNumber size="sm" weight="medium">
              P-100482
            </MonoNumber>
            <span className="text-ink-tertiary">·</span>
            <span className="text-ink-secondary">54 · Male</span>
            <span className="text-ink-tertiary">·</span>
            <MonoNumber size="sm" className="text-ink-secondary">
              Token T-014
            </MonoNumber>
            <StatusBadge tone="info" dot>
              In consultation
            </StatusBadge>
            <StatusBadge tone="danger" size="sm">
              Allergy: Penicillin
            </StatusBadge>
          </div>
        }
        actions={
        <>
            <Button
            variant="ghost"
            icon={<SparklesIcon />}
            onClick={() => setShowAI((s) => !s)}
            className="text-accent">
            
              {showAI ? 'Hide AI' : 'Show AI'}
            </Button>
            <Button variant="secondary" icon={<SaveIcon />}>
              Save draft
            </Button>
          </>
        } />
      

      <div
        className={cn(
          'grid gap-4',
          showAI ?
          'grid-cols-1 xl:grid-cols-[260px_1fr_320px]' :
          'grid-cols-1 xl:grid-cols-[260px_1fr]'
        )}>
        
        {/* Left: Patient summary */}
        <div className="space-y-4">
          <Card padded>
            <SectionTitle title="Patient summary" />
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-ink-tertiary mb-1">Allergies</p>
                <StatusBadge tone="danger" dot size="sm">
                  Penicillin
                </StatusBadge>
              </div>
              <div>
                <p className="text-xs text-ink-tertiary mb-1">
                  Active conditions
                </p>
                <div className="flex flex-wrap gap-1">
                  <StatusBadge tone="neutral" size="sm">
                    Hypertension
                  </StatusBadge>
                  <StatusBadge tone="neutral" size="sm">
                    T2 Diabetes
                  </StatusBadge>
                </div>
              </div>
              <div>
                <p className="text-xs text-ink-tertiary mb-1">Last vitals</p>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <div>
                    <span className="text-ink-tertiary">BP</span>{' '}
                    <MonoNumber size="xs" className="text-warning ml-1">
                      138/86
                    </MonoNumber>
                  </div>
                  <div>
                    <span className="text-ink-tertiary">Pulse</span>{' '}
                    <MonoNumber size="xs" className="ml-1">
                      78
                    </MonoNumber>
                  </div>
                  <div>
                    <span className="text-ink-tertiary">SpO₂</span>{' '}
                    <MonoNumber size="xs" className="ml-1">
                      97%
                    </MonoNumber>
                  </div>
                  <div>
                    <span className="text-ink-tertiary">FBS</span>{' '}
                    <MonoNumber size="xs" className="text-warning ml-1">
                      142
                    </MonoNumber>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-ink-tertiary mb-1">
                  Active medications
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Metformin 500mg BD</li>
                  <li>• Telmisartan 40mg OD</li>
                </ul>
              </div>
              <div>
                <p className="text-xs text-ink-tertiary mb-1">Last visit</p>
                <p className="text-xs">
                  <MonoNumber size="xs">2026-04-21</MonoNumber> · Diabetic
                  review
                </p>
              </div>
            </div>
          </Card>

          <Card padded>
            <p className="text-xs text-ink-tertiary mb-2">Jump to section</p>
            <nav className="space-y-0.5">
              {sections.map((s) =>
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={cn(
                  'w-full text-left px-2 py-1.5 text-sm rounded-md',
                  section === s.id ?
                  'bg-accent-soft text-accent font-medium' :
                  'text-ink-secondary hover:bg-subtle dark:hover:bg-subtle-dark'
                )}>
                
                  {s.label}
                </button>
              )}
            </nav>
          </Card>
        </div>

        {/* Middle: Main workspace */}
        <div className="space-y-4 min-w-0">
          <Card>
            <SectionTitle
              title="Chief complaint"
              description="What brought the patient in today" />
            
            <Textarea
              placeholder="e.g. Headache for 3 days, dizziness on standing…"
              rows={3} />
            
            <div className="flex flex-wrap gap-1.5 mt-3">
              {[
              'Fever',
              'Cough',
              'Headache',
              'BP review',
              'Diabetic follow-up'].
              map((t) =>
              <button
                key={t}
                className="px-2.5 py-1 text-xs rounded-full bg-subtle dark:bg-subtle-dark text-ink-secondary hover:bg-line">
                
                  + {t}
                </button>
              )}
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Vitals"
              description="Recorded by nursing staff"
              action={
              <Button size="sm" variant="ghost" icon={<PlusIcon />}>
                  Add measurement
                </Button>
              } />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
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
                  'p-2.5 rounded-lg border',
                  v.abnormal ?
                  'bg-warning-soft border-warning/20' :
                  'bg-subtle/50 dark:bg-subtle-dark/50 border-transparent'
                )}>
                
                  <div className="text-[10px] uppercase tracking-wider text-ink-tertiary">
                    {v.label}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <MonoNumber
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

          <Card>
            <SectionTitle title="Diagnosis" />
            <Input placeholder="Search ICD-10 codes…" icon={<SearchIcon />} />
            <div className="flex flex-wrap gap-1.5 mt-3">
              <StatusBadge tone="info" size="md">
                I10 — Essential hypertension{' '}
                <button className="ml-1 -mr-1">
                  <XIcon className="w-3 h-3" />
                </button>
              </StatusBadge>
              <StatusBadge tone="info" size="md">
                E11.9 — T2 Diabetes{' '}
                <button className="ml-1 -mr-1">
                  <XIcon className="w-3 h-3" />
                </button>
              </StatusBadge>
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Prescription"
              description={`${meds.length} medicines`}
              action={
              <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" icon={<FileTextIcon />}>
                    Templates
                  </Button>
                  <Button size="sm" variant="secondary" icon={<PlusIcon />}>
                    Add medicine
                  </Button>
                </div>
              } />
            
            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line dark:border-line-dark">
                    {[
                    'Medicine',
                    'Dose',
                    'Frequency',
                    'Duration',
                    'Instructions',
                    'Qty',
                    ''].
                    map((h) =>
                    <th
                      key={h}
                      className="py-2 px-2 text-left text-xs font-medium text-ink-tertiary uppercase tracking-wide">
                      
                        {h}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {meds.map((m, i) =>
                  <tr
                    key={i}
                    className="border-b border-line dark:border-line-dark last:border-0">
                    
                      <td className="py-2.5 px-2 font-medium">{m.name}</td>
                      <td className="py-2.5 px-2">
                        <MonoNumber size="sm">{m.dose}</MonoNumber>
                      </td>
                      <td className="py-2.5 px-2">
                        <MonoNumber size="sm">{m.freq}</MonoNumber>
                      </td>
                      <td className="py-2.5 px-2">
                        <MonoNumber size="sm">{m.dur}</MonoNumber>
                      </td>
                      <td className="py-2.5 px-2 text-xs text-ink-secondary">
                        {m.food}
                      </td>
                      <td className="py-2.5 px-2">
                        <MonoNumber size="sm">{m.qty}</MonoNumber>
                      </td>
                      <td className="py-2.5 px-2 text-right">
                        <IconButton
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                        setMeds(meds.filter((_, x) => x !== i))
                        }>
                        
                          <XIcon />
                        </IconButton>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Lab orders"
              action={
              <Button size="sm" variant="secondary" icon={<PlusIcon />}>
                  Add test
                </Button>
              } />
            
            <div className="flex flex-wrap gap-1.5">
              <StatusBadge tone="info">HbA1c</StatusBadge>
              <StatusBadge tone="info">Lipid Profile</StatusBadge>
              <StatusBadge tone="info">Serum Creatinine</StatusBadge>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Advice & Follow-up" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Textarea
                label="General advice"
                rows={3}
                placeholder="Diet, lifestyle, red flags…" />
              
              <div className="space-y-3">
                <Input label="Follow-up after" placeholder="14 days" />
                <label className="flex items-center gap-2 text-xs text-ink-secondary">
                  <input
                    type="checkbox"
                    className="rounded text-accent"
                    defaultChecked />
                  
                  Send reminder via WhatsApp 1 day before
                </label>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: AI panel */}
        {showAI &&
        <div className="space-y-4">
            <Card padded className="border-accent/30">
              <SectionTitle
              title={

              <span className="flex items-center gap-1.5">
                      <SparklesIcon className="w-3.5 h-3.5 text-accent" />
                      AI clinical draft
                    </span> as
              any
              }
              description="Generated from voice + EHR context" />
            
              <div className="bg-subtle/60 dark:bg-subtle-dark/60 rounded-lg p-3 text-xs leading-relaxed">
                <p className="text-ink-primary dark:text-ink-primary-dark">
                  <span className="font-semibold">S:</span> 54M with known HTN,
                  T2DM. Reports increased fatigue past 2 weeks, occasional
                  dizziness on standing. No chest pain, no SOB.
                </p>
                <p className="mt-2 text-ink-primary dark:text-ink-primary-dark">
                  <span className="font-semibold">O:</span> BP 138/86
                  (elevated). FBS 142 (elevated). BMI 25.7.
                </p>
                <p className="mt-2 text-ink-primary dark:text-ink-primary-dark">
                  <span className="font-semibold">A:</span> Suboptimal control
                  of HTN and T2DM.
                </p>
                <p className="mt-2 text-ink-primary dark:text-ink-primary-dark">
                  <span className="font-semibold">P:</span> Continue current
                  regime, order HbA1c & lipids, review in 2 weeks.
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <StatusBadge tone="warning" size="sm">
                  Human approval required
                </StatusBadge>
                <div className="flex items-center gap-1">
                  <IconButton size="sm" variant="ghost">
                    <XIcon />
                  </IconButton>
                  <Button size="sm" variant="primary" icon={<CheckIcon />}>
                    Apply
                  </Button>
                </div>
              </div>
            </Card>

            <Card padded>
              <SectionTitle title="Quick AI actions" />
              <div className="space-y-1.5">
                {[
              'Summarize patient history',
              'Suggest follow-up questions',
              'Translate prescription to Malayalam',
              'Convert advice to patient-friendly text',
              'Draft WhatsApp follow-up message'].
              map((a) =>
              <button
                key={a}
                className="w-full text-left px-3 py-2 text-xs rounded-lg bg-subtle/60 dark:bg-subtle-dark/60 hover:bg-subtle dark:hover:bg-subtle-dark text-ink-secondary hover:text-ink-primary">
                
                    <SparklesIcon className="w-3 h-3 inline mr-1.5 text-accent" />
                    {a}
                  </button>
              )}
              </div>
            </Card>

            <Card padded>
              <SectionTitle title="Drug interaction check" />
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-success-soft">
                <CheckIcon className="w-3.5 h-3.5 text-success mt-0.5 shrink-0" />
                <p className="text-xs text-ink-primary">
                  No major interactions found between Metformin and Telmisartan.
                  Safe to co-prescribe.
                </p>
              </div>
            </Card>
          </div>
        }
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-surface/95 dark:bg-surface-dark/95 backdrop-blur border-t border-line dark:border-line-dark px-4 lg:px-6 py-3 z-10">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-ink-tertiary">
            <StatusBadge tone="success" dot size="sm">
              Auto-saved
            </StatusBadge>
            <span>
              Last saved <MonoNumber size="xs">12:42</MonoNumber>
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap sm:justify-end [&>*]:shrink-0">
            <Button variant="ghost">Save draft</Button>
            <Button variant="secondary" icon={<PrinterIcon />}>
              Print Rx
            </Button>
            <Button variant="secondary" icon={<SendIcon />}>
              Send to patient
            </Button>
            <Button variant="primary" icon={<CheckIcon />}>
              Complete consultation
            </Button>
          </div>
        </div>
      </div>
    </div>);

}