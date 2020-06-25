import { getCurrent } from "dreamstate";
import { registerService, unRegisterService } from "dreamstate/test-utils";

import { AuthContextManager } from "@Core/data/store";

describe("Auth context manager.", () => {
  beforeEach(() => registerService(AuthContextManager));
  afterEach(() => unRegisterService(AuthContextManager));

  it("Should initialize without default user and flags.", () => {
    const manager: AuthContextManager = getCurrent(AuthContextManager)!;

    expect(manager.context.user.value).toBeNull();
    expect(manager.context.user.isLoading).toBeFalsy();
  });
});
