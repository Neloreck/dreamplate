// Lib.
import { SpinnerLoader } from "@Lib/components/custom/SpinnerLoader";
import { nestedShadowOf } from "@Lib/components/utils/testing";
import { forMillis } from "@Lib/utils/delay";

describe("Spinner loader web component.", () => {

  it("Should have proper default parameters.", async () => {

    const loader: SpinnerLoader = new SpinnerLoader();

    expect(loader.width).toBe(50);
    expect(loader.height).toBe(50);
    expect(loader.borderWidth).toBe(10);

    document.body.appendChild(loader);

    await loader.updateComplete;

    expect(loader.style.width).toBe("50px");
    expect(loader.style.height).toBe("50px");
    expect(loader.style.borderWidth).toBe("10px");

    document.body.removeChild(loader);
  });

  it("Should properly change width and affect only one property.", async () => {

    const loader: SpinnerLoader = new SpinnerLoader();

    loader.width = 1000;

    expect(loader.width).toBe(1000);

    document.body.appendChild(loader);

    await loader.updateComplete;

    expect(loader.style.width).toBe("1000px");
    expect(loader.style.height).toBe("50px");
    expect(loader.style.borderWidth).toBe("10px");

    expect(loader.shadowRoot!.innerHTML).toBe(nestedShadowOf(SpinnerLoader));

    document.body.removeChild(loader);
  });

  it("Should wait for a short time before triggering loader.", async () => {

    const loader: SpinnerLoader = new SpinnerLoader();

    expect(loader.getAttribute("loading")).toBeNull();

    document.body.appendChild(loader);

    await loader.updateComplete;

    expect(loader.getAttribute("loading")).toBeNull();

    await forMillis(SpinnerLoader.LOADER_DISPLAY_DELAY);

    expect(loader.getAttribute("loading")).toBeTruthy();

    document.body.removeChild(loader);
  });
});
