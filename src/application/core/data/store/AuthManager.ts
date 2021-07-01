import { ContextManager, createLoadable, Loadable } from "dreamstate";

import { log } from "@Macro/log.macro";

import { TOptional } from "@Lib/ts";


/**
 * Auth context description.
 */
export interface IAuthContext {
  authActions: {
  };
  user: Loadable<TOptional<string>>;
}

/**
 * Context manager related to auth and user management.
 * It is responsible for auth, security and account management.
 */
export class AuthManager extends ContextManager<IAuthContext> {

  public readonly context: IAuthContext = {
    authActions: {
    },
    user: createLoadable(null)
  };

  public onProvisionStarted(): void {
    const { user } = this.context;

    log.info("Auth provision started @", user.value);
  }

  public onProvisionEnded(): void {
    log.info("Auth provision ended");
  }

}
