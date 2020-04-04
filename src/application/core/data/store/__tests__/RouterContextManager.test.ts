// Data.
import { RouterContextManager } from "@Core/data/store";

describe("Auth context manager.", () => {

  it("Should initialize history and itself.", async () => {

    const manager: RouterContextManager = new RouterContextManager();

    expect(manager.context.path).toBe("/");
    expect(manager.history).not.toBeNull();
  });

  it("Should use history for navigation.", async () => {

    const mock = jest.fn();
    const manager: RouterContextManager = new RouterContextManager();

    // Push.
    manager.history.push = mock;
    manager.push("/push");
    expect(mock).toBeCalledWith("/push");

    // Replace.
    manager.history.replace = mock;
    manager.replace("/replace");
    expect(mock).toBeCalledWith("/replace");

    // Go back..
    manager.history.goBack = mock;
    manager.goBack();

    expect(mock).toBeCalled();
  });
});
