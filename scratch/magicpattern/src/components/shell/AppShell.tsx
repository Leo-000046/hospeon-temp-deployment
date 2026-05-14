import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');else
    document.documentElement.classList.remove('dark');
  }, [isDark]);
  return (
    <div className="min-h-screen bg-canvas dark:bg-canvas-dark flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onToggleTheme={() => setIsDark((d) => !d)}
          isDark={isDark} />
        
        <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>);

}