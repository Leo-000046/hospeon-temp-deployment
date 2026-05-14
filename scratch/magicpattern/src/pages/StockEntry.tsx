import React, { useState } from 'react';
import {
  SaveIcon,
  PlusIcon,
  TrashIcon,
  ScanBarcodeIcon,
  TruckIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button, IconButton } from '../components/primitives/Button';
import { Input, Select } from '../components/primitives/Input';
import { MonoNumber, MoneyText } from '../components/primitives/MonoNumber';
interface Row {
  medicine: string;
  batch: string;
  expiry: string;
  qty: number;
  free: number;
  purchase: number;
  mrp: number;
  gst: number;
}
export function StockEntry() {
  const [rows, setRows] = useState<Row[]>([
  {
    medicine: 'Metformin 500mg',
    batch: 'B-2284',
    expiry: '2027-03',
    qty: 200,
    free: 20,
    purchase: 28,
    mrp: 42,
    gst: 12
  },
  {
    medicine: 'Atorvastatin 20mg',
    batch: 'B-2412',
    expiry: '2027-08',
    qty: 100,
    free: 0,
    purchase: 54,
    mrp: 88,
    gst: 12
  },
  {
    medicine: 'Cefixime 200mg',
    batch: 'B-2188',
    expiry: '2027-06',
    qty: 200,
    free: 10,
    purchase: 88,
    mrp: 142,
    gst: 12
  }]
  );
  const subtotal = rows.reduce((s, r) => s + r.qty * r.purchase, 0);
  const gst = rows.reduce((s, r) => s + r.qty * r.purchase * r.gst / 100, 0);
  const total = subtotal + gst;
  return (
    <div className="pb-24">
      <PageHeader
        title="Stock entry"
        description="Record a new purchase from a supplier into your pharmacy inventory."
        breadcrumbs={[
        {
          label: 'Pharmacy'
        },
        {
          label: 'Stock'
        },
        {
          label: 'New entry'
        }]
        }
        actions={
        <Button variant="secondary" icon={<TruckIcon />}>
            View purchase orders
          </Button>
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <div className="space-y-4">
          <Card>
            <SectionTitle title="Supplier & invoice" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select label="Supplier *">
                <option>MediCorp Distributors</option>
                <option>PharmaWell India</option>
                <option>Apex Pharma</option>
              </Select>
              <Input
                label="Supplier invoice # *"
                mono
                placeholder="MC-2026-04412" />
              
              <Input
                label="Invoice date *"
                type="date"
                mono
                defaultValue="2026-05-12" />
              
              <Input
                label="Received date"
                type="date"
                mono
                defaultValue="2026-05-12" />
              
              <Select label="Branch">
                <option>Hospeon Kochi — MG Road</option>
                <option>Kakkanad</option>
              </Select>
              <Select label="Payment terms">
                <option>Credit 30 days</option>
                <option>Credit 60 days</option>
                <option>On delivery</option>
              </Select>
            </div>
          </Card>

          <Card padded={false}>
            <div className="p-5 border-b border-line dark:border-line-dark flex items-center justify-between">
              <h3 className="text-sm font-semibold">Line items</h3>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  icon={<ScanBarcodeIcon />}>
                  
                  Scan
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  icon={<PlusIcon />}
                  onClick={() =>
                  setRows([
                  ...rows,
                  {
                    medicine: '',
                    batch: '',
                    expiry: '',
                    qty: 0,
                    free: 0,
                    purchase: 0,
                    mrp: 0,
                    gst: 12
                  }]
                  )
                  }>
                  
                  Add row
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[900px]">
                <thead>
                  <tr className="border-b border-line dark:border-line-dark text-xs text-ink-tertiary uppercase tracking-wide">
                    <th className="text-left p-3 font-medium w-1/4">
                      Medicine
                    </th>
                    <th className="text-left p-3 font-medium">Batch</th>
                    <th className="text-left p-3 font-medium">Expiry</th>
                    <th className="text-right p-3 font-medium">Qty</th>
                    <th className="text-right p-3 font-medium">Free</th>
                    <th className="text-right p-3 font-medium">Purchase</th>
                    <th className="text-right p-3 font-medium">MRP</th>
                    <th className="text-right p-3 font-medium">GST</th>
                    <th className="text-right p-3 font-medium">Total</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) =>
                  <tr
                    key={i}
                    className="border-b border-line dark:border-line-dark last:border-0">
                    
                      <td className="p-2">
                        <Input
                        className="h-8 text-xs"
                        defaultValue={r.medicine}
                        placeholder="Search medicine" />
                      
                      </td>
                      <td className="p-2">
                        <Input
                        className="h-8 text-xs font-mono"
                        defaultValue={r.batch} />
                      
                      </td>
                      <td className="p-2">
                        <Input
                        className="h-8 text-xs font-mono"
                        defaultValue={r.expiry}
                        placeholder="YYYY-MM" />
                      
                      </td>
                      <td className="p-2">
                        <Input
                        className="h-8 text-xs font-mono text-right"
                        defaultValue={r.qty} />
                      
                      </td>
                      <td className="p-2">
                        <Input
                        className="h-8 text-xs font-mono text-right"
                        defaultValue={r.free} />
                      
                      </td>
                      <td className="p-2">
                        <Input
                        className="h-8 text-xs font-mono text-right"
                        defaultValue={r.purchase} />
                      
                      </td>
                      <td className="p-2">
                        <Input
                        className="h-8 text-xs font-mono text-right"
                        defaultValue={r.mrp} />
                      
                      </td>
                      <td className="p-2">
                        <Input
                        className="h-8 text-xs font-mono text-right"
                        defaultValue={`${r.gst}%`} />
                      
                      </td>
                      <td className="p-2 text-right">
                        <MoneyText
                        amount={r.qty * r.purchase}
                        size="sm"
                        weight="medium" />
                      
                      </td>
                      <td className="p-2 text-right">
                        <IconButton
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                        setRows(rows.filter((_, idx) => idx !== i))
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
        </div>

        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card>
            <SectionTitle title="Purchase summary" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Line items</dt>
                <dd>
                  <MonoNumber size="sm">{rows.length}</MonoNumber>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Total units</dt>
                <dd>
                  <MonoNumber size="sm">
                    {rows.reduce((s, r) => s + r.qty + r.free, 0)}
                  </MonoNumber>
                </dd>
              </div>
              <hr className="border-line dark:border-line-dark" />
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Subtotal</dt>
                <dd>
                  <MoneyText amount={subtotal} size="sm" />
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-secondary">GST</dt>
                <dd>
                  <MoneyText amount={gst} size="sm" />
                </dd>
              </div>
              <div className="flex justify-between pt-2 border-t border-line dark:border-line-dark">
                <dt className="font-semibold">Total</dt>
                <dd>
                  <MoneyText amount={total} size="lg" weight="semibold" />
                </dd>
              </div>
            </dl>
          </Card>

          <Card>
            <SectionTitle title="Stock impact" description="After this entry" />
            <ul className="space-y-2 text-xs">
              {rows.map((r, i) =>
              <li
                key={i}
                className="flex items-center justify-between py-1.5 border-b border-line dark:border-line-dark last:border-0">
                
                  <span className="text-ink-secondary truncate">
                    {r.medicine || `Row ${i + 1}`}
                  </span>
                  <span>
                    <MonoNumber size="xs">+{r.qty + r.free}</MonoNumber> units
                  </span>
                </li>
              )}
            </ul>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-surface/95 dark:bg-surface-dark/95 backdrop-blur border-t border-line dark:border-line-dark px-4 lg:px-6 py-3 z-10">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap sm:justify-end [&>*]:shrink-0">
          <Button variant="ghost">Cancel</Button>
          <Button variant="secondary">Save as draft</Button>
          <Button variant="primary" icon={<SaveIcon />}>
            Save & post to inventory
          </Button>
        </div>
      </div>
    </div>);

}