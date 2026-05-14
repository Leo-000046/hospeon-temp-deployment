import React, { useState } from 'react';
import {
  SparklesIcon,
  SendIcon,
  PaperclipIcon,
  UserIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  CopyIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button, IconButton } from '../components/primitives/Button';
import { Input } from '../components/primitives/Input';
import { StatusBadge } from '../components/primitives/StatusBadge';
import { MonoNumber } from '../components/primitives/MonoNumber';
const chips = [
'Summarize this patient',
'Draft SOAP note',
'Explain this prescription',
'Create follow-up message',
'Summarize lab report',
'Suggest differential diagnosis'];

export function AIClinical() {
  const [messages] = useState([
  {
    role: 'user',
    text: 'Summarize patient P-100482'
  },
  {
    role: 'ai',
    text: `Ramesh Kumar (P-100482, 54M) — Known hypertension and T2 Diabetes. Last visit 2026-05-08 for routine follow-up.\n\nRecent findings:\n• BP trending up over last 3 visits (currently 138/86)\n• HbA1c 7.8% (target < 7%)\n• LDL 142, suboptimal lipid control\n• BMI 25.7 (overweight)\n\nActive medications: Metformin 500mg BD, Telmisartan 40mg OD, Atorvastatin 20mg HS\n\nNo allergies to current regime. Penicillin allergy on file.`,
    confidence: 'High',
    sources: [
    'Last 3 consultations',
    'Lab order LAB-2026-1243',
    'Medication history']

  }]
  );
  return (
    <div>
      <PageHeader
        title="AI Clinical Assistant"
        description="Ask anything about a patient. AI answers are drafts — verify before clinical use."
        breadcrumbs={[
        {
          label: 'AI Assistant'
        },
        {
          label: 'Clinical Assistant'
        }]
        }
        meta={
        <StatusBadge tone="warning" dot>
            Human approval required for clinical actions
          </StatusBadge>
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
        <div className="space-y-4">
          <Card>
            <SectionTitle title="Patient context" />
            <Input placeholder="Search patient…" icon={<UserIcon />} />
            <div className="mt-3 p-3 rounded-lg bg-subtle/60 dark:bg-subtle-dark/60">
              <div className="text-xs font-semibold">Ramesh Kumar</div>
              <MonoNumber size="xs" className="text-ink-tertiary">
                P-100482
              </MonoNumber>
              <div className="text-xs text-ink-secondary mt-1">
                54M · HTN, T2DM
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Recent chats" />
            <ul className="space-y-1.5 text-sm">
              {[
              'Patient P-100482 summary',
              'Differential for chest pain',
              'Discharge summary draft',
              'Follow-up message draft'].
              map((c) =>
              <li key={c}>
                  <button className="w-full text-left px-2 py-1.5 text-xs text-ink-secondary hover:bg-subtle dark:hover:bg-subtle-dark rounded-md truncate">
                    {c}
                  </button>
                </li>
              )}
            </ul>
          </Card>
        </div>

        <Card className="flex flex-col" padded={false}>
          <div className="flex-1 p-5 space-y-4 max-h-[640px] overflow-y-auto">
            {messages.map((m, i) =>
            <div
              key={i}
              className={
              m.role === 'user' ? 'flex justify-end' : 'flex justify-start'
              }>
              
                <div
                className={
                m.role === 'user' ?
                'max-w-[80%] bg-accent text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm' :
                'max-w-[85%]'
                }>
                
                  {m.role === 'ai' &&
                <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-accent-soft text-accent flex items-center justify-center">
                        <SparklesIcon className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-semibold">
                        AI Clinical Assistant
                      </span>
                      <StatusBadge tone="warning" size="sm">
                        Draft
                      </StatusBadge>
                    </div>
                }
                  <div
                  className={
                  m.role === 'user' ?
                  'whitespace-pre-wrap' :
                  'bg-surface dark:bg-surface-dark border border-line dark:border-line-dark rounded-2xl rounded-tl-sm p-4 text-sm text-ink-primary dark:text-ink-primary-dark whitespace-pre-wrap leading-relaxed'
                  }>
                  
                    {m.text}
                  </div>
                  {m.role === 'ai' &&
                <div className="mt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-ink-tertiary">Confidence:</span>
                        <StatusBadge tone="success" size="sm">
                          {(m as any).confidence}
                        </StatusBadge>
                        <span className="text-ink-tertiary">·</span>
                        <span className="text-ink-tertiary">
                          {(m as any).sources.length} sources
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <IconButton size="sm" variant="ghost">
                          <CopyIcon />
                        </IconButton>
                        <IconButton size="sm" variant="ghost">
                          <ThumbsUpIcon />
                        </IconButton>
                        <IconButton size="sm" variant="ghost">
                          <ThumbsDownIcon />
                        </IconButton>
                        <IconButton size="sm" variant="ghost">
                          <RefreshCwIcon />
                        </IconButton>
                      </div>
                    </div>
                }
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-line dark:border-line-dark p-4">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {chips.map((c) =>
              <button
                key={c}
                className="px-2.5 py-1 text-xs rounded-full bg-subtle dark:bg-subtle-dark text-ink-secondary hover:bg-line dark:hover:bg-line-dark hover:text-ink-primary">
                
                  + {c}
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <IconButton variant="ghost">
                <PaperclipIcon />
              </IconButton>
              <Input
                placeholder="Ask anything about this patient or clinical workflow…"
                className="flex-1" />
              
              <Button variant="primary" icon={<SendIcon />}>
                Send
              </Button>
            </div>
            <p className="mt-2 text-[10px] text-ink-tertiary flex items-center gap-1">
              <AlertTriangleIcon className="w-3 h-3" />
              AI output is a draft. Never treat as final medical truth. Always
              verify before clinical action.
            </p>
          </div>
        </Card>
      </div>
    </div>);

}