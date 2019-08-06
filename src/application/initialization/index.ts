// Lib.
import { Logger } from "@Lib/utils";

// Init.
import { initTheme } from "@Application/initialization/initTheme";

/* <dev> */

const logger: Logger = new Logger("INIT");

logger.info("🔶 Starting application in DEV mode.");
logger.info("🔶 First init time:", new Date());

logger.pushSeparator();

/* </dev> */

/* <everything> */

initTheme();

/* </everything> */
