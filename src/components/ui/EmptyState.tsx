import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-dusty/60 bg-white/50 px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blush to-dusty text-plum">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold text-plum">{title}</h3>
      <p className="max-w-md text-sm text-mauve">{description}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
