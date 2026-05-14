import React, { useState } from 'react';
import {
  SearchIcon,
  PlusIcon,
  TrashIcon,
  ScanBarcodeIcon,
  AlertTriangleIcon,
  UserIcon,
  BanknoteIcon,
  PrinterIcon,
  FileTextIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button, IconButton } from '../components/primitives/Button';
import { Input, Select } from '../components/primitives/Input';
import { MonoNumber, MoneyText } from '../components/primitives/MonoNumber';
import { StatusBadge } from '../components/primitives/StatusBadge';
import { medicines } from '../lib/mockData';
interface CartItem {
  name: string;
  generic: string;
  batch: string;
  expiry: string;
  qty: number;
  mrp: number;
  gst: number;
  available: number;
}
const initialCart: CartItem[] = [
{
  name: 'Metformin 500mg',
  generic: 'Metformin Hydrochloride',
  batch: 'B-2284',
  expiry: '2027-03',
  qty: 60,
  mrp: 42,
  gst: 12,
  available: 240
},
{
  name: 'Telmisartan 40mg',
  generic: 'Telmisartan',
  batch: 'B-1142',
  expiry: '2027-08',
  qty: 30,
  mrp: 86,
  gst: 12,
  available: 96
},
{
  name: 'Atorvastatin 20mg',
  generic: 'Atorvastatin Calcium',
  batch: 'B-2241',
  expiry: '2026-08',
  qty: 30,
  mrp: 88,
  gst: 12,
  available: 92
}];

