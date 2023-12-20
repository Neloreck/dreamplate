import { mockManager } from "dreamstate/test-utils";

import { AuthManager } from "@/core/data/store";

describe("Auth context manager.", () => {
  it("should initialize without default user and flags.", () => {
    const manager: AuthManager = mockManager(AuthManager);

    expect(manager.context.user.value).toBeNull();
    expect(manager.context.user.isLoading).toBeFalsy();
  });
});
