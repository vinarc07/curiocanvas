import { Sparkles } from 'lucide-react';

interface LogoProps {
  tone?: 'dark' | 'light';
}

export function Logo({ tone = 'dark' }: LogoProps) {
  const textClass = tone === 'light' ? 'text-ivory' : 'text-plum';
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blush to-dusty text-plum shadow-soft">
        <Sparkles className="h-5 w-5" strokeWidth={2.25} />
      </div>
      <span className={`font-display text-xl font-bold tracking-tight ${textClass}`}>CurioCanvas</span>
    </div>
  );
}
