import React, { useState } from 'react';
import {
  ShieldCheckIcon,
  LockIcon,
  SmartphoneIcon,
  KeyIcon,
  ClockIcon,
  MapPinIcon,
  DatabaseIcon,
  FileTextIcon,
  AlertTriangleIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MonoNumber } from '@/components/ui/MonoNumber';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Select, Input } from '@/components/ui/Input';
function Toggle({ defaultChecked = false }: {defaultChecked?: boolean;}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      onClick={() => setOn((o) => !o)}
      className={`w-9 h-5 rounded-full transition-colors relative ${on ? 'bg-accent' : 'bg-line dark:bg-line-dark'}`}>
      
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-soft transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
      
    </button>);

}
function Row({
  icon: Icon,
  title,
  desc,
  action





}: {icon: any;title: string;desc: string;action?: React.ReactNode;}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-line dark:border-line-dark last:border-0">
      <div className="w-9 h-9 rounded-lg bg-subtle dark:bg-subtle-dark text-ink-secondary flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-ink-secondary mt-0.5">{desc}</p>
      </div>
      <div className="shrink-0">{action}</div>
    </div>);

}
export function Security() {
  return (
    <div>
      <PageHeader
        title="Security"
        description="Multi-factor authentication, session policies, device management, and data protection."
        breadcrumbs={[
        {
          label: 'Settings'
        },
        {
          label: 'Security'
        }]
        }
        actions={<Button variant="primary">Save changes</Button>} />
      

      {/* Security posture summary */}
      <Card className="mb-4 bg-success-soft/30 border-success/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-success text-white flex items-center justify-center shrink-0">
            <ShieldCheckIcon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Security posture: Strong</p>
            <p className="text-xs text-ink-secondary mt-0.5">
              MFA enabled · Strong password policy · Daily backups · Audit
              retention 7 years
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="text-center">
              <MonoNumber size="lg" weight="semibold" className="text-success">
                94
              </MonoNumber>
              <div className="text-ink-tertiary">/ 100</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle title="Authentication" />
          <Row
            icon={SmartphoneIcon}
            title="Multi-factor authentication"
            desc="Require MFA for all admin and doctor accounts."
            action={<Toggle defaultChecked />} />
          
          <Row
            icon={KeyIcon}
            title="Password policy"
            desc="Min 12 characters, 1 number, 1 symbol. Rotate every 90 days."
            action={
            <StatusBadge tone="success" size="sm">
                Strict
              </StatusBadge>
            } />
          
          <Row
            icon={ClockIcon}
            title="Session timeout"
            desc="Auto sign-out after inactivity."
            action={
            <Select className="w-28 h-8 text-xs">
                <option>15 min</option>
                <option>30 min</option>
                <option>1 hour</option>
              </Select>
            } />
          
          <Row
            icon={LockIcon}
            title="Login attempts"
            desc="Lock account after failed attempts."
            action={
            <Input
              mono
              className="w-16 h-8 text-xs text-right"
              defaultValue="5" />

            } />
          
        </Card>

        <Card>
          <SectionTitle title="Device & access" />
          <Row
            icon={SmartphoneIcon}
            title="Trusted devices"
            desc="Allow users to mark devices as trusted to skip MFA."
            action={<Toggle defaultChecked />} />
          
          <Row
            icon={MapPinIcon}
            title="IP allow-list"
            desc="Restrict admin access to specific IPs or ranges."
            action={<Toggle />} />
          
          <Row
            icon={LockIcon}
            title="Device fingerprinting"
            desc="Detect and flag access from unusual devices."
            action={<Toggle defaultChecked />} />
          
          <Row
            icon={ClockIcon}
            title="Out-of-hours alerts"
            desc="Notify on access outside working hours (8 PM–7 AM)."
            action={<Toggle defaultChecked />} />
          
        </Card>

        <Card>
          <SectionTitle title="Data protection" />
          <Row
            icon={DatabaseIcon}
            title="Encryption at rest"
            desc="AES-256 on all patient records and documents."
            action={
            <StatusBadge tone="success" dot size="sm">
                Active
              </StatusBadge>
            } />
          
          <Row
            icon={DatabaseIcon}
            title="Encryption in transit"
            desc="TLS 1.3 enforced for all connections."
            action={
            <StatusBadge tone="success" dot size="sm">
                Active
              </StatusBadge>
            } />
          
          <Row
            icon={FileTextIcon}
            title="Audit log retention"
            desc="How long to keep audit trail records."
            action={
            <Select className="w-28 h-8 text-xs">
                <option>5 years</option>
                <option>7 years</option>
                <option>10 years</option>
              </Select>
            } />
          
          <Row
            icon={DatabaseIcon}
            title="Daily encrypted backup"
            desc="Last: today at 02:00 IST · Status: success"
            action={
            <Button size="sm" variant="ghost">
                Configure
              </Button>
            } />
          
        </Card>

        <Card>
          <SectionTitle
            title="Recent security events"
            action={
            <Button size="sm" variant="ghost">
                View all →
              </Button>
            } />
          
          <ul className="space-y-3">
            {[
            {
              t: '2026-05-12 09:12',
              e: 'Admin export of revenue report',
              who: 'Dr. Anjali Menon',
              sev: 'info'
            },
            {
              t: '2026-05-11 19:42',
              e: 'Permission change · Receptionist role',
              who: 'Dr. Anjali Menon',
              sev: 'warning'
            },
            {
              t: '2026-05-11 14:18',
              e: 'Failed login attempts (×3) — Manoj P.',
              who: 'system',
              sev: 'warning'
            },
            {
              t: '2026-05-10 08:42',
              e: 'Refund approved · ₹1,200',
              who: 'Sunil K.',
              sev: 'info'
            },
            {
              t: '2026-05-09 23:14',
              e: 'After-hours access · Lab',
              who: 'Anu V.',
              sev: 'info'
            }].
            map((ev, i) =>
            <li key={i} className="flex items-start gap-3 py-1">
                <span
                className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${ev.sev === 'warning' ? 'bg-warning' : 'bg-info'}`} />
              
                <div className="flex-1 min-w-0">
                  <div className="text-sm">{ev.e}</div>
                  <div className="text-[10px] text-ink-tertiary mt-0.5">
                    {ev.who} · <MonoNumber size="xs">{ev.t}</MonoNumber>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </Card>

        <Card className="lg:col-span-2 border-warning/20 bg-warning-soft/30">
          <div className="flex items-start gap-3">
            <AlertTriangleIcon className="w-4 h-4 text-warning mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Compliance reminders</p>
              <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-ink-primary">
                <li>• DPDP Act 2023 consent tracking enabled</li>
                <li>• HIPAA-style audit log preserved 7 years</li>
                <li>• Annual security review due: 2026-08</li>
                <li>• Last penetration test: 2026-02-14</li>
                <li>• Data residency: Mumbai (ap-south-1)</li>
                <li>• ABDM consent framework: ready</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>);

}