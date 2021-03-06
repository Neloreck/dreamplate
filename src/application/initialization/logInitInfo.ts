import { log } from "#/macroses/log.macro";

/**
 * Log greeting and page load information.
 */
export function logInitInfo(): void {
  log.info("Starting application in DEV mode.");
}
