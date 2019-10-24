// Data.
import { AuthContextManager } from "@Main/data/store";

describe("Auth context manager.", () => {

  it("Should initialize without default user and flags.", () => {

    const manager: AuthContextManager = new AuthContextManager();

    expect(manager.context.authState.isAuthorized).toBeFalsy();
    expect(manager.context.authState.isAuthorizing).toBeFalsy();
    expect(manager.context.authDetailsState.user).toBeNull();

    // @ts-ignore privacy.
    manager.onProvisionStarted();

    // @ts-ignore privacy.
    manager.onProvisionEnded();
  });
});
