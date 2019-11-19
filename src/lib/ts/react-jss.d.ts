import { IApplicationTheme } from "@Lib/theme";

declare module "react-jss" {

  function createUseStyles<TStyle extends (theme: IApplicationTheme) => Record<Extract<ReturnType<TStyle>, string>, string>>(style: TStyle): (data?: any) =>
    Record<Extract<keyof ReturnType<TStyle>, string>, string>;

  function createUseStyles<TStyle>(style: TStyle): (data?: any) => Record<Extract<keyof TStyle, string>, string>;
}
