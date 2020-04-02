/**
 * @packageDocumentation
 * @module @initialization
 *
 * Inline initialization greeter and notifier.
 */

import { log } from "@Macro/log.macro";

/**
 * Log greeting and page load information.
 */
export const logInitInfo = () => {

  log.info("🔶 Starting application in DEV mode.");
  log.info("🔶 First init timestamp:", Date.now());
};
