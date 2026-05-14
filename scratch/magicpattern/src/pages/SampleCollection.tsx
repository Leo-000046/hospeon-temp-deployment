import React, { useState } from 'react';
import {
  ScanLineIcon,
  PrinterIcon,
  CheckIcon,
  AlertCircleIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Input, Select, Textarea } from '../components/primitives/Input';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { DataTable } from '../components/primitives/DataTable';
import { cn } from '../lib/cn';
const tubeColor: Record<string, string> = {
  Lavender: 'bg-purple-200 text-purple-900 border-purple-300',
  Red: 'bg-red-200 text-red-900 border-red-300',
  'Yellow (SST)': 'bg-yellow-200 text-yellow-900 border-yellow-300',
  Green: 'bg-green-200 text-green-900 border-green-300',
  Blue: 'bg-blue-200 text-blue-900 border-blue-300'
};
const tests = [
{
  name: 'Complete Blood Count (CBC)',
  tube: 'Lavender',
  volume: '2 mL',
  container: 'EDTA',
  fasting: false
},
{
  name: 'Lipid Profile',
  tube: 'Yellow (SST)',
  volume: '3 mL',
  container: 'SST gel',
  fasting: true
},
{
  name: 'HbA1c',
  tube: 'Lavender',
  volume: '2 mL',
  container: 'EDTA',
  fasting: false
},
{
  name: 'Liver Function Test',
  tube: 'Yellow (SST)',
  volume: '3 mL',
  container: 'SST gel',
  fasting: true
},
{
  name: 'Coagulation (PT/INR)',
  tube: 'Blue',
  volume: '2.7 mL',
  container: 'Sodium citrate',
  fasting: false
}];

const pendingToday = [
{
  id: 'LAB-2026-04902',
  patient: 'Vikram Shah',
  tests: 'CBC, LFT, Renal Panel',
  requested: '09:48'
},
{
  id: 'LAB-2026-04903',
  patient: 'Kavita Iyer',
  tests: 'Thyroid Profile',
  requested: '10:02'
},
{
  id: 'LAB-2026-04904',
  patient: 'Suresh Pillai',
  tests: 'Vitamin D, B12',
  requested: '10:15'
}];

