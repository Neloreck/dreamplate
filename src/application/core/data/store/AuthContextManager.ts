import {ContextManager, createLoadable, Hmr, ILoadable} from "dreamstate";

// Lib.
import { TOptional } from "@Lib/ts";
import { log } from "@Macro/log.macro";

/**
 * Auth context description.
 */
export interface IAuthContext {
  authActions: {
  };
  user: ILoadable<TOptional<string>>;
}

/**
 * Context manager related to auth and user management.
 * It is responsible for auth, security and account management.
 */
@Hmr(module)
export class AuthContextManager extends ContextManager<IAuthContext> {

  public context: IAuthContext = {
    authActions: {
    },
    user: createLoadable(null)
  };

  protected onProvisionStarted(): void {

    const { user } = this.context;

    log.info("Auth provision started @", user.value);
  }

}
