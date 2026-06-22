import Image from 'next/image';
import { User as UserIcon } from 'lucide-react';
import { getAuthorPhotoUrl } from '@/entities/book/model/getAuthorPhotoUrl';

export function AuthorAvatar({
  photoId,
  name,
}: {
  photoId?: number;
  name: string;
}) {
  const url = photoId ? getAuthorPhotoUrl(photoId) : undefined;

  if (url) {
    return (
      <Image
        src={url}
        alt={name}
        width={64}
        height={64}
        className="h-16 w-16 shrink-0 rounded-full object-cover shadow-inner"
      />
    );
  }

  return (
    <div className="bg-secondary text-secondary-foreground flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-inner">
      <UserIcon
        className="h-7 w-7 opacity-60"
        aria-label="No photo available"
      />
    </div>
  );
}
