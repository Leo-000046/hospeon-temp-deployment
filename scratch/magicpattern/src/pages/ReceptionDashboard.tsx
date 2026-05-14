import React from 'react';
import {
  UserPlusIcon,
  CalendarPlusIcon,
  IndianRupeeIcon,
  SendIcon,
  PhoneIcon,
  MessageSquareIcon,
  CircleIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { MetricCard } from '../components/primitives/MetricCard';
import { Button } from '../components/primitives/Button';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { AutoStatusBadge } from '../components/primitives/StatusBadge';
import { DataTable } from '../components/primitives/DataTable';
import { Link } from 'react-router-dom';
const liveQueue = [
{
  token: 'T-0042',
  patient: 'Anjali Kapoor',
  doctor: 'Dr. Rao',
  wait: '4 min',
  status: 'waiting' as const
},
{
  token: 'T-0043',
  patient: 'Rohan Mehta',
  doctor: 'Dr. Rao',
  wait: '12 min',
  status: 'waiting' as const
},
{
  token: 'T-0044',
  patient: 'Kavita Iyer',
  doctor: 'Dr. Rao',
  wait: '18 min',
  status: 'waiting' as const
},
{
  token: 'T-0050',
  patient: 'Vikram Shah',
  doctor: 'Dr. Menon',
  wait: 'In consult',
  status: 'in-consult' as const
},
{
  token: 'T-0051',
  patient: 'Priya Nair',
  doctor: 'Dr. Menon',
  wait: '6 min',
  status: 'waiting' as const
},
{
  token: 'T-0060',
  patient: 'Aman Bhatia',
  doctor: 'Dr. Khanna',
  wait: 'Checked-in',
  status: 'checked-in' as const
}];

const callsLog = [
{
  type: 'sms',
  text: 'Reminder sent to Anjali Kapoor',
  time: '09:42'
},
{
  type: 'call',
  text: 'Missed call from +91 98•••• 12 34',
  time: '09:31'
},
{
  type: 'sms',
  text: 'Lab report ready — Rakesh Malhotra',
  time: '09:18'
},
{
  type: 'call',
  text: 'Call to Suresh Pillai — confirmed slot',
  time: '09:04'
}];

const doctors = [
{
  name: 'Dr. Anjali Rao',
  dept: 'Cardiology',
  status: 'busy',
  next: '11:30'
},
{
  name: 'Dr. Vikram Menon',
  dept: 'General Med.',
  status: 'available',
  next: 'Now'
},
{
  name: 'Dr. Priya Khanna',
  dept: 'Pediatrics',
  status: 'available',
  next: '10:45'
},
{
  name: 'Dr. Rajiv Sharma',
  dept: 'Orthopedics',
  status: 'off',
  next: 'Tomorrow'
},
{
  name: 'Dr. Neha Gupta',
  dept: 'Dermatology',
  status: 'busy',
  next: '12:15'
},
{
  name: 'Dr. Arjun Patel',
  dept: 'ENT',
  status: 'available',
  next: '11:00'
},
{
  name: 'Dr. Sunita Bose',
  dept: 'Gynecology',
  status: 'busy',
  next: '13:30'
},
{
  name: 'Dr. Manoj Reddy',
  dept: 'Diabetology',
  status: 'off',
  next: 'Thu'
}];

const pendingPayments = [
{
  invoice: 'INV-2026-04812',
  patient: 'Anjali Kapoor',
  amount: '₹3,420',
  age: '12 min'
},
{
  invoice: 'INV-2026-04809',
  patient: 'Vikram Shah',
  amount: '₹8,940',
  age: '32 min'
},
{
  invoice: 'INV-2026-04801',
  patient: 'Kavita Iyer',
  amount: '₹2,180',
  age: '1 hr 04 min'
},
{
  invoice: 'INV-2026-04798',
  patient: 'Rakesh Malhotra',
  amount: '₹14,720',
  age: '2 hr 18 min'
},
{
  invoice: 'INV-2026-04790',
  patient: 'Meena Joshi',
  amount: '₹1,640',
  age: '3 hr 40 min'
}];

const dotColor = (s: string) =>
s === 'available' ?
'text-success' :
s === 'busy' ?
'text-warning' :
'text-ink-tertiary';
export function ReceptionDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reception desk"
        description="Live overview of today's flow"
        actions={
        <>
            <Link to="/patients/new">
              <Button variant="secondary">
                <UserPlusIcon className="w-4 h-4" />
                New patient
              </Button>
            </Link>
            <Link to="/appointments/new">
              <Button variant="primary">
                <CalendarPlusIcon className="w-4 h-4" />
                New appointment
              </Button>
            </Link>
          </>
        } />
      

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Walk-ins today"
          value={<MonoNumber>22</MonoNumber>}
          hint="Across 6 doctors" />
        
        <MetricCard
          label="Scheduled today"
          value={<MonoNumber>48</MonoNumber>}
          hint="14 confirmed" />
        
        <MetricCard
          label="No-shows"
          value={<MonoNumber>3</MonoNumber>}
          hint="Auto-reschedule sent" />
        
        <MetricCard
          label="Pending payments"
          value={
          <>
              <span className="font-mono">₹30,900</span>
            </>
          }
          hint="5 invoices" />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card padding="none">
            <div className="px-5 pt-5 flex items-center justify-between">
              <SectionTitle
                title="Live queue"
                description="Token order across all doctors" />
              
              <Link to="/queue" className="text-xs text-accent hover:underline">
                View full queue →
              </Link>
            </div>
            <div className="divide-y divide-line dark:divide-line-dark">
              {liveQueue.map((q) =>
              <div
                key={q.token}
                className="px-5 py-3 flex items-center gap-4">
                
                  <MonoNumber className="text-sm font-semibold text-ink-primary dark:text-ink-primary-dark w-16">
                    {q.token}
                  </MonoNumber>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ink-primary dark:text-ink-primary-dark truncate">
                      {q.patient}
                    </div>
                    <div className="text-xs text-ink-tertiary">{q.doctor}</div>
                  </div>
                  <MonoNumber className="text-xs text-ink-secondary w-20 text-right">
                    {q.wait}
                  </MonoNumber>
                  <AutoStatusBadge status={q.status} />
                  <div className="flex gap-1">
                    <Button variant="ghost" className="!px-2 !py-1 text-xs">
                      Check-in
                    </Button>
                    <Button variant="ghost" className="!px-2 !py-1 text-xs">
                      Reassign
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Pending payment collection"
              description="Patients who completed visit but haven't paid" />
            
            <DataTable
              data={pendingPayments}
              columns={[
              {
                key: 'invoice',
                header: 'Invoice',
                render: (r) => <MonoNumber>{r.invoice}</MonoNumber>
              },
              {
                key: 'patient',
                header: 'Patient'
              },
              {
                key: 'amount',
                header: 'Amount',
                align: 'right',
                render: (r) => <span className="font-mono">{r.amount}</span>
              },
              {
                key: 'age',
                header: 'Pending for',
                render: (r) =>
                <span className="font-mono text-ink-tertiary">{r.age}</span>

              },
              {
                key: 'action',
                header: '',
                align: 'right',
                render: () =>
                <Button variant="primary" className="!py-1 !px-2.5 text-xs">
                      Collect
                    </Button>

              }]
              }
              dense />
            
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <SectionTitle title="Quick actions" />
            <div className="grid grid-cols-2 gap-2">
              <Link to="/patients/new">
                <Button variant="secondary" className="w-full justify-start">
                  <UserPlusIcon className="w-4 h-4" />
                  Register
                </Button>
              </Link>
              <Link to="/appointments/new">
                <Button variant="secondary" className="w-full justify-start">
                  <CalendarPlusIcon className="w-4 h-4" />
                  Appointment
                </Button>
              </Link>
              <Link to="/billing/invoices/new">
                <Button variant="secondary" className="w-full justify-start">
                  <IndianRupeeIcon className="w-4 h-4" />
                  Collect
                </Button>
              </Link>
              <Button variant="secondary" className="w-full justify-start">
                <SendIcon className="w-4 h-4" />
                Reminder
              </Button>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Recent calls & SMS" />
            <div className="space-y-3">
              {callsLog.map((c, i) =>
              <div key={i} className="flex items-start gap-2.5 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-subtle dark:bg-subtle-dark flex items-center justify-center shrink-0 text-ink-secondary">
                    {c.type === 'call' ?
                  <PhoneIcon className="w-3.5 h-3.5" /> :

                  <MessageSquareIcon className="w-3.5 h-3.5" />
                  }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-ink-primary dark:text-ink-primary-dark text-xs truncate">
                      {c.text}
                    </div>
                    <MonoNumber className="text-[10px] text-ink-tertiary">
                      {c.time}
                    </MonoNumber>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Doctor availability"
              description="Live status across all doctors" />
            
            <div className="space-y-2">
              {doctors.map((d) =>
              <div key={d.name} className="flex items-center gap-2.5 text-sm">
                  <CircleIcon
                  className={`w-2 h-2 fill-current ${dotColor(d.status)}`} />
                
                  <div className="flex-1 min-w-0">
                    <div className="text-ink-primary dark:text-ink-primary-dark text-xs truncate">
                      {d.name}
                    </div>
                    <div className="text-[10px] text-ink-tertiary">
                      {d.dept}
                    </div>
                  </div>
                  <MonoNumber className="text-[11px] text-ink-secondary">
                    {d.next}
                  </MonoNumber>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>);

}