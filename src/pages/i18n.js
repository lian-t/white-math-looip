import i18next from 'i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['querystring', 'cookie'],
      cache: ['cookie']
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    }
  });

export default i18next;