import { AlertTriangle, Info } from 'lucide-react';
import type { ReactNode } from 'react';

interface NoticeProps {
  tone?: 'error' | 'info';
  title?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function Notice({ tone = 'info', title, children, action }: NoticeProps) {
  const isError = tone === 'error';
  const Icon = isError ? AlertTriangle : Info;
  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-2xl border p-4 text-sm ${
        isError ? 'border-danger/30 bg-danger/5 text-danger' : 'border-dusty/40 bg-white/70 text-plum'
      }`}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="flex-1 space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className={isError ? 'text-danger/90' : 'text-mauve'}>{children}</div>
        {action && <div className="pt-2">{action}</div>}
      </div>
    </div>
  );
}
