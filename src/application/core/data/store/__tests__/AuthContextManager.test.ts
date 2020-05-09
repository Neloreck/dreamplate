import { getCurrent } from "dreamstate";
import { registerWorker, unRegisterWorker } from "dreamstate/test-utils";

// Data.
import { AuthContextManager } from "@Core/data/store";

describe("Auth context manager.", () => {
  beforeEach(() => registerWorker(AuthContextManager));
  afterEach(() => unRegisterWorker(AuthContextManager));

  it("Should initialize without default user and flags.", () => {
    const manager: AuthContextManager = getCurrent(AuthContextManager)!;

    expect(manager.context.user.value).toBeNull();
    expect(manager.context.user.isLoading).toBeFalsy();
  });
});
