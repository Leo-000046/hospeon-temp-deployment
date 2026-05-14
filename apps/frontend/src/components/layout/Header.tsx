import React, { useState } from 'react';
import {
  SearchIcon,
  BellIcon,
  PlusIcon,
  SparklesIcon,
  MoonIcon,
  SunIcon,
  MenuIcon,
  ChevronDownIcon,
  BuildingIcon } from
'lucide-react';
import { Input } from '@/components/ui/Input';
import { IconButton } from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/cn';
const branches: any[] = [{id: '1', name: 'Main Branch'}];

interface HeaderProps {
  onMenuClick: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
}
export function Header({ onMenuClick, onToggleTheme, isDark }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [branchOpen, setBranchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(branches[0]);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <header className="sticky top-0 z-20 h-14 bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-line dark:border-line-dark">
      <div className="h-full flex items-center gap-3 px-4 lg:px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden -ml-1 p-2 rounded-lg hover:bg-subtle dark:hover:bg-subtle-dark text-ink-secondary">
          
          <MenuIcon className="w-4 h-4" />
        </button>

        {/* Global search */}
        <div className="flex-1 max-w-xl">
          <Input
            icon={<SearchIcon />}
            placeholder="Search patient, P-ID, invoice…"
            iconRight={
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-subtle dark:bg-subtle-dark rounded border border-line dark:border-line-dark text-ink-tertiary">
                ⌘K
              </kbd>
            } />
          
        </div>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-1">
          {/* Branch selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setBranchOpen((o) => !o)}
              className="h-9 px-3 inline-flex items-center gap-2 rounded-lg text-xs font-medium text-ink-secondary hover:bg-subtle dark:hover:bg-subtle-dark">
              
              <BuildingIcon className="w-3.5 h-3.5" />
              <span className="max-w-[140px] truncate">
                {currentBranch.name}
              </span>
              <ChevronDownIcon className="w-3 h-3" />
            </button>
            {branchOpen &&
            <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-line dark:border-line-dark bg-surface dark:bg-surface-dark shadow-pop py-1.5 z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-ink-tertiary tracking-wider">
                  Switch branch
                </div>
                {branches.map((b) =>
              <button
                key={b.id}
                onClick={() => {
                  setCurrentBranch(b);
                  setBranchOpen(false);
                }}
                className={cn(
                  'w-full px-3 py-1.5 text-left text-sm hover:bg-subtle dark:hover:bg-subtle-dark flex items-center justify-between',
                  b.id === currentBranch.id && 'text-accent font-medium'
                )}>
                
                    <span>{b.name}</span>
                    {b.id === currentBranch.id &&
                <span className="text-xs">●</span>
                }
                  </button>
              )}
              </div>
            }
          </div>

          {/* Date/Time */}
          <div className="hidden lg:flex flex-col text-right px-2 leading-tight">
            <span className="text-[11px] text-ink-secondary">{dateStr}</span>
            <span className="text-[11px] font-mono text-ink-tertiary">
              {timeStr}
            </span>
          </div>

          <IconButton
            variant="ghost"
            aria-label="Quick add"
            className="hidden sm:inline-flex">
            
            <PlusIcon />
          </IconButton>

          <IconButton
            variant="ghost"
            aria-label="AI assistant"
            className="hidden sm:inline-flex text-accent">
            
            <SparklesIcon />
          </IconButton>

          <IconButton
            variant="ghost"
            aria-label="Notifications"
            className="relative">
            
            <BellIcon />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
          </IconButton>

          <IconButton
            variant="ghost"
            onClick={onToggleTheme}
            aria-label="Toggle theme">
            
            {isDark ? <SunIcon /> : <MoonIcon />}
          </IconButton>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((o) => !o)}
              className="flex items-center gap-2 pl-1.5 pr-2 h-9 rounded-lg hover:bg-subtle dark:hover:bg-subtle-dark">
              
              <div className="w-7 h-7 rounded-full bg-accent-soft text-accent flex items-center justify-center text-xs font-semibold uppercase">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-xs font-medium text-ink-primary dark:text-ink-primary-dark">
                  {user?.name?.split(' ').slice(0, 2).join(' ') || 'User'}
                </span>
                <span className="text-[10px] text-ink-tertiary">
                  {user?.role || 'Staff'}
                </span>
              </div>
              <ChevronDownIcon className="w-3 h-3 text-ink-tertiary hidden md:block" />
            </button>
            {profileOpen &&
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-line dark:border-line-dark bg-surface dark:bg-surface-dark shadow-pop py-1.5 z-50">
                <div className="px-3 py-2 border-b border-line dark:border-line-dark">
                  <p className="text-sm font-medium text-ink-primary dark:text-ink-primary-dark">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-ink-tertiary truncate">
                    {user?.email || 'user@hospeon.com'}
                  </p>
                </div>
                {[
              { label: 'Profile', onClick: () => {} },
              { label: 'Preferences', onClick: () => {} },
              { label: 'My audit log', onClick: () => {} },
              { label: 'Help & docs', onClick: () => {} },
              { label: 'Sign out', onClick: handleLogout }].
              map((item) =>
              <button
                key={item.label}
                onClick={item.onClick}
                className="w-full px-3 py-1.5 text-left text-sm text-ink-secondary hover:bg-subtle dark:hover:bg-subtle-dark hover:text-ink-primary">
                
                    {item.label}
                  </button>
              )}
              </div>
            }
          </div>
        </div>
      </div>
    </header>);

}