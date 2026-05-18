import { BookOpenText, ShieldUser } from 'lucide-react';
import { Card } from './AboutCard';
import { techStack, authorLinks } from '../model/aboutData';

export function AboutPage() {
  return (
    <section className="bg-background relative min-h-screen overflow-hidden px-6 py-16">
      <div className="bg-primary/10 absolute top-0 left-0 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-accent/20 absolute right-0 bottom-0 h-72 w-72 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-5xl space-y-10">
        <div className="grid gap-6 md:grid-cols-2">
          <Card icon={<BookOpenText />} title="About the App">
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
              You can search by title and author and instantly browse results
              from one of the largest digital libraries available.
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>

          <Card
            icon={<ShieldUser />}
            title="About the Author"
            links={authorLinks}
          >
            <p className="text-muted-foreground mb-6 leading-7">
              Hi, I am <strong>Alla</strong> - a frontend developer currently
              leveling up through the{' '}
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary decoration-primary/40 hover:decoration-primary transition-colors"
              >
                RS School React Course
              </a>
              .
            </p>

            <p className="text-muted-foreground leading-7">
              This project was built as part of the course curriculum to
              practice real-world React development: working with external APIs,
              client-side routing, TypeScript, and modern tooling.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
