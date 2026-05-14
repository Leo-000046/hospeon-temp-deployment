import React, { useState, Fragment } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  FilterIcon,
  CalendarDaysIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card } from '../components/primitives/Card';
import { Button, IconButton } from '../components/primitives/Button';
import { Select } from '../components/primitives/Input';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { StatusBadge } from '../components/primitives/StatusBadge';
import { doctors } from '../lib/mockData';
import { cn } from '../lib/cn';
type View = 'day' | 'week' | 'doctor' | 'department';
interface Appt {
  id: string;
  patient: string;
  pid: string;
  doctor: string;
  start: number; // 30-min slot index (0 = 09:00)
  duration: number;
  status: 'Booked' | 'Confirmed' | 'Walk-in' | 'Follow-up';
  type: string;
}
const HOURS = Array.from(
  {
    length: 20
  },
  (_, i) => i
); // 09:00 to 19:00 in 30-min slots
const slotLabel = (i: number) => {
  const h = 9 + Math.floor(i / 2);
  const m = i % 2 === 0 ? '00' : '30';
  return `${String(h).padStart(2, '0')}:${m}`;
};
const sampleAppts: Record<string, Appt[]> = {
  d1: [
  {
    id: 'A1',
    patient: 'Ramesh Kumar',
    pid: 'P-100482',
    doctor: 'd1',
    start: 1,
    duration: 1,
    status: 'Confirmed',
    type: 'Follow-up'
  },
  {
    id: 'A2',
    patient: 'Suresh Pillai',
    pid: 'P-100478',
    doctor: 'd1',
    start: 3,
    duration: 2,
    status: 'Confirmed',
    type: 'Consultation'
  },
  {
    id: 'A3',
    patient: 'Walk-in slot',
    pid: '—',
    doctor: 'd1',
    start: 6,
    duration: 1,
    status: 'Walk-in',
    type: 'Walk-in'
  },
  {
    id: 'A4',
    patient: 'Abdul Rasheed',
    pid: 'P-100476',
    doctor: 'd1',
    start: 10,
    duration: 1,
    status: 'Booked',
    type: 'Review'
  },
  {
    id: 'A5',
    patient: 'Meena Joseph',
    pid: 'P-100474',
    doctor: 'd1',
    start: 14,
    duration: 2,
    status: 'Booked',
    type: 'Consultation'
  }],

  d2: [
  {
    id: 'B1',
    patient: 'Joseph Mathew',
    pid: 'P-100480',
    doctor: 'd2',
    start: 2,
    duration: 2,
    status: 'Confirmed',
    type: 'Cardiac review'
  },
  {
    id: 'B2',
    patient: 'Lakshmi Devi',
    pid: 'P-100475',
    doctor: 'd2',
    start: 5,
    duration: 1,
    status: 'Confirmed',
    type: 'Follow-up'
  },
  {
    id: 'B3',
    patient: 'V. Krishnan',
    pid: 'P-100471',
    doctor: 'd2',
    start: 12,
    duration: 2,
    status: 'Booked',
    type: 'Echo'
  }],

  d3: [
  {
    id: 'C1',
    patient: 'Ananya Suresh',
    pid: 'P-100479',
    doctor: 'd3',
    start: 1,
    duration: 1,
    status: 'Confirmed',
    type: 'Asthma follow-up'
  },
  {
    id: 'C2',
    patient: 'Riya Thomas',
    pid: 'P-100469',
    doctor: 'd3',
    start: 4,
    duration: 1,
    status: 'Booked',
    type: 'Vaccination'
  },
  {
    id: 'C3',
    patient: 'Aarav Nair',
    pid: 'P-100467',
    doctor: 'd3',
    start: 8,
    duration: 1,
    status: 'Booked',
    type: 'Fever'
  },
  {
    id: 'C4',
    patient: 'Kavya M.',
    pid: 'P-100466',
    doctor: 'd3',
    start: 11,
    duration: 1,
    status: 'Booked',
    type: 'Consultation'
  }],

  d4: [
  {
    id: 'D1',
    patient: 'Suresh Pillai',
    pid: 'P-100478',
    doctor: 'd4',
    start: 0,
    duration: 2,
    status: 'Confirmed',
    type: 'Knee review'
  },
  {
    id: 'D2',
    patient: 'Babu Varghese',
    pid: 'P-100463',
    doctor: 'd4',
    start: 7,
    duration: 2,
    status: 'Booked',
    type: 'Fracture review'
  }],

  d5: [
  {
    id: 'E1',
    patient: 'Meera Krishnan',
    pid: 'P-100477',
    doctor: 'd5',
    start: 3,
    duration: 1,
    status: 'Confirmed',
    type: 'Antenatal'
  },
  {
    id: 'E2',
    patient: 'Fathima Beevi',
    pid: 'P-100481',
    doctor: 'd5',
    start: 9,
    duration: 1,
    status: 'Confirmed',
    type: 'Consultation'
  },
  {
    id: 'E3',
    patient: 'Nimmy J.',
    pid: 'P-100460',
    doctor: 'd5',
    start: 15,
    duration: 1,
    status: 'Booked',
    type: 'Routine'
  }]

};
const statusTone = {
  Booked: 'neutral',
  Confirmed: 'success',
  'Walk-in': 'warning',
  'Follow-up': 'info'
} as const;
export function AppointmentCalendar() {
  const [view, setView] = useState<View>('doctor');
  const [showDrawer, setShowDrawer] = useState<Appt | null>(null);
  const today = new Date('2026-05-12');
  const dateStr = today.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const weekDays = [
  'Mon 11',
  'Tue 12',
  'Wed 13',
  'Thu 14',
  'Fri 15',
  'Sat 16',
  'Sun 17'];

  return (
    <div>
      <PageHeader
        title="Appointment calendar"
        description="View, book and reschedule appointments across doctors and departments."
        breadcrumbs={[
        {
          label: 'Overview'
        },
        {
          label: 'Calendar'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<FilterIcon />}>
              Filters
            </Button>
            <Button variant="primary" icon={<PlusIcon />}>
              New appointment
            </Button>
          </>
        } />
      

      <Card className="mb-4" padded={false}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 border-b border-line dark:border-line-dark">
          <div className="flex items-center gap-3">
            <IconButton variant="ghost">
              <ChevronLeftIcon />
            </IconButton>
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4 text-ink-secondary" />
              <h2 className="text-sm font-semibold">{dateStr}</h2>
            </div>
            <IconButton variant="ghost">
              <ChevronRightIcon />
            </IconButton>
            <Button size="sm" variant="ghost">
              Today
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Select className="w-44 h-8 text-xs">
              <option>All branches</option>
              <option>MG Road</option>
              <option>Kakkanad</option>
            </Select>
            <Select className="w-44 h-8 text-xs">
              <option>All departments</option>
              <option>General Medicine</option>
              <option>Cardiology</option>
            </Select>
            <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-subtle dark:bg-subtle-dark">
              {(['day', 'week', 'doctor', 'department'] as View[]).map((v) =>
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'px-2.5 h-7 text-xs font-medium rounded-md capitalize',
                  view === v ?
                  'bg-surface dark:bg-surface-dark text-ink-primary shadow-softer' :
                  'text-ink-secondary'
                )}>
                
                  {v}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Doctor-wise view (default) */}
        {view === 'doctor' &&
        <div className="overflow-x-auto">
            <div
            className="min-w-[900px] grid"
            style={{
              gridTemplateColumns: `60px repeat(${doctors.length}, minmax(160px, 1fr))`
            }}>
            
              {/* Header row */}
              <div className="border-b border-r border-line dark:border-line-dark bg-subtle/50 dark:bg-subtle-dark/50 p-2"></div>
              {doctors.map((d) =>
            <div
              key={d.id}
              className="border-b border-r last:border-r-0 border-line dark:border-line-dark bg-subtle/50 dark:bg-subtle-dark/50 p-2.5">
              
                  <div className="text-xs font-semibold truncate">{d.name}</div>
                  <div className="text-[10px] text-ink-tertiary">{d.dept}</div>
                </div>
            )}

              {/* Time grid */}
              {HOURS.map((slotIdx) =>
            <Fragment key={slotIdx}>
                  <div className="border-b border-r border-line dark:border-line-dark bg-subtle/30 dark:bg-subtle-dark/30 px-2 py-1.5 flex items-start">
                    {slotIdx % 2 === 0 &&
                <MonoNumber size="xs" className="text-ink-tertiary">
                        {slotLabel(slotIdx)}
                      </MonoNumber>
                }
                  </div>
                  {doctors.map((d) => {
                const appt = (sampleAppts[d.id] || []).find(
                  (a) => a.start === slotIdx
                );
                return (
                  <div
                    key={`${d.id}-${slotIdx}`}
                    className="border-b border-r last:border-r-0 border-line dark:border-line-dark p-0.5 relative min-h-[36px] hover:bg-subtle/40 dark:hover:bg-subtle-dark/40 cursor-pointer">
                    
                        {appt &&
                    <button
                      onClick={() => setShowDrawer(appt)}
                      className={cn(
                        'absolute inset-x-0.5 rounded-md p-1.5 text-left text-[11px] overflow-hidden border',
                        appt.status === 'Confirmed' &&
                        'bg-accent-soft border-accent/20 text-accent',
                        appt.status === 'Booked' &&
                        'bg-info-soft border-info/20 text-info',
                        appt.status === 'Walk-in' &&
                        'bg-warning-soft border-warning/20 text-warning',
                        appt.status === 'Follow-up' &&
                        'bg-success-soft border-success/20 text-success'
                      )}
                      style={{
                        top: 2,
                        height: `calc(${appt.duration * 36}px - 4px)`
                      }}>
                      
                            <div className="font-semibold truncate text-ink-primary dark:text-ink-primary-dark">
                              {appt.patient}
                            </div>
                            <div className="truncate opacity-75">
                              {appt.type}
                            </div>
                          </button>
                    }
                      </div>);

              })}
                </Fragment>
            )}
            </div>
          </div>
        }

        {/* Week view */}
        {view === 'week' &&
        <div className="overflow-x-auto">
            <div
            className="min-w-[800px] grid"
            style={{
              gridTemplateColumns: `60px repeat(7, 1fr)`
            }}>
            
              <div className="border-b border-r border-line dark:border-line-dark bg-subtle/50 dark:bg-subtle-dark/50 p-2"></div>
              {weekDays.map((d, i) =>
            <div
              key={d}
              className={cn(
                'border-b border-r last:border-r-0 border-line dark:border-line-dark p-2.5 text-center',
                i === 1 && 'bg-accent-soft/40'
              )}>
              
                  <div className="text-xs font-semibold">{d.split(' ')[0]}</div>
                  <MonoNumber size="xs" className="text-ink-tertiary">
                    {d.split(' ')[1]} May
                  </MonoNumber>
                </div>
            )}
              {HOURS.filter((_, i) => i % 2 === 0).map((slotIdx) =>
            <Fragment key={slotIdx}>
                  <div className="border-b border-r border-line dark:border-line-dark bg-subtle/30 dark:bg-subtle-dark/30 p-1.5 text-right">
                    <MonoNumber size="xs" className="text-ink-tertiary">
                      {slotLabel(slotIdx)}
                    </MonoNumber>
                  </div>
                  {weekDays.map((_, di) =>
              <div
                key={di}
                className="border-b border-r last:border-r-0 border-line dark:border-line-dark min-h-[44px] hover:bg-subtle/40 dark:hover:bg-subtle-dark/40 cursor-pointer p-1">
                
                      {di === 1 && slotIdx === 2 &&
                <div className="rounded-md bg-accent-soft text-accent text-[11px] px-1.5 py-1 truncate font-medium">
                          Joseph M. · 10:00
                        </div>
                }
                      {di === 3 && slotIdx === 4 &&
                <div className="rounded-md bg-info-soft text-info text-[11px] px-1.5 py-1 truncate font-medium">
                          A. Rasheed · 11:00
                        </div>
                }
                      {di === 5 && slotIdx === 6 &&
                <div className="rounded-md bg-success-soft text-success text-[11px] px-1.5 py-1 truncate font-medium">
                          M. Krishnan · 12:00
                        </div>
                }
                    </div>
              )}
                </Fragment>
            )}
            </div>
          </div>
        }

        {view === 'day' &&
        <div className="p-4 space-y-2 max-h-[640px] overflow-y-auto">
            {HOURS.map((slotIdx) => {
            const appts = Object.values(sampleAppts).
            flat().
            filter((a) => a.start === slotIdx);
            return (
              <div key={slotIdx} className="flex gap-3 items-start py-1.5">
                  <MonoNumber
                  size="sm"
                  className="w-14 text-ink-tertiary shrink-0 pt-1">
                  
                    {slotLabel(slotIdx)}
                  </MonoNumber>
                  <div className="flex-1 flex flex-wrap gap-2 min-h-[32px] border-t border-line dark:border-line-dark pt-1.5">
                    {appts.map((a) =>
                  <button
                    key={a.id}
                    onClick={() => setShowDrawer(a)}
                    className={cn(
                      'rounded-lg border px-2.5 py-1.5 text-xs text-left',
                      a.status === 'Confirmed' &&
                      'bg-accent-soft border-accent/20',
                      a.status === 'Booked' &&
                      'bg-info-soft border-info/20',
                      a.status === 'Walk-in' &&
                      'bg-warning-soft border-warning/20',
                      a.status === 'Follow-up' &&
                      'bg-success-soft border-success/20'
                    )}>
                    
                        <div className="font-medium">{a.patient}</div>
                        <div className="text-[10px] text-ink-secondary">
                          {doctors.find((d) => d.id === a.doctor)?.name} ·{' '}
                          {a.type}
                        </div>
                      </button>
                  )}
                  </div>
                </div>);

          })}
          </div>
        }

        {view === 'department' &&
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {[
          'General Medicine',
          'Cardiology',
          'Pediatrics',
          'Orthopedics',
          'Gynecology'].
          map((dept) => {
            const doctorsInDept = doctors.filter((d) => d.dept === dept);
            const allAppts = doctorsInDept.flatMap(
              (d) => sampleAppts[d.id] || []
            );
            return (
              <Card key={dept} padded>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">{dept}</h3>
                    <MonoNumber size="xs" className="text-ink-tertiary">
                      {allAppts.length} appts
                    </MonoNumber>
                  </div>
                  <div className="space-y-1.5">
                    {allAppts.slice(0, 5).map((a) =>
                  <div
                    key={a.id}
                    className="flex items-center gap-2 py-1.5 border-b border-line dark:border-line-dark last:border-0">
                    
                        <MonoNumber
                      size="xs"
                      className="text-ink-tertiary w-12">
                      
                          {slotLabel(a.start)}
                        </MonoNumber>
                        <span className="text-xs font-medium truncate flex-1">
                          {a.patient}
                        </span>
                        <StatusBadge
                      tone={statusTone[a.status] as any}
                      size="sm">
                      
                          {a.status}
                        </StatusBadge>
                      </div>
                  )}
                  </div>
                </Card>);

          })}
          </div>
        }
      </Card>

      {/* Quick appointment drawer */}
      {showDrawer &&
      <>
          <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setShowDrawer(null)} />
        
          <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-surface dark:bg-surface-dark border-l border-line dark:border-line-dark z-50 shadow-pop flex flex-col">
            <div className="p-5 border-b border-line dark:border-line-dark flex items-center justify-between">
              <h3 className="text-sm font-semibold">Appointment details</h3>
              <button
              onClick={() => setShowDrawer(null)}
              className="text-ink-tertiary hover:text-ink-primary">
              
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div>
                <p className="text-xs text-ink-tertiary mb-1">Patient</p>
                <p className="font-medium">{showDrawer.patient}</p>
                <MonoNumber size="xs" className="text-ink-tertiary">
                  {showDrawer.pid}
                </MonoNumber>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-ink-tertiary mb-1">Time</p>
                  <MonoNumber size="sm" weight="medium">
                    {slotLabel(showDrawer.start)}
                  </MonoNumber>
                </div>
                <div>
                  <p className="text-xs text-ink-tertiary mb-1">Duration</p>
                  <MonoNumber size="sm" weight="medium">
                    {showDrawer.duration * 30} min
                  </MonoNumber>
                </div>
                <div>
                  <p className="text-xs text-ink-tertiary mb-1">Doctor</p>
                  <span>
                    {doctors.find((d) => d.id === showDrawer.doctor)?.name}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-ink-tertiary mb-1">Status</p>
                  <StatusBadge tone={statusTone[showDrawer.status] as any} dot>
                    {showDrawer.status}
                  </StatusBadge>
                </div>
              </div>
              <div>
                <p className="text-xs text-ink-tertiary mb-1">Visit type</p>
                <p className="text-sm">{showDrawer.type}</p>
              </div>
              <div>
                <p className="text-xs text-ink-tertiary mb-1">Reminders</p>
                <StatusBadge tone="success" dot size="sm">
                  Sent · WhatsApp · 1d ago
                </StatusBadge>
              </div>
            </div>
            <div className="p-4 border-t border-line dark:border-line-dark flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Reschedule
              </Button>
              <Button variant="secondary" size="sm">
                Send reminder
              </Button>
              <Button variant="primary" size="sm" className="ml-auto">
                Check in
              </Button>
            </div>
          </div>
        </>
      }
    </div>);

}