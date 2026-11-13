import { motion } from 'framer-motion';
import { BookOpen, Brush, Box } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const HIGHLIGHTS = [
  { icon: BookOpen, label: 'Textbook lessons' },
  { icon: Brush, label: 'Step-by-step drawing' },
  { icon: Box, label: 'Interactive 3D observation' },
];

export function LoginBrandPanel() {
  return (
    <div className="relative isolate flex min-h-[320px] flex-col justify-between overflow-hidden bg-gradient-to-br from-plum via-mauve to-dusty p-8 text-ivory sm:p-12 lg:min-h-screen">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-20 -top-24 h-80 w-80 rotate-12 rounded-[3rem] bg-gradient-to-br from-blush/40 to-transparent"
          animate={{ rotate: [12, 22, 12], y: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 right-[-60px] h-96 w-96 rounded-full border-[28px] border-dusty/40"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-16 top-20 h-24 w-24 rotate-45 rounded-2xl bg-gradient-to-tr from-blush/60 to-dusty/20"
          animate={{ rotate: [45, 60, 45], y: [0, -14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 h-3 w-3 rounded-full bg-blush"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[55%] top-[55%] h-16 w-40 -rotate-12 rounded-full bg-gradient-to-r from-dusty/30 to-transparent"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Logo tone="light" />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-xl space-y-6 py-10 lg:py-0"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <h1 className="text-4xl font-bold leading-tight text-ivory sm:text-5xl lg:text-6xl">
          Discover. Learn. Create.
        </h1>
        <p className="text-base leading-relaxed text-blush sm:text-lg">
          Turn curiosity into knowledge through interactive learning.
        </p>
        <ul className="hidden flex-wrap gap-3 sm:flex">
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-ivory backdrop-blur"
            >
              <Icon className="h-4 w-4 text-blush" />
              {label}
            </li>
          ))}
        </ul>
      </motion.div>

      <p className="relative z-10 hidden text-sm text-blush/90 lg:block">
        A college learning platform for textbook study, drawing and 3D observation.
      </p>
    </div>
  );
}
