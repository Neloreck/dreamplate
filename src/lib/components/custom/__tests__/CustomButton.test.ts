// Lib.
import { CustomButton } from "@Lib/components/custom/CustomButton";

describe("Custom button web component.", () => {
  it("Should have proper default parameters.", async () => {
    const customButton: CustomButton = new CustomButton();

    document.body.appendChild(customButton);

    await customButton.updateComplete;

    expect(customButton.innerHTML).toBe("");

    expect(customButton.getAttribute("size")).toBeNull();
    expect(customButton.getAttribute("color")).toBeNull();

    document.body.removeChild(customButton);
  });

  it("Should properly nest children.", async () => {
    const mockLabel: string = "Random Label " + Math.random();
    const mockDiv: HTMLDivElement = document.createElement("div");

    mockDiv.innerHTML = mockLabel;

    const customButton: CustomButton = new CustomButton();

    document.body.appendChild(customButton);
    customButton.appendChild(mockDiv);

    await customButton.updateComplete;

    expect(customButton.innerHTML).toBe(`<div>${mockLabel}</div>`);

    document.body.removeChild(customButton);
  });
});
