import { motion } from 'framer-motion';

interface FloatingShapesProps {
  variant?: 'light' | 'dark';
}

export function FloatingShapes({ variant = 'light' }: FloatingShapesProps) {
  const tone = variant === 'dark' ? 'from-dusty/50 to-mauve/40' : 'from-blush/70 to-dusty/40';
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={`absolute -left-16 top-10 h-72 w-72 rounded-[40%] bg-gradient-to-br ${tone} blur-2xl`}
        animate={{ rotate: [0, 90, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute bottom-[-60px] right-[-40px] h-80 w-80 rounded-full bg-gradient-to-tr ${tone} blur-2xl`}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-1/4 top-1/4 h-14 w-14 rounded-2xl border border-white/40 bg-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 h-4 w-4 rounded-full bg-white/50"
        animate={{ y: [0, -18, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
