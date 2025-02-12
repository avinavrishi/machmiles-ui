import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json'
import fr from './locales/fr.json'
import tw from './locales/tw.json'

const resources= {"en":{translation:en}, "fr":{translation:fr},"zh-tw":{translation:tw}}

i18n
.use(initReactI18next)
.init({
    resources,
    lng:"en",
    fallbackLng:"en",
    interpolation:{escapeValue: false}
});

export default i18n
