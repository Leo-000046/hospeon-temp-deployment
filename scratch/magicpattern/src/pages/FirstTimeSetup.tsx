import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  BuildingIcon,
  FileBadgeIcon,
  MapPinIcon,
  UsersIcon,
  SettingsIcon,
  RocketIcon } from
'lucide-react';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Input, Select } from '../components/primitives/Input';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { cn } from '../lib/cn';
const steps = [
{
  id: 1,
  title: 'Clinic identity',
  desc: 'Tell us about your practice',
  icon: <BuildingIcon className="w-4 h-4" />
},
{
  id: 2,
  title: 'Statutory details',
  desc: 'GST, PAN & licences',
  icon: <FileBadgeIcon className="w-4 h-4" />
},
{
  id: 3,
  title: 'Branches & departments',
  desc: 'Where do you operate?',
  icon: <MapPinIcon className="w-4 h-4" />
},
{
  id: 4,
  title: 'Invite your team',
  desc: 'Add doctors & staff',
  icon: <UsersIcon className="w-4 h-4" />
},
{
  id: 5,
  title: 'Preferences',
  desc: 'Final setup',
  icon: <SettingsIcon className="w-4 h-4" />
}];

export function FirstTimeSetup() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [departments, setDepartments] = useState<string[]>([
  'General Medicine',
  'Cardiology']
  );
  const [newDept, setNewDept] = useState('');
  const next = () => {
    if (step < 5) setStep(step + 1);else
    setDone(true);
  };
  const back = () => step > 1 && setStep(step - 1);
  if (done) {
    return (
      <div className="min-h-screen bg-canvas dark:bg-canvas-dark flex items-center justify-center p-6">
        <Card padding="lg" className="max-w-lg w-full text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-soft flex items-center justify-center mb-6">
            <RocketIcon className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-primary dark:text-ink-primary-dark mb-2">
            You're ready to go.
          </h1>
          <p className="text-base text-ink-secondary dark:text-ink-secondary-dark leading-relaxed">
            Hospeon is configured for your clinic. You can change any of these
            settings later under Settings → Organization.
          </p>
          <Link to="/" className="block mt-8">
            <Button variant="primary" className="w-full justify-center !py-3">
              Launch dashboard
            </Button>
          </Link>
        </Card>
      </div>);

  }
  return (
    <div className="min-h-screen bg-canvas dark:bg-canvas-dark grid grid-cols-1 lg:grid-cols-[320px_1fr]">
      {/* Progress rail */}
      <aside className="hidden lg:flex flex-col p-8 border-r border-line dark:border-line-dark bg-surface dark:bg-surface-dark">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
            <div className="w-4 h-4 rounded bg-white" />
          </div>
          <div className="text-base font-semibold text-ink-primary dark:text-ink-primary-dark">
            Hospeon
          </div>
        </div>

        <div className="text-xs uppercase tracking-wider text-ink-tertiary mb-4">
          Setup · Step <MonoNumber>{step}</MonoNumber> of{' '}
          <MonoNumber>5</MonoNumber>
        </div>

        <div className="space-y-1">
          {steps.map((s) => {
            const completed = s.id < step;
            const active = s.id === step;
            return (
              <div
                key={s.id}
                className={cn(
                  'flex items-start gap-3 px-3 py-3 rounded-xl',
                  active && 'bg-accent-soft'
                )}>
                
                <div
                  className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                    completed ?
                    'bg-accent text-white' :
                    active ?
                    'bg-accent text-white' :
                    'bg-subtle dark:bg-subtle-dark text-ink-tertiary'
                  )}>
                  
                  {completed ? <CheckIcon className="w-4 h-4" /> : s.icon}
                </div>
                <div>
                  <div
                    className={cn(
                      'text-sm font-medium',
                      active ?
                      'text-accent' :
                      'text-ink-primary dark:text-ink-primary-dark'
                    )}>
                    
                    {s.title}
                  </div>
                  <div className="text-xs text-ink-tertiary">{s.desc}</div>
                </div>
              </div>);

          })}
        </div>

        <div className="mt-auto pt-6 text-xs text-ink-tertiary">
          You can skip any optional step. Most clinics finish setup in{' '}
          <MonoNumber>~6 minutes</MonoNumber>.
        </div>
      </aside>

      {/* Form */}
      <main className="flex flex-col">
        <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 space-y-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-accent font-semibold">
              Step {step} of 5
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink-primary dark:text-ink-primary-dark mt-1">
              {steps[step - 1].title}
            </h1>
            <p className="text-base text-ink-secondary dark:text-ink-secondary-dark mt-1">
              {steps[step - 1].desc}
            </p>
          </div>

          {step === 1 &&
          <Card padding="lg" className="space-y-4">
              <Input
              label="Clinic name"
              required
              placeholder="e.g. Aaradhya Multispeciality Clinic" />
            
              <Select label="Type" required>
                <option>Single-doctor clinic</option>
                <option>Multispeciality clinic</option>
                <option>Day-care hospital</option>
                <option>Multi-branch hospital</option>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Established" placeholder="2018" />
                <Input
                label="Owner / contact name"
                placeholder="Dr. Anjali Rao" />
              
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-secondary dark:text-ink-secondary-dark mb-1.5">
                  Logo
                </label>
                <div className="border-2 border-dashed border-line dark:border-line-dark rounded-xl p-6 text-center text-sm text-ink-tertiary hover:border-accent cursor-pointer transition-colors">
                  Drop a square logo here or{' '}
                  <span className="text-accent">browse</span>
                  <div className="text-xs mt-1">PNG / SVG · max 2 MB</div>
                </div>
              </div>
            </Card>
          }

          {step === 2 &&
          <Card padding="lg" className="space-y-4">
              <p className="text-sm text-ink-secondary dark:text-ink-secondary-dark">
                These help us generate compliant invoices and reports. You can
                fill in later if you don't have all of these handy.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Input label="GSTIN" placeholder="29ABCDE1234F1Z5" mono />
                <Input label="PAN" placeholder="ABCDE1234F" mono />
              </div>
              <Input
              label="Clinic / hospital registration #"
              placeholder="KAR/2018/0042-CL"
              mono />
            
              <Input
              label="Drug licence #"
              hint="Required if you operate a pharmacy"
              placeholder="KA-B/20A/2024/00872"
              mono />
            
              <Input
              label="Biomedical waste authorization #"
              placeholder="KSPCB/BMW/2025/00412"
              mono />
            
            </Card>
          }

          {step === 3 &&
          <Card padding="lg" className="space-y-5">
              <SectionTitle title="Primary branch" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Branch name" required placeholder="Indiranagar" />
                <Input label="Phone" placeholder="+91 80 4123 4567" mono />
              </div>
              <Input
              label="Address"
              required
              placeholder="100 Ft Road, Indiranagar, Bengaluru 560038" />
            

              <div className="pt-2">
                <SectionTitle
                title="Departments"
                description="What services do you offer?" />
              
                <div className="flex flex-wrap gap-2 mt-3">
                  {departments.map((d) =>
                <span
                  key={d}
                  className="px-3 py-1.5 rounded-full bg-accent-soft text-accent text-xs font-medium flex items-center gap-1.5">
                  
                      {d}
                      <button
                    onClick={() =>
                    setDepartments(departments.filter((x) => x !== d))
                    }
                    className="opacity-60 hover:opacity-100">
                    
                        ×
                      </button>
                    </span>
                )}
                </div>
                <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newDept.trim()) {
                    setDepartments([...departments, newDept.trim()]);
                    setNewDept('');
                  }
                }}
                className="flex gap-2 mt-3">
                
                  <Input
                  className="flex-1"
                  placeholder="Add a department…"
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)} />
                
                  <Button type="submit" variant="secondary">
                    Add
                  </Button>
                </form>
              </div>
            </Card>
          }

          {step === 4 &&
          <Card padding="lg" className="space-y-4">
              <p className="text-sm text-ink-secondary dark:text-ink-secondary-dark">
                Invite your first 3 team members. Everyone gets an email with
                login instructions.
              </p>
              {[1, 2, 3].map((i) =>
            <div key={i} className="grid grid-cols-[1fr_180px] gap-3">
                  <Input placeholder={`teammate${i}@clinic.in`} type="email" />
                  <Select>
                    <option>Doctor</option>
                    <option>Receptionist</option>
                    <option>Nurse</option>
                    <option>Pharmacist</option>
                    <option>Lab technician</option>
                    <option>Accountant</option>
                    <option>Admin</option>
                  </Select>
                </div>
            )}
              <button className="text-sm text-accent hover:underline">
                + Add another
              </button>
            </Card>
          }

          {step === 5 &&
          <Card padding="lg" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Select label="Currency" defaultValue="INR">
                  <option value="INR">Indian Rupee (₹)</option>
                  <option>US Dollar ($)</option>
                </Select>
                <Select label="Timezone" defaultValue="IST">
                  <option value="IST">Asia/Kolkata (IST)</option>
                  <option>Asia/Dubai (GST)</option>
                </Select>
                <Select label="Language" defaultValue="en">
                  <option value="en">English</option>
                  <option>हिंदी (Hindi)</option>
                  <option>தமிழ் (Tamil)</option>
                  <option>తెలుగు (Telugu)</option>
                </Select>
                <Select label="Date format" defaultValue="dmy">
                  <option value="dmy">DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                label="Working hours · start"
                type="time"
                defaultValue="09:00"
                mono />
              
                <Input
                label="Working hours · end"
                type="time"
                defaultValue="20:00"
                mono />
              
              </div>
              <div className="rounded-xl bg-accent-soft/50 border border-accent-soft px-4 py-3 text-xs text-ink-secondary dark:text-ink-secondary-dark">
                We'll start you on the{' '}
                <span className="font-semibold text-ink-primary dark:text-ink-primary-dark">
                  14-day Pro trial
                </span>
                . No card required, full features unlocked.
              </div>
            </Card>
          }
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 bg-surface dark:bg-surface-dark border-t border-line dark:border-line-dark px-4 sm:px-6 py-3 sm:py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-2 flex-wrap [&>*]:shrink-0">
            <Button variant="ghost" onClick={back} disabled={step === 1}>
              <ArrowLeftIcon className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={next}
                className="hidden sm:inline-flex">
                
                Skip for now
              </Button>
              <Button variant="primary" onClick={next}>
                {step === 5 ? 'Finish setup' : 'Continue'}
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>);

}