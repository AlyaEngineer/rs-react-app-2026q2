import type { ReactNode } from 'react';

interface CardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function Card({ icon, title, children }: CardProps) {
  return (
    <div className="bg-card flex flex-col rounded-xl border p-8 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
