import React, { useState } from 'react';
import {
  PlusIcon,
  BuildingIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  EditIcon,
  MoreHorizontalIcon,
  UsersIcon,
  BedDoubleIcon } from
'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, SectionTitle } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { MonoNumber } from '@/components/ui/MonoNumber';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/cn';
const branchData = [
{
  id: 'br_1',
  name: 'Hospeon Kochi — MG Road',
  type: 'Clinic + Pharmacy',
  address: '2nd Floor, Aishwarya Towers, MG Road, Ernakulam',
  phone: '+91 484 4012 800',
  departments: [
  'General Medicine',
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Gynecology'],

  hours: 'Mon–Sat · 08:00–20:00 · Sun · Closed',
  staff: 12,
  beds: 8,
  billingPrefix: 'KMG',
  status: 'Active'
},
{
  id: 'br_2',
  name: 'Hospeon Kochi — Kakkanad',
  type: 'Clinic',
  address: 'InfoPark Road, Kakkanad, Kochi',
  phone: '+91 484 4012 801',
  departments: ['General Medicine', 'Pediatrics', 'ENT'],
  hours: 'Mon–Sat · 09:00–19:00 · Sun · 10:00–14:00',
  staff: 6,
  beds: 0,
  billingPrefix: 'KKK',
  status: 'Active'
},
{
  id: 'br_3',
  name: 'Hospeon Trivandrum',
  type: 'Hospital',
  address: 'Vellayambalam, Thiruvananthapuram',
  phone: '+91 471 4012 800',
  departments: [
  'General Medicine',
  'Cardiology',
  'Pulmonology',
  'Surgery',
  'IPD'],

  hours: '24×7',
  staff: 28,
  beds: 25,
  billingPrefix: 'TVM',
  status: 'Active'
}];

export function BranchesSettings() {
  const [selected, setSelected] = useState(branchData[0]);
  return (
    <div>
      <PageHeader
        title="Branches"
        description="Manage clinic and hospital locations, departments, and operating hours."
        breadcrumbs={[
        {
          label: 'Settings'
        },
        {
          label: 'Branches'
        }]
        }
        actions={
        <Button variant="primary" icon={<PlusIcon />}>
            New branch
          </Button>
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
        {/* Branch list */}
        <div className="space-y-3">
          {branchData.map((b) =>
          <button
            key={b.id}
            onClick={() => setSelected(b)}
            className={cn(
              'w-full text-left rounded-2xl border p-4 transition-colors',
              selected.id === b.id ?
              'border-accent bg-accent-soft/40' :
              'border-line dark:border-line-dark bg-surface dark:bg-surface-dark hover:bg-subtle/40 dark:hover:bg-subtle-dark/40'
            )}>
            
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <BuildingIcon className="w-4 h-4 text-ink-secondary" />
                  <span className="text-sm font-semibold">{b.name}</span>
                </div>
                <StatusBadge tone="success" dot size="sm">
                  {b.status}
                </StatusBadge>
              </div>
              <p className="text-xs text-ink-tertiary mb-1">{b.type}</p>
              <p className="text-xs text-ink-secondary line-clamp-2">
                {b.address}
              </p>
              <div className="mt-3 flex items-center gap-3 text-[10px] text-ink-tertiary">
                <span className="inline-flex items-center gap-1">
                  <UsersIcon className="w-3 h-3" />
                  <MonoNumber size="xs">{b.staff}</MonoNumber> staff
                </span>
                {b.beds > 0 &&
              <span className="inline-flex items-center gap-1">
                    <BedDoubleIcon className="w-3 h-3" />
                    <MonoNumber size="xs">{b.beds}</MonoNumber> beds
                  </span>
              }
              </div>
            </button>
          )}
        </div>

        {/* Selected branch detail */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold">{selected.name}</h2>
                <p className="text-xs text-ink-tertiary">
                  {selected.type} ·{' '}
                  <MonoNumber size="xs">{selected.id}</MonoNumber>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" icon={<EditIcon />}>
                  Edit
                </Button>
                <IconButton size="sm" variant="ghost">
                  <MoreHorizontalIcon />
                </IconButton>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Branch name"
                defaultValue={selected.name}
                icon={<BuildingIcon />} />
              
              <Select label="Branch type" defaultValue={selected.type}>
                <option>Clinic</option>
                <option>Clinic + Pharmacy</option>
                <option>Hospital</option>
                <option>Diagnostic Centre</option>
              </Select>
              <Input
                label="Address"
                defaultValue={selected.address}
                icon={<MapPinIcon />}
                className="md:col-span-2" />
              
              <Input
                label="Phone"
                defaultValue={selected.phone}
                icon={<PhoneIcon />}
                mono />
              
              <Input
                label="Billing prefix"
                defaultValue={selected.billingPrefix}
                mono
                hint="Will appear on invoice IDs (e.g. KMG-2026-04812)" />
              
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Departments"
              action={
              <Button size="sm" variant="secondary" icon={<PlusIcon />}>
                  Add
                </Button>
              } />
            
            <div className="flex flex-wrap gap-1.5">
              {selected.departments.map((d) =>
              <StatusBadge key={d} tone="neutral" size="md">
                  {d}
                </StatusBadge>
              )}
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Operating hours"
              action={
              <Button size="sm" variant="ghost">
                  Set holidays
                </Button>
              } />
            
            <div className="space-y-2">
              {[
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday'].
              map((day, i) =>
              <div
                key={day}
                className="flex items-center justify-between py-2 border-b border-line dark:border-line-dark last:border-0">
                
                  <span className="text-sm font-medium w-32">{day}</span>
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    {selected.id === 'br_3' ?
                  <StatusBadge tone="accent" dot size="sm">
                        24×7
                      </StatusBadge> :
                  i === 6 && selected.id === 'br_1' ?
                  <StatusBadge tone="neutral" size="sm">
                        Closed
                      </StatusBadge> :

                  <>
                        <Input
                      mono
                      className="w-20 h-8 text-xs"
                      defaultValue="08:00" />
                    
                        <span className="text-ink-tertiary text-xs">to</span>
                        <Input
                      mono
                      className="w-20 h-8 text-xs"
                      defaultValue="20:00" />
                    
                      </>
                  }
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <SectionTitle title="Resources" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
              {
                label: 'Staff',
                value: selected.staff,
                icon: UsersIcon
              },
              {
                label: 'Beds',
                value: selected.beds,
                icon: BedDoubleIcon
              },
              {
                label: 'Departments',
                value: selected.departments.length,
                icon: BuildingIcon
              },
              {
                label: 'Pharmacy SKUs',
                value: selected.id === 'br_2' ? 0 : 248,
                icon: BuildingIcon
              }].
              map((r, i) => {
                const Icon = r.icon;
                return (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-subtle/50 dark:bg-subtle-dark/50">
                    
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-tertiary mb-1">
                      <Icon className="w-3 h-3" />
                      {r.label}
                    </div>
                    <MonoNumber size="xl" weight="semibold">
                      {r.value}
                    </MonoNumber>
                  </div>);

              })}
            </div>
          </Card>
        </div>
      </div>
    </div>);

}