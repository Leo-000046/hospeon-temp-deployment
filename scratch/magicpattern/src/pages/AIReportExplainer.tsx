import React from 'react';
import {
  SparklesIcon,
  UploadIcon,
  SendIcon,
  CopyIcon,
  LanguagesIcon,
  ShieldAlertIcon,
  FlaskConicalIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button, IconButton } from '../components/primitives/Button';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { StatusBadge } from '../components/primitives/StatusBadge';
export function AIReportExplainer() {
  return (
    <div>
      <PageHeader
        title="AI report explainer"
        description="Translate complex lab and imaging reports into doctor-summary and patient-friendly explanations."
        breadcrumbs={[
        {
          label: 'AI Assistant'
        },
        {
          label: 'Report explainer'
        }]
        }
        meta={
        <StatusBadge tone="warning" dot>
            AI Draft · Doctor must approve before sharing with patient
          </StatusBadge>
        }
        actions={
        <>
            <Button variant="secondary" icon={<UploadIcon />}>
              Upload PDF
            </Button>
            <Button variant="secondary" icon={<LanguagesIcon />}>
              Translate
            </Button>
          </>
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: original report */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <FlaskConicalIcon className="w-3.5 h-3.5 text-ink-secondary" />
                Original report
              </h3>
              <p className="text-xs text-ink-tertiary">
                LAB-2026-1243 · Ramesh Kumar ·{' '}
                <MonoNumber size="xs">2026-05-12</MonoNumber>
              </p>
            </div>
            <StatusBadge tone="neutral" size="sm">
              Source
            </StatusBadge>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-ink-tertiary mb-2">
                Glucose Panel
              </h4>
              <table className="w-full text-xs">
                <thead className="text-ink-tertiary">
                  <tr className="border-b border-line dark:border-line-dark">
                    <th className="text-left py-1.5 font-medium">Test</th>
                    <th className="text-right py-1.5 font-medium">Result</th>
                    <th className="text-right py-1.5 font-medium">Reference</th>
                    <th className="text-right py-1.5 font-medium">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                  ['Fasting Blood Sugar', '142', '70–100', 'H'],
                  ['Post-prandial BS', '198', '< 140', 'H'],
                  ['HbA1c', '7.8%', '< 5.7', 'H']].
                  map((r, i) =>
                  <tr
                    key={i}
                    className="border-b border-line dark:border-line-dark last:border-0">
                    
                      <td className="py-2">{r[0]}</td>
                      <td className="py-2 text-right">
                        <MonoNumber
                        size="xs"
                        weight="medium"
                        className="text-warning">
                        
                          {r[1]}
                        </MonoNumber>
                      </td>
                      <td className="py-2 text-right">
                        <MonoNumber size="xs" className="text-ink-tertiary">
                          {r[2]}
                        </MonoNumber>
                      </td>
                      <td className="py-2 text-right text-warning text-xs">
                        {r[3]}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-ink-tertiary mb-2">
                Lipid Profile
              </h4>
              <table className="w-full text-xs">
                <thead className="text-ink-tertiary">
                  <tr className="border-b border-line dark:border-line-dark">
                    <th className="text-left py-1.5 font-medium">Test</th>
                    <th className="text-right py-1.5 font-medium">Result</th>
                    <th className="text-right py-1.5 font-medium">Reference</th>
                    <th className="text-right py-1.5 font-medium">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                  ['Total Cholesterol', '218', '< 200', 'H'],
                  ['HDL', '38', '> 40', 'L'],
                  ['LDL', '142', '< 100', 'H'],
                  ['Triglycerides', '186', '< 150', 'H']].
                  map((r, i) =>
                  <tr
                    key={i}
                    className="border-b border-line dark:border-line-dark last:border-0">
                    
                      <td className="py-2">{r[0]}</td>
                      <td className="py-2 text-right">
                        <MonoNumber
                        size="xs"
                        weight="medium"
                        className="text-warning">
                        
                          {r[1]}
                        </MonoNumber>
                      </td>
                      <td className="py-2 text-right">
                        <MonoNumber size="xs" className="text-ink-tertiary">
                          {r[2]}
                        </MonoNumber>
                      </td>
                      <td className="py-2 text-right text-warning text-xs">
                        {r[3]}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Right: AI explanations */}
        <div className="space-y-4">
          <Card className="border-accent/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <SparklesIcon className="w-3.5 h-3.5 text-accent" />
                For doctor — clinical summary
              </h3>
              <IconButton size="sm" variant="ghost">
                <CopyIcon />
              </IconButton>
            </div>
            <div className="text-sm leading-relaxed space-y-2">
              <p>
                <strong>Glucose:</strong> Poorly controlled T2DM — HbA1c 7.8%
                (target {'<'} 7%), FBS 142, PPBS 198. Trending upward from last
                HbA1c (7.4%, 3 months ago).
              </p>
              <p>
                <strong>Lipids:</strong> Mixed dyslipidemia — elevated LDL,
                total cholesterol and triglycerides; low HDL. ASCVD risk
                moderate-to-high in diabetic patient.
              </p>
              <p>
                <strong>Recommendation:</strong> Intensify glycemic control —
                consider adding DPP4i or SGLT2i. Initiate or up-titrate statin
                to LDL target {'<'} 70 mg/dL. Repeat lipids in 6 weeks, HbA1c in
                3 months. Reinforce diet and exercise counselling.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-ink-tertiary">
              <span>Based on ADA 2025 + ESC dyslipidemia guidelines</span>
              <StatusBadge tone="success" size="sm">
                High confidence
              </StatusBadge>
            </div>
          </Card>

          <Card className="border-success/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <SparklesIcon className="w-3.5 h-3.5 text-success" />
                For patient — plain language
              </h3>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" icon={<LanguagesIcon />}>
                  മലയാളം
                </Button>
                <IconButton size="sm" variant="ghost">
                  <CopyIcon />
                </IconButton>
              </div>
            </div>
            <div className="text-sm leading-relaxed space-y-2">
              <p>
                Hello Ramesh, here's a simple explanation of your recent blood
                test:
              </p>
              <p>
                Your <strong>blood sugar</strong> is higher than it should be.
                Your HbA1c (which shows your average sugar over 3 months) is{' '}
                <strong>7.8%</strong>, and we'd like to keep it below 7%. This
                means we need to work together to bring your sugar down a little
                — through diet, walking, and possibly adjusting your medicines.
              </p>
              <p>
                Your <strong>cholesterol</strong> levels are also slightly
                higher than ideal. The "bad cholesterol" (LDL) is higher than we
                want, and the "good cholesterol" (HDL) is a little low. Dr.
                Anjali will talk to you about whether to start or adjust a
                cholesterol tablet.
              </p>
              <p className="text-xs text-ink-secondary italic">
                None of these are emergencies — but acting now will help protect
                your heart and kidneys long-term. Please continue your current
                medicines and come for your next visit in 2 weeks.
              </p>
            </div>
            <StatusBadge tone="warning" size="sm" className="mt-3">
              Needs doctor approval before sending
            </StatusBadge>
          </Card>

          <div className="flex items-center gap-2">
            <Button variant="ghost" className="flex-1">
              Reject
            </Button>
            <Button variant="secondary" className="flex-1" icon={<SendIcon />}>
              Edit & send
            </Button>
            <Button variant="primary" className="flex-1">
              Approve & send to patient
            </Button>
          </div>

          <Card className="bg-warning-soft/30 border-warning/20">
            <div className="flex gap-2 items-start">
              <ShieldAlertIcon className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <p className="text-xs text-ink-primary leading-relaxed">
                AI explanations are drafts based on the report alone — they
                don't account for the patient's full context. Always verify
                against your clinical judgement before approving for the
                patient.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>);

}