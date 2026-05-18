import type { ReactNode } from 'react';

interface CardLink {
  href: string;
  label: ReactNode;
}

interface CardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  links?: CardLink[];
}

export function Card({ icon, title, children, links }: CardProps) {
  return (
    <div className="bg-card flex flex-col rounded-xl border p-8 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <div className="flex-1">{children}</div>

      {links && links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium transition hover:opacity-90"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
