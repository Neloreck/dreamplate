import { ReactContextManager } from "@redux-cbd/context";

// Lib.
import { Optional } from "@Lib/ts/types";

export interface IAuthContext {
  authActions: {
  };
  authState: {
    authorizing: boolean;
    authorized: boolean;
    user: Optional<string>;
  };
}

export class AuthContextManager extends ReactContextManager<IAuthContext> {

  public context: IAuthContext = {
    authActions: {
    },
    authState: {
      authorized: false,
      authorizing: false,
      user: null
    }
  };

  protected onProvisionStarted(): void {
    // Some kind of state initialization can be there.
  }

}
