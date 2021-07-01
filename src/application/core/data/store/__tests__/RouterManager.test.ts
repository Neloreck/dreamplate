import { mockManagerWithScope } from "dreamstate/test-utils";

import { RouterManager } from "@Core/data/store";

describe("Auth context manager.", () => {
  it("Should initialize history and itself.", async () => {
    const [ routerManager ]= mockManagerWithScope(RouterManager)!;

    expect(routerManager.context.path).toBe("/");
    expect(routerManager.history).not.toBeNull();
  });

  it("Should use history for navigation.", async () => {
    const mock = jest.fn();
    const [ routerManager ]= mockManagerWithScope(RouterManager)!;

    routerManager.history.push = mock;
    routerManager.push("/push");

    expect(mock).toHaveBeenCalledWith("/push");

    routerManager.history.replace = mock;
    routerManager.replace("/replace");

    expect(mock).toHaveBeenCalledWith("/replace");

    routerManager.history.goBack = mock;
    routerManager.goBack();

    expect(mock).toHaveBeenCalled();
  });
});
