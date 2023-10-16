const locales = [
  {
    locale: 'en',
    messages: import('./en'),
    //loadData: import(`@formatjs/intl-relativetimeformat/dist/locale-data/en`),
  },
  {
    locale: 'es',
    messages: import('./es'),
    //loadData: import(`@formatjs/intl-relativetimeformat/dist/locale-data/ru`),
  },
]

export default locales
