/**
 * @module @application/main
 */

import { ContextManager } from "dreamstate";

// Lib.
import { Optional } from "@Lib/ts";
import { Logger } from "@Lib/utils";

/**
 * Auth context description.
 */
export interface IAuthContext {
  authActions: {
  };
  authState: {
    // todo: Generic ILoadable<T> would solve such kind of problems. It can look like <T>{ value: Optional<T>, loading: boolean, error: Optional<Error> }.
    isAuthorizing: boolean;
    isAuthorized: boolean;
  };
  authDetailsState: {
    user: Optional<string>;
  };
}

/**
 * Context manager related to auth and user management.
 * It is responsible for auth, security and account management.
 */
export class AuthContextManager extends ContextManager<IAuthContext> {

  public context: IAuthContext = {
    authActions: {
    },
    authDetailsState: {
      user: null
    },
    authState: {
      isAuthorized: false,
      isAuthorizing: false,
    }
  };

  private readonly log: Logger = new Logger(AuthContextManager.name);

  protected onProvisionStarted(): void {

    const { authState: { isAuthorized } } = this.context;

    this.log.info(`Auth provision started [${isAuthorized}].`);
  }

}
