import { getCurrent } from "dreamstate";
import { registerWorker, unRegisterWorker } from "dreamstate/test-utils";

// Data.
import { RouterContextManager } from "@Core/data/store";

describe("Auth context manager.", () => {
  beforeEach(() => registerWorker(RouterContextManager));
  afterEach(() => unRegisterWorker(RouterContextManager));

  it("Should initialize history and itself.", async () => {
    const manager: RouterContextManager = getCurrent(RouterContextManager)!;

    expect(manager.context.path).toBe("/");
    expect(manager.history).not.toBeNull();
  });

  it("Should use history for navigation.", async () => {
    const mock = jest.fn();
    const manager: RouterContextManager = getCurrent(RouterContextManager)!;

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