export function PharmacySale() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [search, setSearch] = useState('');
  const [discount, setDiscount] = useState(50);
  const subtotal = cart.reduce((s, i) => s + i.qty * i.mrp, 0);
  const gst = cart.reduce((s, i) => s + i.qty * i.mrp * i.gst / 100, 0);
  const total = subtotal + gst - discount;
  const suggestions = medicines.
  filter(
    (m) =>
    search &&
    m.name.toLowerCase().includes(search.toLowerCase()) &&
    !cart.find((c) => c.name === m.name)
  ).
  slice(0, 5);
  return (
    <div>
      <PageHeader
        title="Pharmacy sale"
        description="Bill medicines against a prescription or as over-the-counter."
        breadcrumbs={[
        {
          label: 'Pharmacy'
        },
        {
          label: 'Sales'
        },
        {
          label: 'New sale'
        }]
        }
        actions={
        <>
            <Button variant="secondary" icon={<FileTextIcon />}>
              Open prescription
            </Button>
            <Button variant="ghost">Hold sale</Button>
          </>
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4">
        {/* Left: medicine search + cart */}
        <div className="space-y-4">
          <Card>
            <SectionTitle
              title="Add medicine"
              description="Search by name, generic, or scan barcode" />
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  icon={<SearchIcon />}
                  placeholder="Search Metformin, Paracetamol, B-2284…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} />
                
                {suggestions.length > 0 &&
                <div className="absolute top-full left-0 right-0 mt-1 bg-surface dark:bg-surface-dark border border-line dark:border-line-dark rounded-xl shadow-pop py-1.5 z-20 max-h-72 overflow-y-auto">
                    {suggestions.map((m) =>
                  <button
                    key={m.name}
                    onClick={() => {
                      setCart([
                      ...cart,
                      {
                        name: m.name,
                        generic: m.generic,
                        batch:
                        'B-' + Math.floor(Math.random() * 9000 + 1000),
                        expiry: '2027-06',
                        qty: 1,
                        mrp: m.mrp,
                        gst: 12,
                        available: m.stock
                      }]
                      );
                      setSearch('');
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-subtle dark:hover:bg-subtle-dark flex items-center justify-between gap-3">
                    
                        <div>
                          <div className="text-sm font-medium">{m.name}</div>
                          <div className="text-xs text-ink-tertiary">
                            {m.generic}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <MoneyText amount={m.mrp} size="sm" />
                          <div className="text-[10px] text-ink-tertiary">
                            Stock: <MonoNumber size="xs">{m.stock}</MonoNumber>
                          </div>
                        </div>
                      </button>
                  )}
                  </div>
                }
              </div>
              <Button variant="secondary" icon={<ScanBarcodeIcon />}>
                Scan
              </Button>
            </div>
          </Card>

          <Card padded={false}>
            <div className="p-5 border-b border-line dark:border-line-dark flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Cart</h3>
                <p className="text-xs text-ink-tertiary">
                  <MonoNumber size="xs">{cart.length}</MonoNumber> items ·{' '}
                  <MonoNumber size="xs">
                    {cart.reduce((s, i) => s + i.qty, 0)}
                  </MonoNumber>{' '}
                  units
                </p>
              </div>
              <Button size="sm" variant="ghost">
                Clear cart
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line dark:border-line-dark text-xs uppercase tracking-wide text-ink-tertiary">
                    <th className="text-left p-3 font-medium">Medicine</th>
                    <th className="text-left p-3 font-medium">
                      Batch / Expiry
                    </th>
                    <th className="text-right p-3 font-medium">Stock</th>
                    <th className="text-center p-3 font-medium">Qty</th>
                    <th className="text-right p-3 font-medium">MRP</th>
                    <th className="text-right p-3 font-medium">Total</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, i) => {
                    const expiringSoon = item.expiry < '2027-01';
                    return (
                      <tr
                        key={i}
                        className="border-b border-line dark:border-line-dark last:border-0">
                        
                        <td className="p-3">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-ink-tertiary">
                            {item.generic}
                          </div>
                        </td>
                        <td className="p-3">
                          <MonoNumber size="sm">{item.batch}</MonoNumber>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <MonoNumber
                              size="xs"
                              className={
                              expiringSoon ?
                              'text-warning' :
                              'text-ink-tertiary'
                              }>
                              
                              {item.expiry}
                            </MonoNumber>
                            {expiringSoon &&
                            <AlertTriangleIcon className="w-3 h-3 text-warning" />
                            }
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <MonoNumber size="sm" className="text-ink-secondary">
                            {item.available}
                          </MonoNumber>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() =>
                              setCart(
                                cart.map((c, idx) =>
                                idx === i ?
                                {
                                  ...c,
                                  qty: Math.max(1, c.qty - 1)
                                } :
                                c
                                )
                              )
                              }
                              className="w-6 h-6 rounded-md bg-subtle dark:bg-subtle-dark hover:bg-line text-sm">
                              
                              −
                            </button>
                            <input
                              value={item.qty}
                              onChange={(e) =>
                              setCart(
                                cart.map((c, idx) =>
                                idx === i ?
                                {
                                  ...c,
                                  qty: parseInt(e.target.value) || 0
                                } :
                                c
                                )
                              )
                              }
                              className="w-12 h-7 rounded-md bg-surface dark:bg-surface-dark border border-line dark:border-line-dark text-center font-mono text-sm" />
                            
                            <button
                              onClick={() =>
                              setCart(
                                cart.map((c, idx) =>
                                idx === i ?
                                {
                                  ...c,
                                  qty: c.qty + 1
                                } :
                                c
                                )
                              )
                              }
                              className="w-6 h-6 rounded-md bg-subtle dark:bg-subtle-dark hover:bg-line text-sm">
                              
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <MoneyText amount={item.mrp} size="sm" />
                        </td>
                        <td className="p-3 text-right">
                          <MoneyText
                            amount={item.qty * item.mrp}
                            weight="medium"
                            size="sm" />
                          
                        </td>
                        <td className="p-3 text-right">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                            setCart(cart.filter((_, idx) => idx !== i))
                            }>
                            
                            <TrashIcon />
                          </IconButton>
                        </td>
                      </tr>);

                  })}
                  {cart.length === 0 &&
                  <tr>
                      <td
                      colSpan={7}
                      className="p-12 text-center text-sm text-ink-tertiary">
                      
                        Cart is empty. Search for medicines above.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </Card>

          {/* Substitute warning */}
          <Card className="border-warning/30 bg-warning-soft/40">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon className="w-4 h-4 text-warning mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink-primary dark:text-ink-primary-dark">
                  Generic substitute available
                </p>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Atorvastatin 20mg can be substituted with{' '}
                  <span className="font-medium">Atorva-20 (₹52)</span> for ₹36
                  savings per pack. Patient may save ₹1,080 over 30-day course.
                </p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="secondary">
                    Suggest to patient
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Patient + Summary + Payment */}
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card>
            <SectionTitle title="Patient" />
            <Input
              icon={<UserIcon />}
              placeholder="Search patient or walk-in" />
            
            <div className="mt-3 p-3 rounded-lg bg-subtle/60 dark:bg-subtle-dark/60 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Ramesh Kumar</div>
                <MonoNumber size="xs" className="text-ink-tertiary">
                  P-100482 · Rx by Dr. Anjali
                </MonoNumber>
              </div>
              <StatusBadge tone="success" size="sm" dot>
                Linked
              </StatusBadge>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Bill summary" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Subtotal</dt>
                <dd>
                  <MoneyText amount={subtotal} size="sm" />
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-secondary">GST (avg 12%)</dt>
                <dd>
                  <MoneyText amount={gst} size="sm" />
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-ink-secondary">Discount</dt>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                  className="w-20 h-7 rounded-md border border-line dark:border-line-dark bg-surface dark:bg-surface-dark px-2 text-right font-mono text-xs" />
                
              </div>
              <div className="flex justify-between pt-2 border-t border-line dark:border-line-dark">
                <dt className="font-semibold">Total payable</dt>
                <dd>
                  <MoneyText amount={total} size="lg" weight="semibold" />
                </dd>
              </div>
            </dl>
          </Card>

          <Card>
            <SectionTitle title="Payment" />
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
              {
                l: 'Cash',
                active: false
              },
              {
                l: 'UPI',
                active: true
              },
              {
                l: 'Card',
                active: false
              },
              {
                l: 'Split',
                active: false
              }].
              map((m) =>
              <button
                key={m.l}
                className={`h-10 rounded-lg border text-sm font-medium ${m.active ? 'border-accent bg-accent-soft text-accent' : 'border-line dark:border-line-dark text-ink-secondary hover:bg-subtle dark:hover:bg-subtle-dark'}`}>
                
                  {m.l}
                </button>
              )}
            </div>
            <Input label="Reference / UTR" mono placeholder="Optional" />
            <Button
              variant="primary"
              fullWidth
              icon={<BanknoteIcon />}
              className="mt-3">
              
              Collect <MoneyText amount={total} className="ml-1" />
            </Button>
            <Button
              variant="secondary"
              fullWidth
              icon={<PrinterIcon />}
              className="mt-2">
              
              Save & print bill
            </Button>
          </Card>
        </div>
      </div>
    </div>);

}