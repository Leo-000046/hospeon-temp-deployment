import React from 'react';
import {
  CheckCircle2Icon,
  CircleIcon,
  AlertTriangleIcon,
  ExternalLinkIcon,
  SettingsIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { StatusBadge } from '../components/primitives/StatusBadge';
import { MonoNumber } from '../components/primitives/MonoNumber';
interface Integration {
  name: string;
  category: string;
  desc: string;
  status: 'connected' | 'available' | 'attention';
  meta?: string;
  badge?: string;
  initials: string;
  color: string;
}
const integrations: Integration[] = [
{
  name: 'Razorpay',
  category: 'Payments',
  desc: 'Accept UPI, cards, netbanking, and wallet payments.',
  status: 'connected',
  meta: 'Linked · MID 9k4j2',
  initials: 'Rp',
  color: '#3F8E84'
},
{
  name: 'PhonePe Business',
  category: 'Payments',
  desc: 'Dynamic UPI QR for in-clinic collection.',
  status: 'connected',
  meta: 'Last settled: ₹32,400 · 2h ago',
  initials: 'Pp',
  color: '#5A7A8C'
},
{
  name: 'WhatsApp Business',
  category: 'Communication',
  desc: 'Appointment confirmations, reminders, and report delivery.',
  status: 'connected',
  meta: 'Approved · 8 templates',
  initials: 'Wa',
  color: '#4F8A5C'
},
{
  name: 'MSG91',
  category: 'Communication',
  desc: 'Transactional SMS for OTP and notifications.',
  status: 'connected',
  meta: 'Credits: 4,820',
  initials: 'Ms',
  color: '#B8893A'
},
{
  name: 'Postmark',
  category: 'Communication',
  desc: 'Email delivery for invoices and reports.',
  status: 'available',
  initials: 'Pm',
  color: '#9A9A98'
},
{
  name: 'ABDM (Ayushman Bharat)',
  category: 'Health records',
  desc: 'Link patient ABHA IDs and share digital health records.',
  status: 'attention',
  meta: 'Sandbox — production approval pending',
  badge: 'Beta',
  initials: 'AB',
  color: '#5A7A8C'
},
{
  name: 'Zoho Books',
  category: 'Accounting',
  desc: 'Export invoices, payments, and expenses to your accounting software.',
  status: 'connected',
  meta: 'Last sync: 12:00 today',
  initials: 'Zb',
  color: '#3F8E84'
},
{
  name: 'Tally',
  category: 'Accounting',
  desc: 'Daily journal export in Tally-compatible format.',
  status: 'available',
  initials: 'Tl',
  color: '#9A9A98'
},
{
  name: 'Mindray BS-240',
  category: 'Lab machines',
  desc: 'Auto-import biochemistry results into lab reports.',
  status: 'connected',
  meta: 'Online · 14 tests today',
  initials: 'Md',
  color: '#4F8A5C'
},
{
  name: 'Sysmex XN-350',
  category: 'Lab machines',
  desc: 'Hematology analyser direct integration.',
  status: 'attention',
  meta: 'Disconnected since yesterday',
  badge: 'Action needed',
  initials: 'Sx',
  color: '#B84A4A'
},
{
  name: 'Google Calendar',
  category: 'Productivity',
  desc: 'Sync doctor schedules to personal calendars.',
  status: 'available',
  initials: 'Gc',
  color: '#9A9A98'
},
{
  name: 'Slack',
  category: 'Productivity',
  desc: 'Send operational alerts to your team Slack.',
  status: 'available',
  initials: 'Sl',
  color: '#9A9A98'
}];

const statusMap = {
  connected: {
    tone: 'success' as const,
    label: 'Connected',
    icon: CheckCircle2Icon
  },
  available: {
    tone: 'neutral' as const,
    label: 'Available',
    icon: CircleIcon
  },
  attention: {
    tone: 'warning' as const,
    label: 'Needs attention',
    icon: AlertTriangleIcon
  }
};
const categories = [
'All',
'Payments',
'Communication',
'Health records',
'Accounting',
'Lab machines',
'Productivity'];

export function Integrations() {
  return (
    <div>
      <PageHeader
        title="Integrations"
        description="Connect Hospeon to payments, messaging, accounting, and lab equipment."
        breadcrumbs={[
        {
          label: 'Settings'
        },
        {
          label: 'Integrations'
        }]
        }
        actions={
        <Button variant="secondary" iconRight={<ExternalLinkIcon />}>
            Browse marketplace
          </Button>
        } />
      

      <div className="flex flex-wrap gap-1.5 mb-4">
        {categories.map((c, i) =>
        <button
          key={c}
          className={`h-8 px-3 rounded-lg text-xs font-medium ${i === 0 ? 'bg-ink-primary text-white dark:bg-ink-primary-dark dark:text-ink-primary' : 'bg-surface dark:bg-surface-dark border border-line dark:border-line-dark text-ink-secondary hover:bg-subtle dark:hover:bg-subtle-dark'}`}>
          
            {c}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {integrations.map((i) => {
          const s = statusMap[i.status];
          const Icon = s.icon;
          return (
            <Card key={i.name} className="hover:shadow-soft transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold text-sm shrink-0"
                  style={{
                    backgroundColor: i.color
                  }}>
                  
                  {i.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold truncate">{i.name}</h3>
                    {i.badge &&
                    <StatusBadge tone="info" size="sm">
                        {i.badge}
                      </StatusBadge>
                    }
                  </div>
                  <p className="text-[10px] text-ink-tertiary uppercase tracking-wider">
                    {i.category}
                  </p>
                </div>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed mb-3 min-h-[36px]">
                {i.desc}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-line dark:border-line-dark">
                <div className="flex items-center gap-1.5 text-xs">
                  <Icon
                    className={`w-3.5 h-3.5 ${i.status === 'connected' ? 'text-success' : i.status === 'attention' ? 'text-warning' : 'text-ink-tertiary'}`} />
                  
                  <span
                    className={
                    i.status === 'connected' ?
                    'text-success font-medium' :
                    i.status === 'attention' ?
                    'text-warning font-medium' :
                    'text-ink-tertiary'
                    }>
                    
                    {s.label}
                  </span>
                </div>
                {i.status === 'connected' ?
                <Button size="sm" variant="ghost" icon={<SettingsIcon />}>
                    Configure
                  </Button> :
                i.status === 'attention' ?
                <Button size="sm" variant="secondary">
                    Fix
                  </Button> :

                <Button size="sm" variant="primary">
                    Connect
                  </Button>
                }
              </div>
              {i.meta &&
              <p className="mt-2 text-[10px] text-ink-tertiary">{i.meta}</p>
              }
            </Card>);

        })}
      </div>
    </div>);

}