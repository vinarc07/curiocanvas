import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-plum to-mauve text-ivory shadow-soft hover:shadow-glass disabled:from-dusty disabled:to-dusty',
  secondary: 'bg-white/80 text-plum border border-blush hover:bg-white hover:border-dusty',
  ghost: 'bg-transparent text-plum hover:bg-blush/40',
  light: 'bg-ivory text-plum shadow-soft hover:bg-white',
};

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', icon, children, fullWidth, className = '', ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={props.disabled ? undefined : { y: -2, scale: 1.01 }}
      whileTap={props.disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}
