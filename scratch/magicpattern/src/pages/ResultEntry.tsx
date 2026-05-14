import React, { useState } from 'react';
import { CheckCircle2Icon, AlertTriangleIcon, SparklesIcon } from 'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Input, Textarea } from '../components/primitives/Input';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { cn } from '../lib/cn';
interface Param {
  name: string;
  unit: string;
  rangeLow: number;
  rangeHigh: number;
  value?: string;
}
const panels: {
  name: string;
  params: Param[];
}[] = [
{
  name: 'Complete Blood Count (CBC)',
  params: [
  {
    name: 'Hemoglobin',
    unit: 'g/dL',
    rangeLow: 12,
    rangeHigh: 16,
    value: '10.2'
  },
  {
    name: 'WBC count',
    unit: '/µL',
    rangeLow: 4000,
    rangeHigh: 11000,
    value: '8200'
  },
  {
    name: 'Platelet count',
    unit: '/µL',
    rangeLow: 150000,
    rangeHigh: 450000,
    value: '218000'
  },
  {
    name: 'Hematocrit',
    unit: '%',
    rangeLow: 36,
    rangeHigh: 46,
    value: '32.4'
  }]

},
{
  name: 'Lipid Profile',
  params: [
  {
    name: 'Total Cholesterol',
    unit: 'mg/dL',
    rangeLow: 0,
    rangeHigh: 200,
    value: '224'
  },
  {
    name: 'LDL',
    unit: 'mg/dL',
    rangeLow: 0,
    rangeHigh: 100,
    value: '142'
  },
  {
    name: 'HDL',
    unit: 'mg/dL',
    rangeLow: 40,
    rangeHigh: 60,
    value: '38'
  },
  {
    name: 'Triglycerides',
    unit: 'mg/dL',
    rangeLow: 0,
    rangeHigh: 150,
    value: '184'
  }]

}];

