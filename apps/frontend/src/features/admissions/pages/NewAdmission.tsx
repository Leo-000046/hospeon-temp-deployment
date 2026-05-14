import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BedDoubleIcon, SearchIcon } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { MonoNumber } from '@/components/ui/MonoNumber';
import { cn } from '@/lib/cn';
const beds = [
{
  id: 'W1-01',
  status: 'available'
},
{
  id: 'W1-02',
  status: 'occupied'
},
{
  id: 'W1-03',
  status: 'available'
},
{
  id: 'W1-04',
  status: 'maintenance'
},
{
  id: 'W1-05',
  status: 'occupied'
},
{
  id: 'W1-06',
  status: 'available'
},
{
  id: 'W1-07',
  status: 'occupied'
},
{
  id: 'W1-08',
  status: 'available'
},
{
  id: 'W2-01',
  status: 'occupied'
},
{
  id: 'W2-02',
  status: 'available'
},
{
  id: 'W2-03',
  status: 'available'
},
{
  id: 'W2-04',
  status: 'occupied'
}];

const bedColor: Record<string, string> = {
  available: 'border-success bg-success-soft text-success hover:border-accent',
  occupied:
  'border-line dark:border-line-dark bg-subtle dark:bg-subtle-dark text-ink-tertiary cursor-not-allowed',
  maintenance:
  'border-dashed border-warning bg-warning-soft/40 text-warning cursor-not-allowed'
};
export function NewAdmission() {
  const [selectedBed, setSelectedBed] = useState<string | null>('W1-03');
  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title="New IPD admission"
        breadcrumbs={[
        {
          label: 'IPD Admissions',
          to: '/ipd'
        },
        {
          label: 'New admission'
        }]
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <SectionTitle title="Patient" />
            <Input
              placeholder="Search by name, phone, or patient ID…"
              icon={<SearchIcon className="w-4 h-4" />} />
            
            <div className="rounded-xl border border-accent bg-accent-soft/40 p-4 mt-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
                VS
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-ink-primary dark:text-ink-primary-dark">
                  Vikram Shah
                </div>
                <div className="text-xs text-ink-tertiary">
                  <MonoNumber>P-100501</MonoNumber> · 62M · O+ · Allergies:
                  Penicillin
                </div>
              </div>
              <Button variant="ghost" className="!py-1 !px-2 text-xs">
                Change
              </Button>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Admission details" />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Admission date"
                type="date"
                required
                defaultValue="2026-05-12"
                mono />
              
              <Input
                label="Admission time"
                type="time"
                required
                defaultValue="11:30"
                mono />
              
              <Select label="Admitting doctor" required>
                <option>Dr. Anjali Rao · Cardiology</option>
                <option>Dr. Vikram Menon · General Medicine</option>
                <option>Dr. Rajiv Sharma · Orthopedics</option>
              </Select>
              <Select label="Department" required>
                <option>Cardiology</option>
                <option>General Medicine</option>
                <option>Orthopedics</option>
              </Select>
              <Input
                label="Expected stay"
                placeholder="3"
                hint="In days"
                mono />
              
              <Select label="Admission type">
                <option>Planned</option>
                <option>Emergency</option>
                <option>Day-care</option>
              </Select>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Diagnosis & reason" />
            <div className="space-y-3">
              <Input
                label="Primary diagnosis"
                required
                placeholder="e.g. NSTEMI – Non ST-elevation MI" />
              
              <Input
                label="Secondary diagnosis (optional)"
                placeholder="e.g. Type 2 Diabetes Mellitus" />
              
              <Textarea
                label="Chief complaint"
                rows={2}
                placeholder="Patient presented with…" />
              
              <Textarea
                label="Provisional plan"
                rows={3}
                placeholder="Cardiac monitoring, anticoagulation, plan for angiography in 24 hrs…" />
              
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Bed assignment"
              description="Cardiology Ward · 12 beds" />
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Select label="Ward" defaultValue="W1">
                <option value="W1">Ward 1 · Cardiology</option>
                <option>Ward 2 · ICU</option>
                <option>Ward 3 · Post-op</option>
              </Select>
              <Select label="Room type">
                <option>General (₹1,800/day)</option>
                <option>Twin sharing (₹3,200/day)</option>
                <option>Private (₹5,800/day)</option>
                <option>Deluxe (₹9,500/day)</option>
              </Select>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {beds.map((b) =>
              <button
                key={b.id}
                type="button"
                disabled={b.status !== 'available'}
                onClick={() => setSelectedBed(b.id)}
                className={cn(
                  'aspect-square rounded-xl border-2 flex flex-col items-center justify-center text-xs font-mono transition-colors',
                  selectedBed === b.id && b.status === 'available' ?
                  'border-accent bg-accent text-white' :
                  bedColor[b.status]
                )}>
                
                  <BedDoubleIcon className="w-4 h-4 mb-1" />
                  {b.id}
                </button>
              )}
            </div>
            <div className="flex gap-4 mt-3 text-xs text-ink-tertiary">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-success-soft border border-success" />{' '}
                Available
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-subtle dark:bg-subtle-dark" />{' '}
                Occupied
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-warning-soft border border-dashed border-warning" />{' '}
                Maintenance
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Insurance & billing" />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Payer type" required defaultValue="self">
                <option value="self">Self-pay</option>
                <option>Insurance</option>
                <option>Corporate / TPA</option>
                <option>Government scheme</option>
              </Select>
              <Input label="Estimated cost" placeholder="₹85,000" mono />
              <Input
                label="Policy / TPA #"
                placeholder="e.g. STAR/2024/0048125"
                mono />
              
              <Input label="Deposit collected" placeholder="₹25,000" mono />
            </div>
          </Card>

          <Card>
            <SectionTitle title="Attendant" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Name" required placeholder="Anita Shah" />
              <Select label="Relation">
                <option>Spouse</option>
                <option>Son</option>
                <option>Daughter</option>
                <option>Parent</option>
                <option>Sibling</option>
                <option>Other</option>
              </Select>
              <Input label="Phone" required placeholder="+91" mono />
              <Input
                label="ID proof #"
                placeholder="Aadhaar/DL/Passport last 4 digits"
                mono />
              
            </div>
          </Card>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card>
            <SectionTitle title="Admission summary" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Patient
                </span>
                <span>Vikram Shah</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  IPD #
                </span>
                <MonoNumber>IPD-2026-00428</MonoNumber>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Bed
                </span>
                <MonoNumber>{selectedBed ?? '—'}</MonoNumber>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Doctor
                </span>
                <span>Dr. Anjali Rao</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  Expected stay
                </span>
                <MonoNumber>3 days</MonoNumber>
              </div>
              <div className="border-t border-line dark:border-line-dark pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-ink-secondary">
                  <span>Bed × 3 days</span>
                  <span className="font-mono">₹5,400</span>
                </div>
                <div className="flex justify-between text-ink-secondary">
                  <span>Estimated other</span>
                  <span className="font-mono">₹79,600</span>
                </div>
                <div className="flex justify-between font-medium pt-1.5 border-t border-line dark:border-line-dark">
                  <span>Estimated total</span>
                  <span className="font-mono">₹85,000</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Deposit</span>
                  <span className="font-mono">−₹25,000</span>
                </div>
              </div>
            </div>
          </Card>
          <div className="rounded-2xl bg-warning-soft/40 border border-warning-soft p-4 text-xs text-ink-secondary dark:text-ink-secondary-dark">
            <span className="font-semibold text-ink-primary dark:text-ink-primary-dark">
              Allergy alert:{' '}
            </span>
            Patient is allergic to{' '}
            <span className="font-semibold">Penicillin</span>. This will be
            flagged in the MAR and prescription system.
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-surface dark:bg-surface-dark border-t border-line dark:border-line-dark px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 z-20">
        <Link to="/ipd" className="hidden sm:block">
          <Button variant="ghost">Cancel</Button>
        </Link>
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap sm:justify-end [&>*]:shrink-0">
          <Link to="/ipd" className="sm:hidden">
            <Button variant="ghost">Cancel</Button>
          </Link>
          <Button variant="secondary">Save draft</Button>
          <Button variant="primary">
            <BedDoubleIcon className="w-4 h-4" />
            Admit patient
          </Button>
        </div>
      </div>
    </div>);

}