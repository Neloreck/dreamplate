// Lib.
import { Logger } from "@Lib/utils";

// Data.
import { IApplicationTheme } from "@Main/data/store/theme/ThemeTypes";

const rawStr = localStorage.getItem(btoa("theme")) || null;

if (rawStr) {

  const theme: IApplicationTheme = JSON.parse(atob(rawStr));

  document.body.style.backgroundColor = theme.palette.background.default;
  document.body.style.color = theme.palette.text.primary;
  document.head.getElementsByTagName("meta")["theme-color" as any].content = theme.palette.primary.main;

  /* <dev> */

  const logger: Logger = new Logger("INIT");

  logger.info("🔶 Starting application in DEV mode.");
  logger.info("🔶 First init time:", new Date());

  logger.pushSeparator();

  /* </dev> */
}
