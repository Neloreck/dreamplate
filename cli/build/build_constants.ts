import { IS_PRODUCTION } from "./config/webpack.constants";

export const APPLICATION_TITLE: string = "Boilerplate";
export const APPLICATION_ROOT: string = IS_PRODUCTION ? "c" : "application-root";
