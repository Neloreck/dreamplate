import { mockManagerWithScope } from "dreamstate/test-utils";

import { AuthManager } from "@/core/data/store";

describe("Auth context manager.", () => {
  it("Should initialize without default user and flags.", () => {
    const [ authManager ] = mockManagerWithScope(AuthManager);

    expect(authManager.context.user.value).toBeNull();
    expect(authManager.context.user.isLoading).toBeFalsy();
  });
});
