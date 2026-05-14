import React, { useState } from 'react';
import {
  TrashIcon,
  PlusIcon,
  SearchIcon,
  PrinterIcon,
  SendIcon,
  BanknoteIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Input, Select, Textarea } from '../components/primitives/Input';
import { Button, IconButton } from '../components/primitives/Button';
import { MonoNumber, MoneyText } from '../components/primitives/MonoNumber';
export function CreateInvoice() {
  const [items, setItems] = useState([
  {
    name: 'Consultation — Dr. Anjali Menon',
    qty: 1,
    rate: 600,
    discount: 0
  },
  {
    name: 'CBC + Lipid Profile + HbA1c',
    qty: 1,
    rate: 1200,
    discount: 100
  },
  {
    name: 'Metformin 500mg (60 tabs)',
    qty: 1,
    rate: 252,
    discount: 0
  }]
  );
  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const discount = items.reduce((s, i) => s + i.discount, 0);
  const taxable = subtotal - discount;
  const tax = Math.round(taxable * 0.05);
  const total = taxable + tax;
  return (
    <div className="pb-24">
      <PageHeader
        title="New invoice"
        breadcrumbs={[
        {
          label: 'Billing',
          href: '/billing/invoices'
        },
        {
          label: 'New invoice'
        }]
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <div className="space-y-4">
          <Card>
            <SectionTitle title="Patient" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Search patient"
                icon={<SearchIcon />}
                placeholder="Name, phone, or P-ID" />
              
              <Select label="Visit / Reference">
                <option>Today's visit — Token T-014</option>
                <option>Lab order LAB-2026-1243</option>
              </Select>
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Services"
              action={
              <Button size="sm" variant="secondary" icon={<PlusIcon />}>
                  Add line
                </Button>
              } />
            
            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line dark:border-line-dark">
                    <th className="py-2 text-left text-xs font-medium text-ink-tertiary uppercase tracking-wide">
                      Description
                    </th>
                    <th className="py-2 text-right text-xs font-medium text-ink-tertiary uppercase tracking-wide w-16">
                      Qty
                    </th>
                    <th className="py-2 text-right text-xs font-medium text-ink-tertiary uppercase tracking-wide w-24">
                      Rate
                    </th>
                    <th className="py-2 text-right text-xs font-medium text-ink-tertiary uppercase tracking-wide w-24">
                      Discount
                    </th>
                    <th className="py-2 text-right text-xs font-medium text-ink-tertiary uppercase tracking-wide w-28">
                      Total
                    </th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) =>
                  <tr
                    key={i}
                    className="border-b border-line dark:border-line-dark last:border-0">
                    
                      <td className="py-3 pr-2">
                        <div className="font-medium">{it.name}</div>
                      </td>
                      <td className="py-3 text-right">
                        <MonoNumber size="sm">{it.qty}</MonoNumber>
                      </td>
                      <td className="py-3 text-right">
                        <MoneyText amount={it.rate} size="sm" />
                      </td>
                      <td className="py-3 text-right">
                        <MoneyText
                        amount={it.discount}
                        size="sm"
                        className="text-ink-secondary" />
                      
                      </td>
                      <td className="py-3 text-right">
                        <MoneyText
                        amount={it.qty * it.rate - it.discount}
                        weight="medium"
                        size="sm" />
                      
                      </td>
                      <td className="py-3 text-right">
                        <IconButton
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                        setItems(items.filter((_, x) => x !== i))
                        }>
                        
                          <TrashIcon />
                        </IconButton>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Notes" />
            <Textarea
              placeholder="Internal notes or notes for the patient…"
              rows={2} />
            
          </Card>
        </div>

        {/* Sticky summary */}
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card>
            <SectionTitle title="Summary" />
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Subtotal</dt>
                <dd>
                  <MoneyText amount={subtotal} size="sm" />
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Discount</dt>
                <dd className="text-ink-secondary">
                  − <MoneyText amount={discount} size="sm" className="inline" />
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Taxable</dt>
                <dd>
                  <MoneyText amount={taxable} size="sm" />
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-secondary">GST (5%)</dt>
                <dd>
                  <MoneyText amount={tax} size="sm" />
                </dd>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-line dark:border-line-dark">
                <dt className="font-semibold">Total</dt>
                <dd>
                  <MoneyText amount={total} weight="semibold" size="lg" />
                </dd>
              </div>
            </dl>
          </Card>

          <Card>
            <SectionTitle title="Payment" />
            <div className="space-y-3">
              <Select label="Payment mode">
                <option>Cash</option>
                <option>UPI</option>
                <option>Card</option>
                <option>Bank transfer</option>
                <option>Online gateway</option>
              </Select>
              <Input
                label="Amount received"
                mono
                defaultValue={total.toString()} />
              
              <Input
                label="Reference / Transaction ID"
                mono
                placeholder="optional" />
              
              <Button variant="primary" fullWidth icon={<BanknoteIcon />}>
                Collect & save
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-surface/95 dark:bg-surface-dark/95 backdrop-blur border-t border-line dark:border-line-dark px-4 lg:px-6 py-3 z-10">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap sm:justify-end [&>*]:shrink-0">
          <Button variant="ghost">Cancel</Button>
          <Button variant="secondary" icon={<PrinterIcon />}>
            Save & print
          </Button>
          <Button variant="secondary" icon={<SendIcon />}>
            Save & send
          </Button>
          <Button variant="primary">Save invoice</Button>
        </div>
      </div>
    </div>);

}