/**
 * @module @initialization
 *
 * Inline initialization greeter and notifier.
 */

import { Logger } from "@Lib/utils";

/**
 * Log greeting and page load information.
 */
export const logInitInfo = () => {

  const logger: Logger = new Logger("INIT");

  logger.info("🔶 Starting application in DEV mode.");
  logger.info("🔶 First init timestamp:", Date.now());

  logger.pushSeparator();
};