export function SampleCollection() {
  const [orderId, setOrderId] = useState('LAB-2026-04901');
  const [checks, setChecks] = useState({
    id: true,
    fasting: true,
    labels: false,
    volume: false
  });
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sample collection"
        description="Verify, draw, and label patient samples"
        actions={
        <div className="flex gap-2 max-w-md">
            <Input
            icon={<ScanLineIcon className="w-4 h-4" />}
            placeholder="Scan or enter order ID…"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            mono />
          
            <Button variant="primary">Lookup</Button>
          </div>
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-line dark:border-line-dark">
              <div>
                <MonoNumber className="text-xs text-ink-tertiary">
                  {orderId}
                </MonoNumber>
                <div className="text-base font-semibold text-ink-primary dark:text-ink-primary-dark mt-1">
                  Anjali Kapoor
                </div>
                <div className="text-xs text-ink-secondary dark:text-ink-secondary-dark">
                  <MonoNumber>P-100482</MonoNumber> · 54F · Fasting confirmed ·
                  Requested by Dr. Rao
                </div>
              </div>
              <Button variant="secondary">
                <PrinterIcon className="w-4 h-4" />
                Print labels
              </Button>
            </div>

            <SectionTitle
              title="Tests requested"
              description="5 tests · 4 tubes required" />
            
            <div className="space-y-2 mt-3">
              {tests.map((t) =>
              <div
                key={t.name}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-line dark:border-line-dark">
                
                  <div
                  className={cn(
                    'px-2 py-1 rounded text-[10px] font-semibold border',
                    tubeColor[t.tube]
                  )}>
                  
                    {t.tube}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ink-primary dark:text-ink-primary-dark">
                      {t.name}
                    </div>
                    <div className="text-xs text-ink-tertiary">
                      {t.container} · <MonoNumber>{t.volume}</MonoNumber>
                    </div>
                  </div>
                  {t.fasting &&
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-warning-soft text-warning font-semibold">
                      Fasting
                    </span>
                }
                </div>
              )}
            </div>

            <div className="mt-5 pt-5 border-t border-line dark:border-line-dark">
              <SectionTitle title="Barcode" />
              <div className="rounded-xl border border-line dark:border-line-dark bg-subtle/40 dark:bg-subtle-dark/40 p-6 flex items-center gap-6">
                <div className="font-mono text-xs leading-none flex flex-col items-center">
                  <div className="flex gap-[1px] mb-2">
                    {Array.from({
                      length: 32
                    }).map((_, i) =>
                    <div
                      key={i}
                      className="bg-ink-primary dark:bg-ink-primary-dark"
                      style={{
                        width: i % 3 === 0 ? 3 : 1,
                        height: 48
                      }} />

                    )}
                  </div>
                  <MonoNumber>{orderId}</MonoNumber>
                </div>
                <div className="text-xs text-ink-secondary dark:text-ink-secondary-dark space-y-1">
                  <div>Anjali Kapoor · 54F</div>
                  <div>
                    <MonoNumber>P-100482</MonoNumber>
                  </div>
                  <div>
                    Collected: <MonoNumber>—</MonoNumber>
                  </div>
                  <div>
                    Tubes: <MonoNumber>4</MonoNumber> (Lavender ×2, SST ×1, Blue
                    ×1)
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Pending collections today"
              description="3 patients waiting" />
            
            <DataTable
              data={pendingToday}
              columns={[
              {
                key: 'id',
                header: 'Order',
                render: (r) => <MonoNumber>{r.id}</MonoNumber>
              },
              {
                key: 'patient',
                header: 'Patient'
              },
              {
                key: 'tests',
                header: 'Tests'
              },
              {
                key: 'requested',
                header: 'Requested',
                align: 'right',
                render: (r) =>
                <MonoNumber className="text-ink-tertiary">
                      {r.requested}
                    </MonoNumber>

              },
              {
                key: 'action',
                header: '',
                align: 'right',
                render: () =>
                <Button variant="ghost" className="!py-1 !px-2.5 text-xs">
                      Open
                    </Button>

              }]
              }
              dense />
            
          </Card>
        </div>

        {/* Checklist */}
        <div className="space-y-6">
          <Card>
            <SectionTitle
              title="Collection checklist"
              description="Confirm before drawing" />
            
            <div className="space-y-2.5 text-sm">
              {[
              ['id', 'Patient ID verified (name + DOB)'],
              ['fasting', 'Fasting status confirmed'],
              ['labels', 'Tubes labeled with barcode'],
              ['volume', 'Sample volume adequate']].
              map(([key, label]) =>
              <label key={key} className="flex items-start gap-3">
                  <input
                  type="checkbox"
                  checked={(checks as any)[key]}
                  onChange={(e) =>
                  setChecks({
                    ...checks,
                    [key]: e.target.checked
                  })
                  }
                  className="mt-0.5 rounded" />
                
                  <span className="text-ink-primary dark:text-ink-primary-dark">
                    {label}
                  </span>
                </label>
              )}
            </div>

            <div className="border-t border-line dark:border-line-dark mt-5 pt-5 space-y-3">
              <Input
                label="Collected by"
                defaultValue="Sneha Reddy · LT-014"
                mono />
              
              <Input
                label="Collected at"
                type="datetime-local"
                defaultValue="2026-05-12T10:42"
                mono />
              
              <Select label="Sample condition">
                <option>Acceptable</option>
                <option>Hemolyzed</option>
                <option>Lipemic</option>
                <option>Insufficient volume</option>
                <option>Clotted</option>
              </Select>
              <Textarea
                label="Notes (optional)"
                rows={2}
                placeholder="Difficult draw, second attempt successful…" />
              
            </div>
          </Card>

          <div className="rounded-2xl bg-warning-soft/40 border border-warning-soft p-4 text-xs flex gap-2.5">
            <AlertCircleIcon className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <div className="text-ink-secondary dark:text-ink-secondary-dark">
              Always verify patient identity using{' '}
              <span className="font-semibold text-ink-primary dark:text-ink-primary-dark">
                two identifiers
              </span>{' '}
              before collection.
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1">
              Save draft
            </Button>
            <Button variant="primary" className="flex-1">
              <CheckIcon className="w-4 h-4" />
              Mark collected
            </Button>
          </div>
        </div>
      </div>
    </div>);

}