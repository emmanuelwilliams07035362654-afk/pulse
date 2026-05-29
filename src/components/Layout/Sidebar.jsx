import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Wallet,
  ClipboardList,
  Settings,
  Activity,
  X,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Staff', icon: Users, path: '/staff' },
  { label: 'Payroll', icon: Wallet, path: '/payroll' },
  { label: 'Operations', icon: ClipboardList, path: '/operations' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm'
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          bg-sidebar text-sidebar-foreground
          flex flex-col
          transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className='flex items-center justify-between px-6 py-6'>
          <Link to='/' className='flex items-center gap-3' onClick={onClose}>
            <div className='w-10 h-10 rounded-xl bg-primary flex items-center justify-center animate-pulse-glow'>
              <Activity className='w-5 h-5 text-primary-foreground' />
            </div>
            <div>
              <h1 className='text-xl font-heading font-bold tracking-tight text-white'>Pulse</h1>
              <p className='text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/50 font-medium'>Business OS</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className='lg:hidden p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <nav className='flex-1 px-3 py-4 space-y-1'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 group relative
                  ${isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
                <span>{item.label}</span>
                {isActive && <ChevronRight className='w-4 h-4 ml-auto' />}
              </Link>
            );
          })}
        </nav>

        <div className='p-4 m-3 mb-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-sidebar-border'>
          <p className='text-xs font-medium text-sidebar-foreground/80'>Pulse Pro</p>
          <p className='text-[11px] text-sidebar-foreground/50 mt-1'>Unlock advanced analytics & multi-branch support</p>
          <button className='mt-3 w-full py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity'>
            Upgrade Now
          </button>
        </div>
      </aside>
    </>
  );
}
