import { mockManager } from "dreamstate/test-utils";

import { RouterManager } from "@/core/data/store";

describe("Auth context manager.", () => {
  it("Should initialize history and itself.", async () => {
    const manager: RouterManager = mockManager(RouterManager);

    expect(manager.context.path).toBe("/");
    expect(manager.history).not.toBeNull();
  });

  it("Should use history for navigation.", async () => {
    const mock = jest.fn();
    const manager: RouterManager = mockManager(RouterManager);

    manager.history.push = mock;
    manager.push("/push");

    expect(mock).toHaveBeenCalledWith("/push");

    manager.history.replace = mock;
    manager.replace("/replace");

    expect(mock).toHaveBeenCalledWith("/replace");

    manager.history.goBack = mock;
    manager.goBack();

    expect(mock).toHaveBeenCalled();
  });
});
