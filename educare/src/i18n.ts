import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../src/languages/en.json";
import al from "../src/languages/al.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    al: { translation: al },
  },
  lng: "al", // default language
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;