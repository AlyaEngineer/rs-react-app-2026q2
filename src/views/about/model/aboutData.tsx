import type { ReactNode } from 'react';

export const techStack: string[] = [
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'Redux Toolkit',
];

interface AuthorLink {
  href: string;
  label: ReactNode;
}

export const authorLinks: AuthorLink[] = [
  {
    href: 'https://github.com/alyaengineer',
    label: <img src="/icon-github.png" alt="GitHub" className="h-6 w-6" />,
  },
  {
    href: 'https://www.linkedin.com/in/alla-tsaiukova-033ba92b6/',
    label: <img src="/icon-linkedin.png" alt="LinkedIn" className="h-6 w-6" />,
  },
];
