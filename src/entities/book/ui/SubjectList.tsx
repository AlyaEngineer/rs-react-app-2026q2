import { useTranslations } from 'next-intl';

export function SubjectList({ subjects }: { subjects?: string[] }) {
  const t = useTranslations('bookDetailsPanel');

  return (
    <div>
      <h3 className="text-foreground mb-2 font-semibold">{t('subjects')}</h3>
      {subjects && subjects.length > 0 ? (
        <ul
          className="flex flex-wrap gap-2"
          aria-label="Subjects"
          data-testid="subjects-list"
        >
          {subjects.map((subject) => (
            <li
              key={subject}
              className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
            >
              {subject}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-sm">
          <span className="opacity-50">N/A</span>
        </p>
      )}
    </div>
  );
}
