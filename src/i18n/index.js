import enCommon from "./en/common.json";
import deCommon from "./de/common.json";
import enQuestionnaire from "./en/questionnaire.json";
import deQuestionnaire from "./de/questionnaire.json";

export const locales = {
  en: {
    common: enCommon,
    questionnaire: enQuestionnaire
  },
  de: {
    common: deCommon,
    questionnaire: deQuestionnaire
  }
};

export function getTranslations(locale = "en") {
  return locales[locale] || locales.en;
}