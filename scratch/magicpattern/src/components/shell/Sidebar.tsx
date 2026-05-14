import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  UsersIcon,
  CalendarIcon,
  StethoscopeIcon,
  BedDoubleIcon,
  FlaskConicalIcon,
  PillIcon,
  ReceiptIcon,
  SparklesIcon,
  BarChart3Icon,
  SettingsIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ClockIcon,
  UserPlusIcon,
  ActivityIcon,
  ClipboardListIcon,
  FileTextIcon,
  RepeatIcon,
  BuildingIcon,
  ShieldCheckIcon,
  PackageIcon,
  AlertTriangleIcon,
  ShoppingCartIcon,
  TruckIcon,
  TestTubeIcon,
  ScanLineIcon,
  FileCheckIcon,
  BedIcon,
  NotebookPenIcon,
  MessageSquareIcon,
  BrainCircuitIcon,
  BookOpenIcon,
  BanknoteIcon,
  RefreshCcwIcon,
  LockIcon,
  CalendarCheckIcon } from
'lucide-react';
import { cn } from '../../lib/cn';
interface NavItem {
  label: string;
  to?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
}
const nav: {
  title: string;
  items: NavItem[];
}[] = [
{
  title: 'Overview',
  items: [
  {
    label: 'Dashboard',
    to: '/',
    icon: <LayoutDashboardIcon />
  },
  {
    label: "Today's Queue",
    to: '/queue',
    icon: <ClockIcon />,
    badge: 14
  },
  {
    label: 'Calendar',
    to: '/calendar',
    icon: <CalendarIcon />
  }]

},
{
  title: 'Role views',
  items: [
  {
    label: 'Doctor view',
    to: '/dashboard/doctor',
    icon: <StethoscopeIcon />
  },
  {
    label: 'Reception view',
    to: '/dashboard/reception',
    icon: <UsersIcon />
  },
  {
    label: 'Pharmacy view',
    to: '/dashboard/pharmacy',
    icon: <PillIcon />
  },
  {
    label: 'Lab view',
    to: '/dashboard/lab',
    icon: <FlaskConicalIcon />
  }]

},
{
  title: 'Patients',
  items: [
  {
    label: 'Patients',
    to: '/patients',
    icon: <UsersIcon />
  },
  {
    label: 'New Registration',
    to: '/patients/new',
    icon: <UserPlusIcon />
  },
  {
    label: 'Patient Timeline',
    to: '/patients/P-100482/timeline',
    icon: <ActivityIcon />
  }]

},
{
  title: 'OPD',
  items: [
  {
    label: 'Appointments',
    to: '/appointments',
    icon: <CalendarCheckIcon />
  },
  {
    label: 'Consultations',
    to: '/consultations',
    icon: <StethoscopeIcon />
  },
  {
    label: 'Prescriptions',
    to: '/prescriptions',
    icon: <ClipboardListIcon />
  },
  {
    label: 'Follow-ups',
    to: '/followups',
    icon: <RepeatIcon />
  }]

},
{
  title: 'Hospital',
  items: [
  {
    label: 'IPD Admissions',
    to: '/ipd',
    icon: <BedDoubleIcon />
  },
  {
    label: 'Beds & Wards',
    to: '/beds',
    icon: <BedIcon />
  },
  {
    label: 'Nursing Station',
    to: '/nursing',
    icon: <NotebookPenIcon />
  },
  {
    label: 'Discharge Summary',
    to: '/discharge',
    icon: <FileCheckIcon />
  }]

},
{
  title: 'Diagnostics',
  items: [
  {
    label: 'Lab Orders',
    to: '/lab/orders',
    icon: <TestTubeIcon />
  },
  {
    label: 'Lab Reports',
    to: '/lab/reports',
    icon: <FlaskConicalIcon />
  },
  {
    label: 'Sample Collection',
    to: '/lab/collection',
    icon: <TestTubeIcon />
  },
  {
    label: 'Result Entry',
    to: '/lab/result-entry',
    icon: <FileTextIcon />
  },
  {
    label: 'Radiology',
    to: '/radiology',
    icon: <ScanLineIcon />
  }]

},
{
  title: 'Pharmacy',
  items: [
  {
    label: 'Pharmacy Sales',
    to: '/pharmacy/sales',
    icon: <ShoppingCartIcon />
  },
  {
    label: 'Medicines',
    to: '/pharmacy/medicines',
    icon: <PillIcon />
  },
  {
    label: 'Stock',
    to: '/pharmacy/stock',
    icon: <PackageIcon />
  },
  {
    label: 'Purchase',
    to: '/pharmacy/purchase',
    icon: <TruckIcon />
  },
  {
    label: 'Expiry Alerts',
    to: '/pharmacy/expiry',
    icon: <AlertTriangleIcon />,
    badge: 7
  }]

},
{
  title: 'Billing',
  items: [
  {
    label: 'Invoices',
    to: '/billing/invoices',
    icon: <ReceiptIcon />
  },
  {
    label: 'Payments',
    to: '/billing/payments',
    icon: <BanknoteIcon />
  },
  {
    label: 'Refunds',
    to: '/billing/refunds',
    icon: <RefreshCcwIcon />
  },
  {
    label: 'Day Closing',
    to: '/billing/day-closing',
    icon: <FileTextIcon />
  }]

},
{
  title: 'AI Assistant',
  items: [
  {
    label: 'Clinical Assistant',
    to: '/ai/clinical',
    icon: <BrainCircuitIcon />
  },
  {
    label: 'Patient Summary',
    to: '/ai/summary',
    icon: <SparklesIcon />
  },
  {
    label: 'Report Explainer',
    to: '/ai/explainer',
    icon: <BookOpenIcon />
  },
  {
    label: 'Admin Copilot',
    to: '/ai/admin',
    icon: <MessageSquareIcon />
  },
  {
    label: 'Content Review',
    to: '/ai/review',
    icon: <ShieldCheckIcon />,
    badge: 12
  }]

},
{
  title: 'Reports',
  items: [
  {
    label: 'Revenue Reports',
    to: '/reports/revenue',
    icon: <BarChart3Icon />
  },
  {
    label: 'Appointment Reports',
    to: '/reports/appointments',
    icon: <CalendarIcon />
  },
  {
    label: 'Pharmacy Reports',
    to: '/reports/pharmacy',
    icon: <PillIcon />
  },
  {
    label: 'Doctor Performance',
    to: '/reports/doctors',
    icon: <BarChart3Icon />
  },
  {
    label: 'Audit Logs',
    to: '/reports/audit',
    icon: <ShieldCheckIcon />
  }]

},
{
  title: 'Settings',
  items: [
  {
    label: 'Organization',
    to: '/settings/organization',
    icon: <BuildingIcon />
  },
  {
    label: 'Branches',
    to: '/settings/branches',
    icon: <BuildingIcon />
  },
  {
    label: 'Staff',
    to: '/settings/staff',
    icon: <UsersIcon />
  },
  {
    label: 'Roles & Permissions',
    to: '/settings/roles',
    icon: <ShieldCheckIcon />
  },
  {
    label: 'Templates',
    to: '/settings/templates',
    icon: <FileTextIcon />
  },
  {
    label: 'Integrations',
    to: '/settings/integrations',
    icon: <RepeatIcon />
  },
  {
    label: 'Security',
    to: '/settings/security',
    icon: <LockIcon />
  }]

}];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}
export function Sidebar({ open, onClose }: SidebarProps) {
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>>(
    {});
  const toggleSection = (title: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  return (
    <>
      {/* Mobile overlay */}
      {open &&
      <div
        className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        onClick={onClose} />

      }

      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-40 h-screen w-[280px] max-w-[85vw] lg:w-64 lg:max-w-none shrink-0 border-r border-line dark:border-line-dark bg-surface dark:bg-surface-dark',
          'transition-transform duration-200 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
          'flex flex-col'
        )}>
        
        {/* Logo */}
        <div className="h-14 px-4 flex items-center gap-2 border-b border-line dark:border-line-dark shrink-0">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white">
            <div className="w-4 h-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-ink-primary dark:text-ink-primary-dark">
              Hospeon
            </span>
            <span className="text-[10px] text-ink-tertiary -mt-0.5">
              by Webgeon
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {nav.map((section) => {
            const collapsed = collapsedSections[section.title];
            return (
              <div key={section.title} className="mb-2">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-tertiary hover:text-ink-secondary">
                  
                  <span>{section.title}</span>
                  {collapsed ?
                  <ChevronRightIcon className="w-3 h-3" /> :

                  <ChevronDownIcon className="w-3 h-3" />
                  }
                </button>
                {!collapsed &&
                <div className="space-y-0.5 mt-0.5">
                    {section.items.map((item) =>
                  <NavLink
                    key={item.label}
                    to={item.to || '#'}
                    end={item.to === '/'}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors',
                      isActive ?
                      'bg-subtle dark:bg-subtle-dark text-ink-primary dark:text-ink-primary-dark font-medium' :
                      'text-ink-secondary dark:text-ink-secondary-dark hover:bg-subtle/60 dark:hover:bg-subtle-dark/60 hover:text-ink-primary'
                    )
                    }>
                    
                        <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4">
                          {item.icon}
                        </span>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge &&
                    <span className="text-[10px] font-mono tabular-nums bg-accent-soft text-accent px-1.5 py-0.5 rounded">
                            {item.badge}
                          </span>
                    }
                      </NavLink>
                  )}
                  </div>
                }
              </div>);

          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-line dark:border-line-dark shrink-0">
          <div className="text-[10px] text-ink-tertiary">
            v2.4.1 ·{' '}
            <span className="text-success">All systems operational</span>
          </div>
        </div>
      </aside>
    </>);

}