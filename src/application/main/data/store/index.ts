import { AuthContextManager } from "./AuthContextManager";
import { RouterContextManager } from "./RouterContextManager";
import { ThemeContextManager } from "./theme/ThemeContextManager";

export const authContextManager: AuthContextManager = new AuthContextManager();
export const themeContextManager: ThemeContextManager = new ThemeContextManager();
export const routerContextManager: RouterContextManager = new RouterContextManager();

export * from "./AuthContextManager";
export * from "./theme/ThemeContextManager";
export * from "./RouterContextManager";
