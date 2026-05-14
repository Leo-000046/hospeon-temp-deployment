import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, MailCheckIcon, ShieldCheckIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MonoNumber } from '@/components/ui/MonoNumber';
export function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-canvas dark:bg-canvas-dark">
      {/* Brand panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-surface dark:bg-surface-dark border-r border-line dark:border-line-dark">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
            <div className="w-4 h-4 rounded bg-white" />
          </div>
          <div className="text-base font-semibold text-ink-primary dark:text-ink-primary-dark">
            Hospeon
          </div>
        </div>

        <div className="max-w-md space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-accent-soft flex items-center justify-center">
            <ShieldCheckIcon className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-primary dark:text-ink-primary-dark leading-tight">
            We'll get you back in.
          </h1>
          <p className="text-base text-ink-secondary dark:text-ink-secondary-dark leading-relaxed">
            For your protection, password reset links are valid for{' '}
            <MonoNumber className="text-ink-primary dark:text-ink-primary-dark font-semibold">
              30 minutes
            </MonoNumber>{' '}
            and can only be used once.
          </p>
        </div>

        <div className="text-xs text-ink-tertiary">
          © 2026 Webgeon · Hospeon is HIPAA-aligned and ABDM-ready.
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary dark:hover:text-ink-primary-dark">
            
            <ArrowLeftIcon className="w-4 h-4" />
            Back to login
          </Link>

          {!sent ?
          <Card padding="lg">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-ink-primary dark:text-ink-primary-dark">
                  Reset your password
                </h2>
                <p className="text-sm text-ink-secondary dark:text-ink-secondary-dark">
                  Enter the email associated with your Hospeon account. We'll
                  send you a secure link to choose a new password.
                </p>
              </div>

              <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4">
              
                <Input
                label="Email"
                type="email"
                required
                placeholder="you@clinic.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              
                <Button
                type="submit"
                variant="primary"
                className="w-full justify-center">
                
                  Send reset link
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-line dark:border-line-dark text-xs text-ink-tertiary">
                Need help? Contact your clinic admin or reach support at{' '}
                <span className="text-ink-secondary dark:text-ink-secondary-dark">
                  support@webgeon.in
                </span>
                .
              </div>
            </Card> :

          <Card padding="lg">
              <div className="w-12 h-12 rounded-2xl bg-success-soft flex items-center justify-center mb-5">
                <MailCheckIcon className="w-6 h-6 text-success" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink-primary dark:text-ink-primary-dark mb-2">
                Check your inbox
              </h2>
              <p className="text-sm text-ink-secondary dark:text-ink-secondary-dark leading-relaxed">
                We've sent a password reset link to{' '}
                <span className="font-mono text-ink-primary dark:text-ink-primary-dark">
                  {email ?
                email.replace(/(.{1}).+(@.+)/, '$1•••$2') :
                'd•••@clinic.in'}
                </span>
                . The link is valid for{' '}
                <MonoNumber className="font-semibold">30 minutes</MonoNumber>.
              </p>

              <div className="mt-6 space-y-2 text-xs text-ink-tertiary">
                <div>• Didn't get it? Check your spam folder.</div>
                <div>
                  • Still nothing after 5 minutes?{' '}
                  <button
                  onClick={() => setSent(false)}
                  className="text-accent hover:underline">
                  
                    Try a different email
                  </button>
                  .
                </div>
              </div>

              <Link to="/login" className="block mt-6">
                <Button variant="secondary" className="w-full justify-center">
                  Return to login
                </Button>
              </Link>
            </Card>
          }
        </div>
      </div>
    </div>);

}