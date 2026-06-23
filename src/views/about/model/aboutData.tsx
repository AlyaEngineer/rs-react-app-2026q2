import Image from 'next/image';
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
    label: (
      <Image
        src="/icon-github.png"
        alt="GitHub"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    ),
  },
  {
    href: 'https://www.linkedin.com/in/alla-tsaiukova-033ba92b6/',
    label: (
      <Image
        src="/icon-linkedin.png"
        alt="LinkedIn"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    ),
  },
];
