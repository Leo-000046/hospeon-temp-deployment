import React, { useState } from 'react';
import {
  PlusIcon,
  ShieldCheckIcon,
  SearchIcon,
  MoreHorizontalIcon } from
'lucide-react';
import { PageHeader } from '../components/primitives/PageHeader';
import { Card, SectionTitle } from '../components/primitives/Card';
import { Button, IconButton } from '../components/primitives/Button';
import { Input } from '../components/primitives/Input';
import { StatusBadge } from '../components/primitives/StatusBadge';
import { MonoNumber } from '../components/primitives/MonoNumber';
import { cn } from '../lib/cn';
export function Staff() {
  const staff = [
  {
    name: 'Dr. Anjali Menon',
    role: 'Clinic Admin',
    dept: 'General Medicine',
    branch: 'MG Road',
    status: 'Active',
    lastLogin: '2026-05-12 11:42',
    mfa: true
  },
  {
    name: 'Dr. Rahul Verma',
    role: 'Doctor',
    dept: 'Cardiology',
    branch: 'MG Road',
    status: 'Active',
    lastLogin: '2026-05-12 09:18',
    mfa: true
  },
  {
    name: 'Priya R.',
    role: 'Receptionist',
    dept: '—',
    branch: 'MG Road',
    status: 'Active',
    lastLogin: '2026-05-12 08:02',
    mfa: false
  },
  {
    name: 'Sini K.',
    role: 'Nurse',
    dept: 'OPD',
    branch: 'MG Road',
    status: 'Active',
    lastLogin: '2026-05-12 08:00',
    mfa: true
  },
  {
    name: 'Manoj P.',
    role: 'Pharmacist',
    dept: 'Pharmacy',
    branch: 'MG Road',
    status: 'Active',
    lastLogin: '2026-05-11 19:42',
    mfa: true
  },
  {
    name: 'Anu V.',
    role: 'Lab Technician',
    dept: 'Lab',
    branch: 'MG Road',
    status: 'Active',
    lastLogin: '2026-05-12 07:30',
    mfa: false
  },
  {
    name: 'Sunil K.',
    role: 'Accountant',
    dept: 'Billing',
    branch: 'MG Road',
    status: 'Disabled',
    lastLogin: '2026-04-20 16:11',
    mfa: false
  }];

  return (
    <div>
      <PageHeader
        title="Staff management"
        description="Manage doctors, nurses, receptionists and all team members."
        breadcrumbs={[
        {
          label: 'Settings'
        },
        {
          label: 'Staff'
        }]
        }
        actions={
        <Button variant="primary" icon={<PlusIcon />}>
            Invite staff
          </Button>
        } />
      

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="max-w-md flex-1">
            <Input
              icon={<SearchIcon />}
              placeholder="Search by name, email, role…" />
            
          </div>
        </div>
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line dark:border-line-dark text-xs text-ink-tertiary uppercase tracking-wide">
                <th className="py-2 text-left font-medium">Name</th>
                <th className="py-2 text-left font-medium">Role</th>
                <th className="py-2 text-left font-medium">Department</th>
                <th className="py-2 text-left font-medium">Branch</th>
                <th className="py-2 text-left font-medium">Status</th>
                <th className="py-2 text-left font-medium">Last login</th>
                <th className="py-2 text-left font-medium">MFA</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) =>
              <tr
                key={s.name}
                className="border-b border-line dark:border-line-dark last:border-0">
                
                  <td className="py-3 font-medium">{s.name}</td>
                  <td className="py-3">
                    <StatusBadge tone="neutral" size="sm">
                      {s.role}
                    </StatusBadge>
                  </td>
                  <td className="py-3 text-ink-secondary">{s.dept}</td>
                  <td className="py-3 text-ink-secondary">{s.branch}</td>
                  <td className="py-3">
                    <StatusBadge
                    tone={s.status === 'Active' ? 'success' : 'neutral'}
                    dot
                    size="sm">
                    
                      {s.status}
                    </StatusBadge>
                  </td>
                  <td className="py-3">
                    <MonoNumber size="sm" className="text-ink-secondary">
                      {s.lastLogin}
                    </MonoNumber>
                  </td>
                  <td className="py-3">
                    {s.mfa ?
                  <StatusBadge tone="success" size="sm">
                        Enabled
                      </StatusBadge> :

                  <StatusBadge tone="warning" size="sm">
                        Off
                      </StatusBadge>
                  }
                  </td>
                  <td className="py-3 text-right">
                    <IconButton size="sm" variant="ghost">
                      <MoreHorizontalIcon />
                    </IconButton>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>);

}
export function RolesPermissions() {
  const modules = [
  'Patients',
  'Appointments',
  'Consultations',
  'Prescriptions',
  'Lab orders',
  'Lab reports',
  'Pharmacy',
  'Invoices',
  'Payments',
  'Refunds',
  'IPD admissions',
  'Beds',
  'Reports',
  'Audit logs',
  'Staff',
  'Settings'];

  const actions = ['View', 'Create', 'Edit', 'Delete', 'Export', 'Approve'];
  const [role, setRole] = useState('Doctor');
  const [roles, setRoles] = useState([
  'Admin',
  'Doctor',
  'Receptionist',
  'Nurse',
  'Pharmacist',
  'Lab Technician',
  'Accountant']
  );
  const [showNewRole, setShowNewRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleBase, setNewRoleBase] = useState('Doctor');
  const createRole = () => {
    const name = newRoleName.trim();
    if (!name) return;
    if (roles.includes(name)) return;
    setRoles([...roles, name]);
    setRole(name);
    setNewRoleName('');
    setNewRoleBase('Doctor');
    setShowNewRole(false);
  };
  // Mock matrix: Doctor preset
  const preset: Record<string, Record<string, boolean>> = {};
  modules.forEach((m) => {
    preset[m] = {
      View: [
      'Patients',
      'Appointments',
      'Consultations',
      'Prescriptions',
      'Lab orders',
      'Lab reports',
      'IPD admissions'].
      includes(m),
      Create: ['Consultations', 'Prescriptions', 'Lab orders'].includes(m),
      Edit: ['Consultations', 'Prescriptions'].includes(m),
      Delete: false,
      Export: ['Lab reports'].includes(m),
      Approve: ['Lab reports'].includes(m)
    };
  });
  return (
    <div>
      <PageHeader
        title="Roles & permissions"
        description="Configure what each role can see and do across Hospeon."
        breadcrumbs={[
        {
          label: 'Settings'
        },
        {
          label: 'Roles & permissions'
        }]
        }
        actions={<Button variant="primary">Save changes</Button>} />
      

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
        <Card padded>
          <SectionTitle title="Roles" />
          <ul className="space-y-0.5">
            {roles.map((r) =>
            <li key={r}>
                <button
                onClick={() => setRole(r)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between',
                  role === r ?
                  'bg-subtle dark:bg-subtle-dark font-medium' :
                  'text-ink-secondary hover:bg-subtle/60 dark:hover:bg-subtle-dark/60'
                )}>
                
                  {r}
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-ink-tertiary" />
                </button>
              </li>
            )}
          </ul>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            className="mt-3"
            icon={<PlusIcon />}
            onClick={() => setShowNewRole(true)}>
            
            New role
          </Button>
        </Card>

        <Card>
          <SectionTitle
            title={`${role} — permissions`}
            description="Toggle access for each module." />
          
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line dark:border-line-dark">
                  <th className="text-left py-2 text-xs font-medium uppercase tracking-wide text-ink-tertiary">
                    Module
                  </th>
                  {actions.map((a) =>
                  <th
                    key={a}
                    className="text-center py-2 text-xs font-medium uppercase tracking-wide text-ink-tertiary">
                    
                      {a}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {modules.map((m) =>
                <tr
                  key={m}
                  className="border-b border-line dark:border-line-dark last:border-0">
                  
                    <td className="py-2.5 font-medium">{m}</td>
                    {actions.map((a) =>
                  <td key={a} className="text-center py-2.5">
                        <input
                      type="checkbox"
                      defaultChecked={preset[m][a]}
                      className="w-4 h-4 rounded border-line text-accent focus:ring-accent/30" />
                    
                      </td>
                  )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {showNewRole &&
      <div
        className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
        onClick={() => setShowNewRole(false)}>
        
          <div
          className="w-full max-w-md bg-surface dark:bg-surface-dark border border-line dark:border-line-dark rounded-2xl shadow-softer p-5"
          onClick={(e) => e.stopPropagation()}>
          
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="text-base font-semibold text-ink-primary dark:text-ink-primary-dark">
                  Create new role
                </h3>
                <p className="text-xs text-ink-tertiary mt-0.5">
                  Start from an existing role's permissions, then refine.
                </p>
              </div>
              <button
              onClick={() => setShowNewRole(false)}
              className="text-ink-tertiary hover:text-ink-primary text-lg leading-none px-1"
              aria-label="Close">
              
                ×
              </button>
            </div>

            <div className="space-y-3 mt-4">
              <Input
              label="Role name"
              placeholder="e.g. Senior Pharmacist"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') createRole();
              }} />
            
              <div>
                <label className="block text-xs font-medium text-ink-primary dark:text-ink-primary-dark mb-1.5">
                  Copy permissions from
                </label>
                <select
                value={newRoleBase}
                onChange={(e) => setNewRoleBase(e.target.value)}
                className="w-full h-9 rounded-lg bg-surface dark:bg-surface-dark border border-line dark:border-line-dark px-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15">
                
                  {roles.map((r) =>
                <option key={r}>{r}</option>
                )}
                  <option value="__blank__">Blank — no permissions</option>
                </select>
                <p className="mt-1 text-xs text-ink-tertiary">
                  You can edit the permission matrix after creating the role.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-5">
              <Button variant="ghost" onClick={() => setShowNewRole(false)}>
                Cancel
              </Button>
              <Button
              variant="primary"
              icon={<PlusIcon />}
              onClick={createRole}
              disabled={
              !newRoleName.trim() || roles.includes(newRoleName.trim())
              }>
              
                Create role
              </Button>
            </div>
          </div>
        </div>
      }
    </div>);

}