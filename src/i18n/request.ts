import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

type Messages = Record<string, string>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`../../messages/${locale}.json`)) as {
    default: Messages;
  };

  return {
    locale,
    messages: messages.default,
  };
});

// import { hasLocale } from 'next-intl';

// import { getRequestConfig } from 'next-intl/server';

// import { routing } from './routing';

// export default getRequestConfig(async ({ requestLocale }) => {
//   const requested = await requestLocale;

//   const locale = hasLocale(routing.locales, requested)
//     ? requested
//     : routing.defaultLocale;

//   return {
//     locale,

//     messages: (await import(`../../messages/${locale}.json`)).default,
//   };
// });
