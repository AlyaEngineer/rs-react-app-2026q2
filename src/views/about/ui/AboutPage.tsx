'use client';

import {
  BookOpenText as BookIcon,
  ShieldUser as AuthorIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card } from './AboutCard';
import { authorLinks, techStack } from '../model/aboutData';

export function AboutPage() {
  const t = useTranslations('about');

  return (
    <section
      className="bg-background min-h-screen overflow-hidden px-6 py-16"
      aria-label="About page"
      data-testid="about-page"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-2">
          <Card icon={<BookIcon />} title={t('appTitle')}>
            <p className="text-muted-foreground mb-6">{t('appText1')}</p>

            <p className="text-muted-foreground mb-6">{t('appText2')}</p>

            <ul className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <li key={tech} className="list-none">
                  <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon={<AuthorIcon />} title={t('authorTitle')}>
            <p className="text-muted-foreground mb-6">{t('authorText1')}</p>

            <p className="text-muted-foreground mb-6">{t('authorText2')}</p>

            <ul className="flex gap-4">
              {authorLinks.map((link) => (
                <li key={link.href} className="list-none">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center transition hover:opacity-90"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
