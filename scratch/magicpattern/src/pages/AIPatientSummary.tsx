import React from 'react';
import {
  SparklesIcon,
  RefreshCwIcon,
  CopyIcon,
  ShieldAlertIcon,
  ActivityIcon,
  PillIcon,
  FlaskConicalIcon,
  CalendarIcon,
  BanknoteIcon,
  UserIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Input } from '../components/primitives/Input';
import { MonoNumber, MoneyText } from '../components/primitives/MonoNumber';
import { StatusBadge } from '../components/primitives/StatusBadge';
export function AIPatientSummary() {
  return (
    <div>
      <PageHeader
        title="AI patient summary"
        description="A 30-second AI briefing on any patient. Designed to be read before walking into the consultation room."
        breadcrumbs={[
        {
          label: 'AI Assistant'
        },
        {
          label: 'Patient summary'
        }]
        }
        meta={
        <StatusBadge tone="warning" dot>
            AI Draft · Always verify against EHR
          </StatusBadge>
        }
        actions={
        <>
            <Button variant="secondary" icon={<RefreshCwIcon />}>
              Regenerate
            </Button>
            <Button variant="secondary" icon={<CopyIcon />}>
              Copy summary
            </Button>
          </>
        } />
      

      <Card className="mb-4">
        <div className="flex items-center gap-3">
          <UserIcon className="w-4 h-4 text-ink-tertiary" />
          <Input
            className="flex-1 border-0 shadow-none focus:ring-0"
            placeholder="Search patient by name, P-ID or phone…"
            defaultValue="Ramesh Kumar" />
          
          <StatusBadge tone="success" dot size="sm">
            Loaded
          </StatusBadge>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <div className="space-y-4">
          {/* Header card */}
          <Card>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-subtle dark:bg-subtle-dark flex items-center justify-center text-lg font-medium text-ink-secondary">
                  RK
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Ramesh Kumar</h2>
                  <div className="text-sm text-ink-secondary flex items-center gap-2 flex-wrap">
                    <MonoNumber size="sm">P-100482</MonoNumber>
                    <span>·</span>
                    <span>
                      <MonoNumber size="sm">54</MonoNumber> · Male
                    </span>
                    <span>·</span>
                    <span>Blood B+</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <StatusBadge tone="danger" size="sm" dot>
                      Allergy: Penicillin
                    </StatusBadge>
                    <StatusBadge tone="neutral" size="sm">
                      Hypertension
                    </StatusBadge>
                    <StatusBadge tone="neutral" size="sm">
                      T2 Diabetes
                    </StatusBadge>
                  </div>
                </div>
              </div>
            </div>

            {/* AI clinical summary */}
            <div className="p-4 rounded-xl bg-accent-soft/40 border border-accent/15">
              <div className="flex items-center gap-2 mb-2">
                <SparklesIcon className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  AI clinical brief
                </span>
              </div>
              <p className="text-sm leading-relaxed text-ink-primej">
                Ramesh is a 54-year-old male with a 6-year history of{' '}
                <strong>hypertension</strong> and 4-year history of{' '}
                <strong>Type 2 diabetes</strong>. Both conditions have shown{' '}
                <strong>suboptimal control</strong> over the past 3 visits — BP
                trending upward (now 138/86), and HbA1c at 7.8%. He's been on a
                stable regimen of Metformin 500mg BD and Telmisartan 40mg OD.
                Recent lab work (12 May) shows elevated LDL (142) and
                triglycerides (186) suggesting need to intensify lipid
                management. No acute complaints reported. He last visited 2
                weeks ago for routine follow-up; reported good medication
                adherence.
              </p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-ink-tertiary">
                <span>
                  Generated from 8 consultations · 3 lab reports · medication
                  history
                </span>
                <StatusBadge tone="success" size="sm">
                  Confidence: High
                </StatusBadge>
              </div>
            </div>
          </Card>

          {/* Detailed sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <SectionTitle
                title={
                <span className="flex items-center gap-1.5">
                    <ActivityIcon className="w-3.5 h-3.5 text-ink-secondary" />
                    Active problems
                  </span>
                } />
              
              <ul className="space-y-2.5 text-sm">
                {[
                {
                  name: 'Essential hypertension (I10)',
                  since: '2020',
                  status: 'Suboptimal'
                },
                {
                  name: 'Type 2 diabetes mellitus (E11.9)',
                  since: '2022',
                  status: 'Suboptimal'
                },
                {
                  name: 'Dyslipidemia (E78.5)',
                  since: '2025',
                  status: 'New'
                }].
                map((p, i) =>
                <li
                  key={i}
                  className="flex items-start justify-between gap-2 py-1.5 border-b border-line dark:border-line-dark last:border-0">
                  
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-ink-tertiary">
                        Since <MonoNumber size="xs">{p.since}</MonoNumber>
                      </div>
                    </div>
                    <StatusBadge
                    tone={p.status === 'New' ? 'info' : 'warning'}
                    size="sm">
                    
                      {p.status}
                    </StatusBadge>
                  </li>
                )}
              </ul>
            </Card>

            <Card>
              <SectionTitle
                title={
                <span className="flex items-center gap-1.5">
                    <PillIcon className="w-3.5 h-3.5 text-ink-secondary" />
                    Current medications
                  </span>
                } />
              
              <ul className="space-y-2 text-sm">
                {[
                {
                  name: 'Metformin 500mg',
                  freq: 'BD',
                  dur: 'Ongoing · 4y'
                },
                {
                  name: 'Telmisartan 40mg',
                  freq: 'OD',
                  dur: 'Ongoing · 6y'
                },
                {
                  name: 'Atorvastatin 20mg',
                  freq: 'HS',
                  dur: 'Started 2 wks ago'
                }].
                map((m, i) =>
                <li
                  key={i}
                  className="flex items-center justify-between py-1.5 border-b border-line dark:border-line-dark last:border-0">
                  
                    <div>
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-ink-tertiary">{m.dur}</div>
                    </div>
                    <MonoNumber size="sm">{m.freq}</MonoNumber>
                  </li>
                )}
              </ul>
            </Card>

            <Card>
              <SectionTitle
                title={
                <span className="flex items-center gap-1.5">
                    <FlaskConicalIcon className="w-3.5 h-3.5 text-ink-secondary" />
                    Recent lab abnormalities
                  </span>
                } />
              
              <ul className="space-y-2 text-sm">
                {[
                {
                  name: 'HbA1c',
                  value: '7.8 %',
                  range: '< 5.7',
                  flag: '↑'
                },
                {
                  name: 'FBS',
                  value: '142 mg/dL',
                  range: '70–100',
                  flag: '↑'
                },
                {
                  name: 'LDL',
                  value: '142 mg/dL',
                  range: '< 100',
                  flag: '↑'
                },
                {
                  name: 'HDL',
                  value: '38 mg/dL',
                  range: '> 40',
                  flag: '↓'
                }].
                map((l, i) =>
                <li
                  key={i}
                  className="flex items-center justify-between py-1.5 border-b border-line dark:border-line-dark last:border-0">
                  
                    <div className="text-sm">{l.name}</div>
                    <div className="flex items-center gap-2">
                      <MonoNumber
                      size="sm"
                      weight="medium"
                      className="text-warning">
                      
                        {l.value}
                      </MonoNumber>
                      <span className="text-warning font-mono text-xs">
                        {l.flag}
                      </span>
                    </div>
                  </li>
                )}
              </ul>
            </Card>

            <Card>
              <SectionTitle
                title={
                <span className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-ink-secondary" />
                    Recent visits
                  </span>
                } />
              
              <ul className="space-y-2.5 text-sm">
                {[
                {
                  date: '2026-05-08',
                  dr: 'Dr. Anjali Menon',
                  reason: 'HTN follow-up'
                },
                {
                  date: '2026-04-21',
                  dr: 'Dr. Anjali Menon',
                  reason: 'Diabetic review'
                },
                {
                  date: '2026-03-14',
                  dr: 'Dr. Rahul Verma',
                  reason: 'Cardiac evaluation'
                }].
                map((v, i) =>
                <li
                  key={i}
                  className="flex items-start justify-between gap-2 py-1.5 border-b border-line dark:border-line-dark last:border-0">
                  
                    <div>
                      <div className="font-medium">{v.reason}</div>
                      <div className="text-xs text-ink-tertiary">{v.dr}</div>
                    </div>
                    <MonoNumber size="xs" className="text-ink-tertiary">
                      {v.date}
                    </MonoNumber>
                  </li>
                )}
              </ul>
            </Card>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Card className="border-warning/30 bg-warning-soft/40">
            <div className="flex items-start gap-2">
              <ShieldAlertIcon className="w-4 h-4 text-warning mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">Risk highlights</p>
                <ul className="mt-2 space-y-1.5 text-xs text-ink-primary leading-relaxed">
                  <li>
                    • ASCVD 10-yr risk: <strong>moderate</strong>
                  </li>
                  <li>
                    • Microalbuminuria last checked 8 months ago — consider
                    repeat
                  </li>
                  <li>• No retinal exam on record for 2 years</li>
                  <li>• Smoking status not documented</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Suggested follow-up questions" />
            <ul className="space-y-2 text-xs">
              {[
              'Any home BP readings since last visit?',
              'Adherence to evening Telmisartan dose?',
              'Diet changes since added Atorvastatin?',
              'Any new symptoms — vision changes, foot numbness?',
              'When was last fundus exam?'].
              map((q, i) =>
              <li
                key={i}
                className="flex items-start gap-2 p-2 rounded-md bg-subtle/50 dark:bg-subtle-dark/50">
                
                  <SparklesIcon className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                  <span className="text-ink-primary dark:text-ink-primary-dark">
                    {q}
                  </span>
                </li>
              )}
            </ul>
          </Card>

          <Card>
            <SectionTitle
              title={
              <span className="flex items-center gap-1.5">
                  <BanknoteIcon className="w-3.5 h-3.5 text-ink-secondary" />
                  Outstanding
                </span>
              } />
            
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-ink-secondary">Pending balance</span>
                <MoneyText
                  amount={1240}
                  size="sm"
                  weight="semibold"
                  className="text-warning" />
                
              </div>
              <p className="text-xs text-ink-tertiary">
                From INV-2026-04812 · 4 days ago
              </p>
              <Button size="sm" variant="secondary" fullWidth className="mt-3">
                View invoice
              </Button>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Pending tasks" />
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center justify-between">
                <span>Annual eye check</span>
                <StatusBadge tone="warning" size="sm">
                  Overdue
                </StatusBadge>
              </li>
              <li className="flex items-center justify-between">
                <span>Repeat HbA1c</span>
                <StatusBadge tone="info" size="sm">
                  In 8 wks
                </StatusBadge>
              </li>
              <li className="flex items-center justify-between">
                <span>Flu vaccine</span>
                <StatusBadge tone="neutral" size="sm">
                  Due
                </StatusBadge>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>);

}