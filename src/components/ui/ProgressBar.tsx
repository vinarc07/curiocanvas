import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  label?: string;
  tone?: 'plum' | 'success';
}

export function ProgressBar({ value, label, tone = 'plum' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const fill = tone === 'success' ? 'from-success to-emerald-500' : 'from-plum via-mauve to-dusty';
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-plum">{label}</span>
          <span className="font-semibold text-mauve">{clamped}%</span>
        </div>
      )}
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-blush/60"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${fill}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
