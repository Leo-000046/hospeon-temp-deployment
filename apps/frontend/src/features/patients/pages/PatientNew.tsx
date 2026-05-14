import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  UserIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ShieldIcon,
  HeartPulseIcon } from
'lucide-react';
export function PatientNew() {
  return (
    <div className="pb-24">
      <PageHeader
        title="New patient registration"
        description="Register a new patient. All fields marked * are required."
        breadcrumbs={[
        {
          label: 'Patients',
          href: '/patients'
        },
        {
          label: 'New registration'
        }]
        } />
      

      <div className="space-y-4 max-w-4xl">
        <Card>
          <SectionTitle
            title="Basic details"
            description="Required for patient identification." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full name *"
              placeholder="e.g. Ramesh Kumar"
              icon={<UserIcon />} />
            
            <div className="grid grid-cols-2 gap-3">
              <Input label="Date of birth" type="date" mono />
              <Input label="Age" placeholder="0" mono />
            </div>
            <Select label="Gender *">
              <option>Select…</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>
            <Input
              label="Phone *"
              placeholder="+91"
              icon={<PhoneIcon />}
              mono />
            
            <Input label="Email" placeholder="optional" icon={<MailIcon />} />
            <Select label="Marital status">
              <option>Single</option>
              <option>Married</option>
              <option>Other</option>
            </Select>
            <Textarea
              label="Address"
              className="md:col-span-2"
              rows={2}
              placeholder="House, street, city, state, PIN" />
            
            <Input
              label="Emergency contact name"
              placeholder="Relation: spouse / parent / sibling" />
            
            <Input label="Emergency contact phone" mono icon={<PhoneIcon />} />
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Medical basics"
            description="Will appear on every consultation and prescription." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Blood group">
              <option>Unknown</option>
              <option>A+</option>
              <option>A−</option>
              <option>B+</option>
              <option>B−</option>
              <option>O+</option>
              <option>O−</option>
              <option>AB+</option>
              <option>AB−</option>
            </Select>
            <Input
              label="Allergies"
              placeholder="e.g. Penicillin, Sulfa drugs"
              icon={<HeartPulseIcon />} />
            
            <Input
              label="Known conditions"
              placeholder="e.g. Hypertension, Diabetes"
              className="md:col-span-2" />
            
            <Textarea
              label="Current medications"
              className="md:col-span-2"
              rows={2} />
            
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Identity"
            description="Optional. Linking ABHA enables digital health records." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="ID proof type">
              <option>Aadhaar</option>
              <option>PAN</option>
              <option>Voter ID</option>
              <option>Driving License</option>
              <option>Passport</option>
            </Select>
            <Input label="ID number" mono />
            <Input label="ABHA number" placeholder="14-digit" mono />
            <Input label="ABHA address" placeholder="username@abdm" />
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Consent"
            description="Mandatory for digital records and communications." />
          
          <div className="space-y-3">
            {[
            {
              label: 'I consent to digital storage of my health records',
              required: true
            },
            {
              label:
              'I consent to receive appointment reminders via SMS/WhatsApp',
              required: true
            },
            {
              label:
              'I consent to share data with referring doctors (when applicable)',
              required: false
            }].
            map((c, i) =>
            <label key={i} className="flex items-start gap-3 cursor-pointer">
                <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-line text-accent focus:ring-accent" />
              
                <div>
                  <p className="text-sm text-ink-primary dark:text-ink-primary-dark">
                    {c.label}
                  </p>
                  {c.required &&
                <p className="text-xs text-ink-tertiary mt-0.5">Required</p>
                }
                </div>
              </label>
            )}
          </div>
        </Card>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-surface/95 dark:bg-surface-dark/95 backdrop-blur border-t border-line dark:border-line-dark px-4 lg:px-6 py-3 z-10">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <p className="text-xs text-ink-tertiary hidden md:block">
            Patient ID will be auto-generated on save.
          </p>
          <div className="flex items-center gap-2 sm:ml-auto overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap sm:justify-end [&>*]:shrink-0">
            <Button variant="ghost">Cancel</Button>
            <Button variant="secondary">Save patient</Button>
            <Button variant="primary">Save & book appointment</Button>
          </div>
        </div>
      </div>
    </div>);

}