function flag(p: Param): 'normal' | 'high' | 'low' | undefined {
  if (!p.value) return undefined;
  const n = parseFloat(p.value);
  if (isNaN(n)) return undefined;
  if (n < p.rangeLow) return 'low';
  if (n > p.rangeHigh) return 'high';
  return 'normal';
}
export function ResultEntry() {
  const [data, setData] = useState(panels);
  const update = (panelIdx: number, paramIdx: number, value: string) => {
    const next = [...data];
    next[panelIdx] = {
      ...next[panelIdx],
      params: next[panelIdx].params.map((p, i) =>
      i === paramIdx ?
      {
        ...p,
        value
      } :
      p
      )
    };
    setData(next);
  };
  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title="Enter lab results"
        description="LAB-2026-04891 · Rohan Mehta"
        breadcrumbs={[
        {
          label: 'Laboratory',
          to: '/dashboard/lab'
        },
        {
          label: 'Result entry'
        }]
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Header strip */}
          <Card>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-xs text-ink-tertiary uppercase tracking-wider mb-1">
                  Patient
                </div>
                <div className="text-ink-primary dark:text-ink-primary-dark font-medium">
                  Rohan Mehta
                </div>
                <MonoNumber className="text-xs text-ink-tertiary">
                  P-100501 · 38M
                </MonoNumber>
              </div>
              <div>
                <div className="text-xs text-ink-tertiary uppercase tracking-wider mb-1">
                  Order
                </div>
                <MonoNumber className="text-ink-primary dark:text-ink-primary-dark">
                  LAB-2026-04891
                </MonoNumber>
              </div>
              <div>
                <div className="text-xs text-ink-tertiary uppercase tracking-wider mb-1">
                  Collected
                </div>
                <MonoNumber className="text-ink-primary dark:text-ink-primary-dark">
                  12 May · 08:42
                </MonoNumber>
              </div>
              <div>
                <div className="text-xs text-ink-tertiary uppercase tracking-wider mb-1">
                  Requested by
                </div>
                <div className="text-ink-primary dark:text-ink-primary-dark">
                  Dr. Anjali Rao
                </div>
              </div>
            </div>
          </Card>

          {data.map((panel, pIdx) =>
          <Card key={panel.name} padding="none">
              <div className="px-5 pt-5">
                <SectionTitle title={panel.name} />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm mt-3">
                  <thead className="bg-subtle/40 dark:bg-subtle-dark/40">
                    <tr className="text-left text-xs uppercase tracking-wider text-ink-tertiary">
                      <th className="px-5 py-2.5">Parameter</th>
                      <th className="px-3 py-2.5 w-32">Result</th>
                      <th className="px-3 py-2.5 w-20">Unit</th>
                      <th className="px-3 py-2.5 w-32">Reference</th>
                      <th className="px-3 py-2.5 w-20 text-right">Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line dark:divide-line-dark">
                    {panel.params.map((p, i) => {
                    const f = flag(p);
                    const abnormal = f === 'high' || f === 'low';
                    return (
                      <tr
                        key={p.name}
                        className={cn(abnormal && 'bg-warning-soft/30')}>
                        
                          <td className="px-5 py-3 text-ink-primary dark:text-ink-primary-dark">
                            {p.name}
                          </td>
                          <td className="px-3 py-3">
                            <input
                            type="text"
                            value={p.value ?? ''}
                            onChange={(e) => update(pIdx, i, e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-line dark:border-line-dark bg-surface dark:bg-surface-dark text-ink-primary dark:text-ink-primary-dark text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent" />
                          
                          </td>
                          <td className="px-3 py-3 text-xs text-ink-tertiary">
                            {p.unit}
                          </td>
                          <td className="px-3 py-3">
                            <MonoNumber className="text-xs text-ink-tertiary">
                              {p.rangeLow}–{p.rangeHigh}
                            </MonoNumber>
                          </td>
                          <td className="px-3 py-3 text-right">
                            {f === 'high' &&
                          <span className="text-xs font-semibold text-warning">
                                HIGH ↑
                              </span>
                          }
                            {f === 'low' &&
                          <span className="text-xs font-semibold text-warning">
                                LOW ↓
                              </span>
                          }
                            {f === 'normal' &&
                          <span className="text-xs text-success">
                                Normal
                              </span>
                          }
                          </td>
                        </tr>);

                  })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          <Card>
            <SectionTitle title="Technician notes" />
            <Textarea
              rows={3}
              placeholder="Sample condition, repeat tests, deviations…" />
            
            <div className="mt-4 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-ink-secondary dark:text-ink-secondary-dark">
                <input type="checkbox" className="rounded" />
                Mark as ready for pathologist review
              </label>
              <span className="text-xs text-ink-tertiary">
                Entered by: Sneha Reddy · LT-014
              </span>
            </div>
          </Card>
        </div>

        {/* AI side panel */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-accent-soft/50 border border-accent-soft p-5">
            <div className="flex items-center gap-2 mb-3">
              <SparklesIcon className="w-4 h-4 text-accent" />
              <div className="text-sm font-semibold text-accent">
                AI verification
              </div>
              <span className="ml-auto text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-warning-soft text-warning font-semibold">
                Needs review
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-surface dark:bg-surface-dark p-3 border border-warning-soft">
                <div className="flex items-start gap-2">
                  <AlertTriangleIcon className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-ink-primary dark:text-ink-primary-dark">
                      Hemoglobin 10.2 g/dL — Low
                    </div>
                    <div className="text-xs text-ink-secondary dark:text-ink-secondary-dark mt-1">
                      Mild anemia. Patient's previous reading was 11.4 (3 months
                      ago) — trending downward.
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-surface dark:bg-surface-dark p-3 border border-warning-soft">
                <div className="flex items-start gap-2">
                  <AlertTriangleIcon className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-ink-primary dark:text-ink-primary-dark">
                      LDL 142 mg/dL — High
                    </div>
                    <div className="text-xs text-ink-secondary dark:text-ink-secondary-dark mt-1">
                      Above target for known CVD risk patient. Consider statin
                      review.
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-surface dark:bg-surface-dark p-3 border border-line dark:border-line-dark">
                <div className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <div className="text-xs text-ink-secondary dark:text-ink-secondary-dark">
                    Other parameters within reference range. No critical-value
                    alerts.
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[11px] text-ink-tertiary mt-3 leading-relaxed">
              AI suggestions are decision-support only. A qualified pathologist
              must verify and approve all results before reports are released.
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-surface dark:bg-surface-dark border-t border-line dark:border-line-dark px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 z-20">
        <Button variant="ghost" className="hidden sm:inline-flex">
          Cancel
        </Button>
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap sm:justify-end [&>*]:shrink-0">
          <Button variant="ghost" className="sm:hidden">
            Cancel
          </Button>
          <Button variant="secondary">Save draft</Button>
          <Button variant="primary">
            <CheckCircle2Icon className="w-4 h-4" />
            Submit for pathologist review
          </Button>
        </div>
      </div>
    </div>);

}