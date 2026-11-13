import { BookOpen, Compass, House, LogOut, Menu, UserRound, X, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { useStudent } from '@/context/StudentContext';
import { isDemoMode } from '@/lib/backend';
import { useState } from 'react';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', label: 'Home', icon: House },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/learning', label: 'My Learning', icon: BookOpen },
  { to: '/profile', label: 'Profile', icon: UserRound },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-1.5" aria-label="Main navigation">
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              isActive ? 'bg-white/15 text-white' : 'text-blush hover:bg-white/10 hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-blush"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

function SidebarBody({ onNavigate, onLogout }: { onNavigate?: () => void; onLogout: () => void }) {
  const { student } = useStudent();
  return (
    <div className="flex h-full flex-col gap-8">
      <div className="px-2 pt-2">
        <Logo tone="light" />
      </div>
      {student && (
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs uppercase tracking-wider text-blush/80">Signed in as</p>
          <p className="mt-1 truncate font-semibold text-ivory">{student.studentName}</p>
          <p className="truncate text-xs text-blush/80">{student.schoolName}</p>
        </div>
      )}
      <NavLinks onNavigate={onNavigate} />
      <div className="mt-auto space-y-4">
        {isDemoMode && (
          <p className="rounded-2xl border border-blush/30 bg-white/5 p-3 text-xs text-blush">
            Demo mode: progress is saved only in this browser.
          </p>
        )}
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-blush transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { logout } = useStudent();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/50 bg-plum px-4 py-3 lg:hidden">
        <Logo tone="light" />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-xl p-2 text-ivory transition-colors hover:bg-white/10"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto bg-gradient-to-b from-plum to-plum-deep p-6 lg:block">
        <SidebarBody onLogout={handleLogout} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-plum-deep/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-plum to-plum-deep p-6 shadow-glass"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-4 rounded-xl p-2 text-ivory transition-colors hover:bg-white/10"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarBody onNavigate={() => setMobileOpen(false)} onLogout={handleLogout} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
