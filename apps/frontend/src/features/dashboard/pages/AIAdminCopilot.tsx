import React, { Component } from 'react';
import {
  SparklesIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  PackageIcon,
  UsersIcon,
  BanknoteIcon,
  ClockIcon,
  ArrowRightIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MonoNumber, MoneyText } from '@/components/ui/MonoNumber';
import { StatusBadge } from '@/components/ui/StatusBadge';
interface Insight {
  icon: ComponentType<any>;
  tone: 'info' | 'warning' | 'success' | 'danger';
  title: string;
  body: string;
  metric?: string;
  action: string;
}
const insights: Insight[] = [
{
  icon: BanknoteIcon,
  tone: 'warning',
  title: 'Possible revenue leakage — ₹14,200',
  body: '4 consultations completed today have no invoice generated yet. Token T-014, T-019, T-022, T-024.',
  metric: '₹14,200',
  action: 'Review unbilled visits'
},
{
  icon: ClockIcon,
  tone: 'warning',
  title: '3 patients waited over 30 minutes',
  body: 'Token T-017 has been in lab-pending since 09:50 (now 1h 12m). Consider express triage.',
  action: 'Open queue'
},
{
  icon: TrendingUpIcon,
  tone: 'success',
  title: 'Revenue up 18% week-over-week',
  body: 'Driven primarily by Cardiology (+32%) and Pharmacy (+24%). General Medicine flat.',
  action: 'View report'
},
{
  icon: PackageIcon,
  tone: 'danger',
  title: 'Stock-out: Cefixime 200mg',
  body: '4 prescriptions affected today. Last sale 2 days ago. Average weekly demand: 80 units. Suggested PO: 200 units.',
  action: 'Create PO'
},
{
  icon: UsersIcon,
  tone: 'info',
  title: 'No-show pattern — Wednesday mornings',
  body: 'Wednesday 09:00–11:00 slots have 22% no-show rate (vs avg 8%). Consider overbooking by 1 slot.',
  action: 'See pattern'
},
{
  icon: AlertCircleIcon,
  tone: 'warning',
  title: 'Dr. Verma is over-utilized',
  body: '14 appointments scheduled today (capacity 10). Average consultation time 22 min vs target 15 min.',
  action: 'Rebalance schedule'
}];

const toneStyles = {
  info: {
    bg: 'bg-info-soft',
    text: 'text-info'
  },
  warning: {
    bg: 'bg-warning-soft',
    text: 'text-warning'
  },
  success: {
    bg: 'bg-success-soft',
    text: 'text-success'
  },
  danger: {
    bg: 'bg-danger-soft',
    text: 'text-danger'
  }
};
export function AIAdminCopilot() {
  return (
    <div>
      <PageHeader
        title="AI Admin Copilot"
        description="Your daily operational briefing. AI surfaces revenue, staffing, stock, and patient-flow patterns worth your attention."
        breadcrumbs={[
        {
          label: 'AI Assistant'
        },
        {
          label: 'Admin Copilot'
        }]
        }
        meta={
        <div className="flex items-center gap-3 text-sm">
            <StatusBadge tone="accent" dot>
              Updated 4 minutes ago
            </StatusBadge>
            <span className="text-ink-tertiary">·</span>
            <span className="text-ink-secondary">
              <MonoNumber size="sm">6</MonoNumber> insights for today
            </span>
          </div>
        }
        actions={
        <Button variant="primary" icon={<SparklesIcon />}>
            Refresh analysis
          </Button>
        } />
      

      <Card className="mb-4 border-accent/30 bg-accent-soft/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0">
            <SparklesIcon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-1">Today's headline</h3>
            <p className="text-sm text-ink-primary dark:text-ink-primary-dark leading-relaxed">
              Hospeon Kochi is running smoothly with revenue tracking{' '}
              <span className="font-semibold">18% above</span> last Tuesday. Two
              operational risks worth addressing:{' '}
              <span className="font-semibold">
                ₹14,200 of unbilled consultations
              </span>{' '}
              and{' '}
              <span className="font-semibold">Cefixime 200mg stock-out</span>{' '}
              affecting 4 prescriptions. Patient wait times slightly elevated
              due to lab bottleneck before noon.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Button size="sm" variant="primary">
                Address ₹14,200 leakage
              </Button>
              <Button size="sm" variant="secondary">
                Order Cefixime now
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          const styles = toneStyles[insight.tone];
          return (
            <Card key={i} className="hover:shadow-soft transition-shadow">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-lg ${styles.bg} ${styles.text} flex items-center justify-center shrink-0`}>
                  
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-sm font-semibold text-ink-primary dark:text-ink-primary-dark">
                      {insight.title}
                    </h3>
                    {insight.metric &&
                    <MonoNumber
                      size="sm"
                      weight="semibold"
                      className={styles.text}>
                      
                        {insight.metric}
                      </MonoNumber>
                    }
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {insight.body}
                  </p>
                  <button className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
                    {insight.action} <ArrowRightIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Card>);

        })}
      </div>

      <Card className="mt-4">
        <SectionTitle
          title="Ask the copilot"
          description="Free-form questions about your clinic operations" />
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {[
          'Why is revenue up this week?',
          'Which doctor has the best follow-up rate?',
          'Top 5 medicines by margin this month',
          'What time of day has most no-shows?',
          'Staff workload comparison'].
          map((p) =>
          <button
            key={p}
            className="px-3 py-1.5 text-xs rounded-full bg-subtle dark:bg-subtle-dark text-ink-secondary hover:bg-line dark:hover:bg-line-dark hover:text-ink-primary">
            
              + {p}
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <input
            placeholder="Ask anything about your clinic operations…"
            className="flex-1 h-10 rounded-lg bg-surface dark:bg-surface-dark border border-line dark:border-line-dark px-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15" />
          
          <Button variant="primary">Ask</Button>
        </div>
        <p className="mt-2 text-[10px] text-ink-tertiary">
          AI analyses your operational data only — no patient health information
          used here. Always verify before acting on financial recommendations.
        </p>
      </Card>
    </div>);

}