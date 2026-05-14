import React, { useState } from 'react';
import {
  PlusIcon,
  FileTextIcon,
  MessageSquareIcon,
  MailIcon,
  PhoneIcon,
  EditIcon,
  CopyIcon,
  TrashIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/cn';
const groups = [
{
  id: 'prescription',
  label: 'Prescription',
  icon: FileTextIcon,
  count: 6
},
{
  id: 'invoice',
  label: 'Invoice',
  icon: FileTextIcon,
  count: 3
},
{
  id: 'lab',
  label: 'Lab report',
  icon: FileTextIcon,
  count: 4
},
{
  id: 'discharge',
  label: 'Discharge summary',
  icon: FileTextIcon,
  count: 2
},
{
  id: 'certificate',
  label: 'Medical certificate',
  icon: FileTextIcon,
  count: 5
},
{
  id: 'sms',
  label: 'SMS',
  icon: PhoneIcon,
  count: 8
},
{
  id: 'whatsapp',
  label: 'WhatsApp',
  icon: MessageSquareIcon,
  count: 8
},
{
  id: 'email',
  label: 'Email',
  icon: MailIcon,
  count: 6
}];

const templates = [
{
  id: 't1',
  name: 'Appointment confirmation',
  preview:
  'Hi {patient_name}, your appointment with {doctor_name} is confirmed for {appointment_date} at {appointment_time}. Token: {token}.',
  usage: 248,
  channels: ['WhatsApp', 'SMS']
},
{
  id: 't2',
  name: 'Appointment reminder (1 day before)',
  preview:
  'Reminder: Your appointment with {doctor_name} is tomorrow at {appointment_time}. Reply 1 to confirm, 2 to reschedule.',
  usage: 412,
  channels: ['WhatsApp']
},
{
  id: 't3',
  name: 'Prescription sent',
  preview:
  "Hi {patient_name}, your prescription from today's visit is attached. Total medicines: {med_count}.",
  usage: 184,
  channels: ['WhatsApp']
},
{
  id: 't4',
  name: 'Lab report ready',
  preview:
  'Hi {patient_name}, your lab report from {report_date} is ready. Click the link to view.',
  usage: 96,
  channels: ['WhatsApp', 'SMS']
},
{
  id: 't5',
  name: 'Payment pending',
  preview:
  'Dear {patient_name}, you have a pending balance of {amount} on invoice {invoice_id}. Pay online: {pay_link}.',
  usage: 142,
  channels: ['WhatsApp', 'SMS']
},
{
  id: 't6',
  name: 'Follow-up reminder',
  preview:
  'Hi {patient_name}, this is a friendly reminder for your follow-up with {doctor_name} on {followup_date}.',
  usage: 68,
  channels: ['WhatsApp']
}];

export function Templates() {
  const [selected, setSelected] = useState('whatsapp');
  return (
    <div>
      <PageHeader
        title="Templates"
        description="Manage prescription layouts, invoice formats, and patient communication templates."
        breadcrumbs={[
        {
          label: 'Settings'
        },
        {
          label: 'Templates'
        }]
        }
        actions={
        <Button variant="primary" icon={<PlusIcon />}>
            New template
          </Button>
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
        <Card padded>
          <SectionTitle title="Categories" />
          <ul className="space-y-0.5">
            {groups.map((g) => {
              const Icon = g.icon;
              return (
                <li key={g.id}>
                  <button
                    onClick={() => setSelected(g.id)}
                    className={cn(
                      'w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-sm',
                      selected === g.id ?
                      'bg-accent-soft text-accent font-medium' :
                      'text-ink-secondary hover:bg-subtle dark:hover:bg-subtle-dark'
                    )}>
                    
                    <span className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" />
                      {g.label}
                    </span>
                    <span className="text-xs font-mono">{g.count}</span>
                  </button>
                </li>);

            })}
          </ul>
        </Card>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {templates.map((t) =>
            <Card key={t.id} className="hover:shadow-soft transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-semibold">{t.name}</h3>
                  <div className="flex items-center gap-0.5">
                    <IconButton size="sm" variant="ghost">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="sm" variant="ghost">
                      <CopyIcon />
                    </IconButton>
                    <IconButton size="sm" variant="ghost">
                      <TrashIcon />
                    </IconButton>
                  </div>
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed line-clamp-3">
                  {t.preview}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-1">
                    {t.channels.map((c) =>
                  <StatusBadge key={c} tone="neutral" size="sm">
                        {c}
                      </StatusBadge>
                  )}
                  </div>
                  <span className="text-[10px] text-ink-tertiary">
                    Used <span className="font-mono">{t.usage}</span> times
                  </span>
                </div>
              </Card>
            )}
          </div>

          <Card>
            <SectionTitle
              title="Edit: Appointment reminder"
              description="Tokens enclosed in {} are auto-replaced at send time." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="Message body"
                rows={6}
                defaultValue="Reminder: Your appointment with {doctor_name} is tomorrow at {appointment_time}. Reply 1 to confirm, 2 to reschedule. — Hospeon Kochi" />
              
              <div>
                <p className="text-xs font-medium mb-2">Available tokens</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                  '{patient_name}',
                  '{doctor_name}',
                  '{appointment_date}',
                  '{appointment_time}',
                  '{token}',
                  '{branch_name}',
                  '{phone}',
                  '{amount}',
                  '{invoice_id}',
                  '{pay_link}'].
                  map((t) =>
                  <button
                    key={t}
                    className="px-2 py-1 text-[11px] font-mono rounded-md bg-subtle dark:bg-subtle-dark hover:bg-line dark:hover:bg-line-dark">
                    
                      {t}
                    </button>
                  )}
                </div>
                <p className="text-xs font-medium mt-4 mb-2">
                  Preview (real patient)
                </p>
                <div className="p-3 rounded-lg bg-accent-soft/50 text-sm">
                  Reminder: Your appointment with{' '}
                  <strong>Dr. Anjali Menon</strong> is tomorrow at{' '}
                  <strong>10:30</strong>. Reply 1 to confirm, 2 to reschedule. —
                  Hospeon Kochi
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              <Button variant="ghost">Discard</Button>
              <Button variant="secondary">Save & test send</Button>
              <Button variant="primary">Save template</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>);

}