import { AnimatePresence, motion } from 'framer-motion';
import { useOutlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';

export function AppShell() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-ivory via-blush/40 to-dusty/30 lg:flex">
      <Sidebar />
      <main className="relative min-w-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
