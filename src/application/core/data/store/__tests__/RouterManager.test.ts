import { mockManager } from "dreamstate/test-utils";

import { RouterManager } from "@/core/data/store";

describe("Auth context manager.", () => {
  it("Should initialize history and itself.", async () => {
    const manager: RouterManager = mockManager(RouterManager);

    expect(manager.context.path).toBe("/");
    expect(manager.history).not.toBeNull();
  });
});
