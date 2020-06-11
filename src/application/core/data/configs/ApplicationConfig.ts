import { APPLICATION_ROOT, MODAL_ROOT } from "@Build/build_constants";

/**
 * Application configuration and info with global scope.
 */
export const applicationConfig = {
  initialLoad: Date.now(),
  targetElements: {
    applicationRoot: document.getElementById(APPLICATION_ROOT) as HTMLElement,
    modalRoot: document.getElementById(MODAL_ROOT) as HTMLElement
  }
};
