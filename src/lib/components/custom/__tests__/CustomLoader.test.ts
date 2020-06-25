import { CustomLoader } from "@Lib/components/custom/CustomLoader";
import { forMillis } from "@Lib/utils/delay";

describe("Custom loader web component.", () => {
  it("Should have proper default parameters.", async () => {
    const loader: CustomLoader = new CustomLoader();

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
    const loader: CustomLoader = new CustomLoader();

    loader.width = 1000;

    expect(loader.width).toBe(1000);

    document.body.appendChild(loader);

    await loader.updateComplete;

    expect(loader.style.width).toBe("1000px");
    expect(loader.style.height).toBe("50px");
    expect(loader.style.borderWidth).toBe("10px");

    document.body.removeChild(loader);
  });

  it("Should wait for a short time before triggering loader.", async () => {
    const loader: CustomLoader = new CustomLoader();

    expect(loader.getAttribute("loading")).toBeNull();

    document.body.appendChild(loader);

    await loader.updateComplete;

    expect(loader.getAttribute("loading")).toBeNull();

    await forMillis(CustomLoader.LOADER_DISPLAY_DELAY);

    expect(loader.getAttribute("loading")).toBeTruthy();

    document.body.removeChild(loader);
  });
});
