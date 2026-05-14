import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, UserPlusIcon, CalendarIcon } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { MonoNumber } from '@/components/ui/MonoNumber';
import { cn } from '@/lib/cn';
const slots = [
'09:00',
'09:15',
'09:30',
'09:45',
'10:00',
'10:15',
'10:30',
'10:45',
'11:00',
'11:15',
'11:30',
'11:45',
'12:00',
'12:15',
'12:30',
'12:45',
'14:30',
'14:45',
'15:00',
'15:15',
'15:30',
'15:45',
'16:00',
'16:15'];

const booked = new Set(['09:30', '10:00', '11:15', '12:00', '15:30']);
const blocked = new Set([
'12:30',
'12:45',
'13:00',
'13:15',
'13:30',
'13:45',
'14:00',
'14:15']
);
export function NewAppointment() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>('10:30');
  const [patientMode, setPatientMode] = useState<'existing' | 'new'>('existing');
  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title="New appointment"
        breadcrumbs={[
        {
          label: 'Calendar',
          to: '/calendar'
        },
        {
          label: 'New appointment'
        }]
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Patient */}
          <Card>
            <SectionTitle
              title="Patient"
              description="Search existing or register a new one" />
            
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setPatientMode('existing')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm',
                  patientMode === 'existing' ?
                  'bg-accent text-white' :
                  'bg-subtle dark:bg-subtle-dark text-ink-secondary'
                )}>
                
                Existing patient
              </button>
              <button
                onClick={() => setPatientMode('new')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm',
                  patientMode === 'new' ?
                  'bg-accent text-white' :
                  'bg-subtle dark:bg-subtle-dark text-ink-secondary'
                )}>
                
                New patient
              </button>
            </div>
            {patientMode === 'existing' ?
            <div className="space-y-3">
                <Input
                placeholder="Search by name, phone, or patient ID…"
                icon={<SearchIcon className="w-4 h-4" />} />
              
                <div className="rounded-xl border border-accent bg-accent-soft/40 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
                    AK
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-ink-primary dark:text-ink-primary-dark">
                      Anjali Kapoor
                    </div>
                    <div className="text-xs text-ink-tertiary">
                      <MonoNumber>P-100482</MonoNumber> · 54F · +91 98•••• 12 34
                    </div>
                  </div>
                  <Button variant="ghost" className="!py-1 !px-2 text-xs">
                    Change
                  </Button>
                </div>
              </div> :

            <div className="grid grid-cols-2 gap-3">
                <Input label="Full name" required placeholder="Patient name" />
                <Input label="Phone" required placeholder="+91" mono />
                <Input label="Date of birth" type="date" mono />
                <Select label="Gender">
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </Select>
                <div className="col-span-2 flex items-center gap-2 text-xs text-ink-tertiary">
                  <UserPlusIcon className="w-3.5 h-3.5" /> Full registration can
                  be completed later from the patient profile.
                </div>
              </div>
            }
          </Card>

          {/* Appointment */}
          <Card>
            <SectionTitle title="Appointment" />
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Select label="Department" required>
                <option>Cardiology</option>
                <option>General Medicine</option>
                <option>Pediatrics</option>
                <option>Orthopedics</option>
                <option>Dermatology</option>
                <option>ENT</option>
              </Select>
              <Select label="Doctor" required defaultValue="Dr. Anjali Rao">
                <option>Dr. Anjali Rao</option>
                <option>Dr. Vikram Menon</option>
                <option>Dr. Priya Khanna</option>
              </Select>
              <Input
                label="Date"
                type="date"
                required
                defaultValue="2026-05-12"
                mono />
              
              <Select label="Duration" defaultValue="15">
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-secondary dark:text-ink-secondary-dark mb-2">
                Available slots
              </label>
              <div className="grid grid-cols-6 gap-2">
                {slots.map((s) => {
                  const isBooked = booked.has(s);
                  const isBlocked = blocked.has(s);
                  const isSelected = selectedSlot === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={isBooked || isBlocked}
                      onClick={() => setSelectedSlot(s)}
                      className={cn(
                        'px-2 py-2 rounded-lg text-xs font-mono border transition-colors',
                        isSelected && 'bg-accent text-white border-accent',
                        !isSelected &&
                        !isBooked &&
                        !isBlocked &&
                        'border-line dark:border-line-dark hover:border-accent text-ink-primary dark:text-ink-primary-dark',
                        isBooked &&
                        'border-line dark:border-line-dark bg-subtle dark:bg-subtle-dark text-ink-tertiary line-through cursor-not-allowed',
                        isBlocked &&
                        'border-dashed border-line dark:border-line-dark text-ink-tertiary cursor-not-allowed'
                      )}>
                      
                      {s}
                    </button>);

                })}
              </div>
              <div className="flex gap-4 mt-3 text-xs text-ink-tertiary">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded border border-line" />{' '}
                  Available
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-accent" /> Selected
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-subtle dark:bg-subtle-dark" />{' '}
                  Booked
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded border border-dashed border-line" />{' '}
                  Blocked (lunch)
                </div>
              </div>
            </div>
          </Card>

          {/* Visit details */}
          <Card>
            <SectionTitle title="Visit details" />
            <div className="space-y-3">
              <Select label="Visit type" defaultValue="consultation">
                <option value="consultation">New consultation</option>
                <option>Follow-up</option>
                <option>Procedure</option>
                <option>Vaccination</option>
              </Select>
              <Input
                label="Chief complaint"
                placeholder="e.g. Chest discomfort on exertion, 2 days" />
              
              <Textarea
                label="Notes for the doctor (optional)"
                rows={3}
                placeholder="Anything the doctor should know before the visit…" />
              
            </div>
          </Card>

          {/* Communication */}
          <Card>
            <SectionTitle title="Reminders" />
            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>SMS reminder · 24 hrs before</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>WhatsApp reminder · 2 hrs before</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span>Email reminder</span>
              </label>
            </div>
          </Card>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card>
            <SectionTitle title="Summary" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Patient
                </span>
                <span className="text-ink-primary dark:text-ink-primary-dark">
                  Anjali Kapoor
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Patient ID
                </span>
                <MonoNumber>P-100482</MonoNumber>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Doctor
                </span>
                <span className="text-ink-primary dark:text-ink-primary-dark">
                  Dr. Anjali Rao
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Department
                </span>
                <span>Cardiology</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Date & time
                </span>
                <MonoNumber>12 May · {selectedSlot ?? '—'}</MonoNumber>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Duration
                </span>
                <MonoNumber>15 min</MonoNumber>
              </div>
              <div className="border-t border-line dark:border-line-dark pt-3 flex justify-between font-medium">
                <span>Consultation fee</span>
                <span className="font-mono text-ink-primary dark:text-ink-primary-dark">
                  ₹1,200
                </span>
              </div>
            </div>
          </Card>
          <Card>
            <SectionTitle title="Tips" />
            <div className="text-xs text-ink-secondary dark:text-ink-secondary-dark space-y-2">
              <div>
                • Slots auto-block during the doctor's lunch and OT hours.
              </div>
              <div>• Patients can self-confirm via WhatsApp link.</div>
              <div>
                • No-shows are tracked and surfaced in the Reception dashboard.
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-surface dark:bg-surface-dark border-t border-line dark:border-line-dark px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 z-20">
        <Link to="/calendar" className="hidden sm:block">
          <Button variant="ghost">Cancel</Button>
        </Link>
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap sm:justify-end [&>*]:shrink-0">
          <Link to="/calendar" className="sm:hidden">
            <Button variant="ghost">Cancel</Button>
          </Link>
          <Button variant="secondary">Save draft</Button>
          <Button variant="primary">
            <CalendarIcon className="w-4 h-4" />
            Confirm appointment
          </Button>
        </div>
      </div>
    </div>);

}