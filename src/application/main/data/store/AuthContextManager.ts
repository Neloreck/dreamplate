import { ContextManager } from "dreamstate";

// Lib.
import { Optional } from "@Lib/ts/types";
import { Logger } from "@Lib/utils";

export interface IAuthContext {
  authActions: {
  };
  authState: {
    authorizing: boolean;
    authorized: boolean;
    user: Optional<string>;
  };
}

export class AuthContextManager extends ContextManager<IAuthContext> {

  protected context: IAuthContext = {
    authActions: {
    },
    authState: {
      authorized: false,
      authorizing: false,
      user: null
    }
  };

  private readonly log: Logger = new Logger("[🎛️AUTH]", true);

  protected onProvisionStarted(): void {
    this.log.info("Started auth context provision.");
  }

}
