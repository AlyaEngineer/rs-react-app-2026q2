import {
  BookOpenText as BookIcon,
  ShieldUser as AuthorIcon,
} from 'lucide-react';
import { Card } from './AboutCard';
import { authorLinks, techStack } from '../model/aboutData';

export function AboutPage() {
  return (
    <section
      className="bg-background min-h-screen overflow-hidden px-6 py-16"
      aria-label="About page"
      data-testid="about-page"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-2">
          <Card icon={<BookIcon />} title="About the App">
            <p className="text-muted-foreground mb-6">
              BookFinder is a web application for searching and discovering
              books using the{' '}
              <a
                href="https://openlibrary.org/developers/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary decoration-primary/40 hover:decoration-primary transition-colors"
              >
                Open Library API
              </a>{' '}
              - a free, open catalog of millions of titles from around the
              world.
            </p>

            <p className="text-muted-foreground mb-6">
              You can search and instantly browse results from one of the
              largest digital libraries available.
            </p>

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

          <Card icon={<AuthorIcon />} title="About the Author">
            <p className="text-muted-foreground mb-6">
              Hi, I am <strong>Alla</strong> - a frontend developer currently
              leveling up through the{' '}
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary decoration-primary/40 hover:decoration-primary transition-colors"
              >
                RS School React Course.
              </a>
            </p>

            <p className="text-muted-foreground mb-6">
              This project was built as part of the course curriculum to
              practice real-world React development: working with external APIs,
              client-side routing, TypeScript, and modern tooling.
            </p>

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
