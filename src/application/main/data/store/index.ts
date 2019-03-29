import { AuthContextManager } from "@Main/data/store/AuthContextManager";
import { LanguageContextManager } from "@Main/data/store/LanguageContextManager";
import { RouterContextManager } from "@Main/data/store/RouterContextManager";
import { ThemeContextManager } from "@Main/data/store/ThemeContextManager";

export const authContextManager: AuthContextManager = new AuthContextManager();
export const themeContextManager: ThemeContextManager = new ThemeContextManager();
export const routerContextManager: RouterContextManager = new RouterContextManager();
export const languageContextManager: LanguageContextManager = new LanguageContextManager();

export { AuthContextManager, IAuthContext } from "@Main/data/store/AuthContextManager";
export { ThemeContextManager, IThemeContext } from "@Main/data/store/ThemeContextManager";
export { RouterContextManager, IRouterContext } from "@Main/data/store/RouterContextManager";
export { LanguageContextManager, ILanguageContext } from "@Main/data/store/LanguageContextManager";
