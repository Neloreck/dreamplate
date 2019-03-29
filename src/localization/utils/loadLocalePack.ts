import { default as i18next } from "i18next";

// Localization.
import { ELocale } from "@Localization";

/**
 * Dynamically load bundles with translations.
 * If additional locales are needed, it can be added there.
 */
export const loadLocalePack = async (language: ELocale, namespace: string = "translation"): Promise<any> => {

  if (i18next.hasResourceBundle(language, namespace)) {
    return;
  }

  let bundle: any;

  switch (language) {

    case ELocale.RU:
      bundle = await import(/* webpackChunkName: "locale@ru" */`@Localization/translations/ru.json`);
      break;

    case ELocale.UA:
      bundle = await import(/* webpackChunkName: "locale@ua" */`@Localization/translations/ua.json`);
      break;

    case ELocale.EN:

    default:
      bundle = await import(/* webpackChunkName: "locale@en" */`@Localization/translations/en.json`);
      break;

  }

  i18next.addResourceBundle(language, namespace, bundle.default[namespace], true, false);
};
