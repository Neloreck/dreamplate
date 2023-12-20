import { APPLICATION_ROOT, PORTAL_ROOT } from "#/globals/build_constants";

/**
 * Application configuration and info with global scope.
 */
export const applicationConfig = {
  INITIAL_START_TIME: Date.now(),
  TARGET_DOM_ELEMENTS: {
    applicationRoot: document.getElementById(APPLICATION_ROOT) as HTMLElement,
    modalRoot: document.getElementById(PORTAL_ROOT) as HTMLElement,
  },
};
