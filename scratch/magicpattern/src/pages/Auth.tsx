import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MailIcon,
  LockIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon } from
'lucide-react';
import { Input } from '../components/primitives/Input';
import { Button } from '../components/primitives/Button';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { StatusBadge } from '../components/primitives/StatusBadge';
export function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-canvas dark:bg-canvas-dark">
      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white font-semibold">
              H
            </div>
            <div>
              <div className="text-base font-semibold">Hospeon</div>
              <div className="text-[11px] text-ink-tertiary -mt-0.5">
                by Webgeon
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-ink-secondary mb-8">
            Sign in to your clinic dashboard.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="space-y-4">
            
            <Input
              label="Email or phone"
              placeholder="you@clinic.com"
              icon={<MailIcon />} />
            
            <Input
              label="Password"
              placeholder="••••••••"
              type={showPwd ? 'text' : 'password'}
              icon={<LockIcon />}
              iconRight={
              <button type="button" onClick={() => setShowPwd((s) => !s)}>
                  {showPwd ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              } />
            

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-ink-secondary">
                <input type="checkbox" className="rounded text-accent" />{' '}
                Remember this device
              </label>
              <a className="text-accent hover:underline" href="#">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              iconRight={<ArrowRightIcon />}>
              
              Sign in
            </Button>
            <Button type="button" variant="secondary" fullWidth>
              Sign in with OTP instead
            </Button>
          </form>

          <div className="mt-8 flex items-center gap-2 text-xs text-ink-tertiary">
            <ShieldCheckIcon className="w-3.5 h-3.5" />
            <span>
              Protected by end-to-end encryption · SOC2 in progress · ABDM-ready
            </span>
          </div>
        </div>
      </div>

      {/* Right preview */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-subtle dark:bg-subtle-dark border-l border-line dark:border-line-dark">
        <div className="w-full max-w-md">
          <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-soft border border-line dark:border-line-dark p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold">
                  Good morning, Anjali
                </div>
                <div className="text-xs text-ink-tertiary">
                  Hospeon Kochi — MG Road
                </div>
              </div>
              <StatusBadge tone="success" dot size="sm">
                Live
              </StatusBadge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
              {
                l: 'Appointments',
                v: '44'
              },
              {
                l: 'Waiting',
                v: '8'
              },
              {
                l: 'Revenue today',
                v: '₹68,420'
              },
              {
                l: 'Bed occupancy',
                v: '68%'
              }].
              map((m) =>
              <div
                key={m.l}
                className="p-3 rounded-xl bg-subtle/60 dark:bg-subtle-dark/60">
                
                  <div className="text-[10px] uppercase tracking-wider text-ink-tertiary">
                    {m.l}
                  </div>
                  <MonoNumber size="xl" weight="semibold">
                    {m.v}
                  </MonoNumber>
                </div>
              )}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-accent-soft border border-accent/15">
              <div className="text-[10px] uppercase tracking-wider text-accent font-semibold mb-1">
                AI Insight
              </div>
              <p className="text-xs text-ink-primary dark:text-ink-primary-dark">
                3 patients have waited over 20 minutes. Consider moving
                lab-pending patients to express queue.
              </p>
            </div>
          </div>
          <p className="mt-6 text-xs text-ink-tertiary text-center max-w-sm mx-auto leading-relaxed">
            "Hospeon helped us cut patient wait time by 32% in the first month.
            Our front desk finally has breathing room."
            <br />— Dr. Anita Krishnan, Aster Clinic
          </p>
        </div>
      </div>
    </div>);

}
export function OTPVerify() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-canvas dark:bg-canvas-dark">
      <div className="w-full max-w-sm bg-surface dark:bg-surface-dark border border-line dark:border-line-dark rounded-2xl p-7 shadow-soft">
        <h1 className="text-xl font-semibold mb-1">Enter verification code</h1>
        <p className="text-sm text-ink-secondary mb-6">
          We sent a 6-digit code to{' '}
          <span className="font-mono">+91 98•••• 22014</span>.{' '}
          <a className="text-accent hover:underline">Change number</a>
        </p>
        <div className="flex gap-2 justify-between mb-4">
          {[1, 2, 3, 4, 5, 6].map((i) =>
          <input
            key={i}
            maxLength={1}
            className="w-11 h-12 rounded-lg border border-line dark:border-line-dark text-center font-mono text-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15" />

          )}
        </div>
        <p className="text-xs text-ink-tertiary mb-6">
          Resend code in <span className="font-mono">00:42</span>
        </p>
        <label className="flex items-center gap-2 text-xs text-ink-secondary mb-5">
          <input type="checkbox" className="rounded text-accent" /> Trust this
          device for 30 days
        </label>
        <Button variant="primary" fullWidth iconRight={<ArrowRightIcon />}>
          Verify & continue
        </Button>
      </div>
    </div>);

}