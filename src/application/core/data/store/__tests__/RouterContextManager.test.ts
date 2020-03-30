// Data.
import { RouterContextManager } from "@Core/data/store";

describe("Auth context manager.", () => {

  it("Should initialize history and itself.", async () => {

    const manager: RouterContextManager = new RouterContextManager();

    expect(manager.context.routingState.path).toBe("/");

    expect(RouterContextManager.HISTORY).not.toBeNull();

    // @ts-ignore privacy.
    manager.onProvisionStarted();

    // @ts-ignore privacy.
    manager.onProvisionEnded();
  });

  it("Should use history for navigation.", async () => {

    const mock = jest.fn();
    const manager: RouterContextManager = new RouterContextManager();

    // Push.

    RouterContextManager.HISTORY.push = mock;

    manager.push("/push");

    expect(mock).toBeCalledWith("/push");

    // Replace.

    RouterContextManager.HISTORY.replace = mock;

    manager.replace("/replace");

    expect(mock).toBeCalledWith("/replace");

    // Go back..

    RouterContextManager.HISTORY.goBack = mock;

    manager.goBack();

    expect(mock).toBeCalled();
  });
});
