import { Bind, ContextManager } from "dreamstate";
import { default as i18next } from "i18next";
import { initReactI18next } from "react-i18next";

// Lib.
import { Logger } from "@Lib/utils";

// Localization.
import { ELocale, loadLocalePack, localizationConfig } from "@Localization";

export interface ILanguageContext {
  languageActions: {
    setLanguage(locale: ELocale): Promise<void>;
  };
  languageState: {
    i18n: typeof i18next;
    locale: ELocale;
  };
}

export class LanguageContextManager extends ContextManager<ILanguageContext> {

  protected context: ILanguageContext = {
    languageActions: {
      setLanguage: this.setLanguage
    },
    languageState: {
      i18n: i18next,
      locale: localizationConfig.defaultLanguage
    }
  };

  private readonly log: Logger = new Logger("[🌰LNG]", true);
  private readonly setState = ContextManager.getSetter(this, "languageState");

  public constructor() {
    super();

    this.initializeI18n().then();
  }

  protected onProvisionStarted(): void {
    this.log.info("Started language context provision.");
  }

  private async initializeI18n(): Promise<void> {

    const { locale } = this.context.languageState;

    await i18next
      .use(initReactI18next)
      .init({
        fallbackLng: localizationConfig.fallbackLanguage,
        interpolation: {
          escapeValue: false
        },
        lng: locale,
        resources: {}
      });

    await loadLocalePack(locale);

    this.log.info(`Configured application language, loaded resources: [${locale}].`);
  }

  @Bind()
  private async setLanguage(newLocale: ELocale): Promise<void> {

    const { locale } = this.context.languageState;

    if (newLocale !== locale) {

      await loadLocalePack(newLocale);
      await i18next.changeLanguage(newLocale);

      this.setState({ locale: newLocale });
    }
  }

}
