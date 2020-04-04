// Data.
import { AuthContextManager } from "@Core/data/store";

describe("Auth context manager.", () => {

  it("Should initialize without default user and flags.", () => {

    const manager: AuthContextManager = new AuthContextManager();

    expect(manager.context.user.value).toBeNull();
    expect(manager.context.user.isLoading).toBeFalsy();

    // @ts-ignore privacy.
    manager.onProvisionStarted();

    // @ts-ignore privacy.
    manager.onProvisionEnded();
  });
});
