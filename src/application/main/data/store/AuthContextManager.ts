import { ReactContextManager } from "@redux-cbd/context";

// Lib.
import { Optional } from "@Lib/ts/types";
import { Logger } from "@Lib/utils";

export interface IAuthContext {
  authActions: {
  };
  authState: {
    authorizing: boolean;
    authorized: boolean;
    errorMessage: Optional<string>;
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
      errorMessage: null,
      user: null
    }
  };

  protected log: Logger = new Logger("[🌋AUTH]", true);

  public onProvisionStarted(): void {
    this.log.info("Auth context started state provision.");
  }

}
