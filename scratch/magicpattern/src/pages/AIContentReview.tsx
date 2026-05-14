import React, { useState } from 'react';
import {
  CheckIcon,
  XIcon,
  EditIcon,
  AlertTriangleIcon,
  SparklesIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { MetricCard } from '../components/primitives/MetricCard';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { AutoStatusBadge } from '../components/primitives/StatusBadge';
import { FilterChip } from '../components/primitives/FilterBar';
import { cn } from '../lib/cn';
const filters = [
'All',
'Discharge summaries',
'Lab explainers',
'Patient summaries',
'Templates',
'Prescriptions'];

const items = [
{
  id: 1,
  type: 'Discharge summary',
  context: 'Vikram Shah · IPD-2026-00428',
  generated: '12 May · 10:42',
  model: 'Hospeon-Med v2.1',
  preview:
  'Mr. Shah was admitted on 09 May 2026 with NSTEMI and managed conservatively with dual antiplatelet therapy…',
  status: 'Pending'
},
{
  id: 2,
  type: 'Lab explainer',
  context: 'Anjali Kapoor · LAB-2026-04812',
  generated: '12 May · 09:48',
  model: 'Hospeon-Med v2.1',
  preview:
  'Your cholesterol levels are slightly above the target range. The HDL (good cholesterol) is on the lower side…',
  status: 'Pending'
},
{
  id: 3,
  type: 'Patient summary',
  context: 'Rohan Mehta · P-100501',
  generated: '12 May · 09:12',
  model: 'Hospeon-Med v2.1',
  preview:
  '38-year-old male with 2-year history of essential hypertension, currently on Telmisartan 40mg…',
  status: 'Pending'
},
{
  id: 4,
  type: 'Discharge summary',
  context: 'Kavita Iyer · IPD-2026-00421',
  generated: '11 May · 18:24',
  model: 'Hospeon-Med v2.1',
  preview: 'Mrs. Iyer was admitted following coronary angiography…',
  status: 'Approved'
},
{
  id: 5,
  type: 'Lab explainer',
  context: 'Suresh Pillai · LAB-2026-04788',
  generated: '11 May · 16:02',
  model: 'Hospeon-Med v2.1',
  preview: 'Vitamin D level is low. This is a common finding…',
  status: 'Approved'
},
{
  id: 6,
  type: 'Template',
  context: 'Prescription · Diabetes follow-up',
  generated: '11 May · 11:32',
  model: 'Hospeon-Med v2.1',
  preview:
  'Continue Metformin 500mg BD; add Glimepiride 1mg OD if HbA1c >7.5%…',
  status: 'Rejected'
}];

export function AIContentReview() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const filtered = items.filter(
    (i) =>
    activeFilter === 'All' ||
    i.type.
    toLowerCase().
    includes(
      activeFilter.
      toLowerCase().
      replace(' summaries', '').
      replace(' explainers', '').
      replace('s', '')
    )
  );
  const selected = items.find((i) => i.id === selectedId);
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI content review"
        description="Human approval queue for AI-generated clinical content" />
      

      <div className="rounded-2xl bg-warning-soft/40 border border-warning-soft p-4 flex items-start gap-3">
        <AlertTriangleIcon className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <div className="text-sm text-ink-secondary dark:text-ink-secondary-dark">
          <span className="font-semibold text-ink-primary dark:text-ink-primary-dark">
            All AI-generated clinical content must be reviewed by a qualified
            clinician before being saved to the patient record or shared with
            the patient.
          </span>{' '}
          AI may make errors. You are responsible for clinical accuracy.
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Pending review"
          value={<MonoNumber>12</MonoNumber>}
          hint="3 over 1 hour old" />
        
        <MetricCard
          label="Approved today"
          value={<MonoNumber>8</MonoNumber>}
          hint="By 4 reviewers" />
        
        <MetricCard
          label="Rejected today"
          value={<MonoNumber>1</MonoNumber>}
          hint="With reason logged" />
        
        <MetricCard
          label="Avg. review time"
          value={<MonoNumber>1m 24s</MonoNumber>}
          hint="Last 30 days" />
        
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) =>
        <FilterChip
          key={f}
          active={activeFilter === f}
          onClick={() => setActiveFilter(f)}>
          
            {f}
          </FilterChip>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="none">
          <div className="px-5 pt-5">
            <SectionTitle
              title="Queue"
              description={`${filtered.length} items`} />
            
          </div>
          <div className="divide-y divide-line dark:divide-line-dark mt-3 max-h-[640px] overflow-y-auto">
            {filtered.map((item) =>
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={cn(
                'w-full text-left px-5 py-4 hover:bg-subtle/40 dark:hover:bg-subtle-dark/40 transition-colors',
                selectedId === item.id && 'bg-accent-soft/40'
              )}>
              
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-subtle dark:bg-subtle-dark text-ink-secondary font-semibold">
                    {item.type}
                  </span>
                  <AutoStatusBadge status={item.status.toLowerCase()} />
                </div>
                <div className="text-sm font-medium text-ink-primary dark:text-ink-primary-dark mb-0.5">
                  {item.context}
                </div>
                <div className="text-xs text-ink-secondary dark:text-ink-secondary-dark line-clamp-2 mb-1.5">
                  {item.preview}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-ink-tertiary">
                  <SparklesIcon className="w-3 h-3" />
                  <span>{item.model}</span>
                  <span>·</span>
                  <MonoNumber>{item.generated}</MonoNumber>
                </div>
              </button>
            )}
          </div>
        </Card>

        {/* Detail */}
        {selected ?
        <div className="space-y-4">
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-subtle dark:bg-subtle-dark text-ink-secondary font-semibold">
                    {selected.type}
                  </span>
                  <h2 className="text-lg font-semibold text-ink-primary dark:text-ink-primary-dark mt-2">
                    {selected.context}
                  </h2>
                  <div className="text-xs text-ink-tertiary mt-1 flex items-center gap-2">
                    <SparklesIcon className="w-3 h-3" />
                    <span>{selected.model}</span> ·{' '}
                    <MonoNumber>{selected.generated}</MonoNumber>
                  </div>
                </div>
                <AutoStatusBadge status={selected.status.toLowerCase()} />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-tertiary mb-2">
                    Source · clinical inputs
                  </div>
                  <div className="rounded-xl bg-subtle/40 dark:bg-subtle-dark/40 p-4 text-sm text-ink-secondary dark:text-ink-secondary-dark space-y-1.5">
                    <div>Diagnosis: NSTEMI, T2DM</div>
                    <div>Procedures: Coronary angiography (10 May)</div>
                    <div>
                      Medications at discharge: Aspirin 75mg OD, Atorvastatin
                      40mg HS, Metoprolol 25mg BD, Metformin 500mg BD
                    </div>
                    <div>LOS: 3 days · Stable at discharge · Vitals normal</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-tertiary mb-2">
                    AI output · {selected.type.toLowerCase()}
                  </div>
                  <div className="rounded-xl border border-accent-soft bg-accent-soft/30 p-4 text-sm text-ink-primary dark:text-ink-primary-dark leading-relaxed space-y-3">
                    <p>
                      Mr. Shah was admitted on 09 May 2026 with NSTEMI and
                      managed conservatively with dual antiplatelet therapy,
                      beta-blocker, and high-dose statin.
                    </p>
                    <p>
                      Coronary angiography on 10 May revealed single-vessel
                      disease (LAD 70%) — managed medically. Patient remained
                      hemodynamically stable throughout the stay.
                    </p>
                    <p>
                      At discharge, vitals were stable (BP 124/78, HR 68, SpO₂
                      98%). Patient was advised to continue medications, follow
                      a low-sodium diet, and return for OPD review in 7 days.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle title="Reviewer actions" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                <Button variant="primary" className="!py-2.5 justify-center">
                  <CheckIcon className="w-4 h-4" />
                  Approve
                </Button>
                <Button variant="secondary" className="!py-2.5 justify-center">
                  <EditIcon className="w-4 h-4" />
                  Edit & approve
                </Button>
                <Button variant="danger" className="!py-2.5 justify-center">
                  <XIcon className="w-4 h-4" />
                  Reject
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <label className="text-xs text-ink-tertiary mb-1 block">
                    Reviewer
                  </label>
                  <div className="text-ink-primary dark:text-ink-primary-dark">
                    Dr. Anjali Rao · Cardiology
                  </div>
                </div>
                <div>
                  <label className="text-xs text-ink-tertiary mb-1 block">
                    Notes (saved with audit log)
                  </label>
                  <textarea
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-line dark:border-line-dark bg-canvas dark:bg-canvas-dark text-sm"
                  placeholder="Optional notes…" />
                
                </div>
              </div>
            </Card>
          </div> :

        <Card>
            <div className="text-sm text-ink-tertiary py-12 text-center">
              Select an item to review
            </div>
          </Card>
        }
      </div>
    </div>);

}