import { AuthContextManager } from "./AuthContextManager";
import { RouterContextManager } from "./RouterContextManager";
import { ThemeContextManager } from "./ThemeContextManager";

export const themeContextManager: ThemeContextManager = new ThemeContextManager();
export const routerContextManager: RouterContextManager = new RouterContextManager();
export const authContextManager: AuthContextManager = new AuthContextManager();

export * from "./AuthContextManager";
export * from "./ThemeContextManager";
export * from "./RouterContextManager";
