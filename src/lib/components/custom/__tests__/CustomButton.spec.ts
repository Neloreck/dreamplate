// Lib.
import { CustomButton } from "@Lib/components/custom/CustomButton";
import { nestedShadowOf } from "@Lib/components/utils/testing";

describe("Custom button web component.", () => {

  it("Should have proper default parameters.", async () => {

    const customButton: CustomButton = new CustomButton();

    document.body.appendChild(customButton);

    await customButton.updateComplete;

    expect(customButton.label).toBe("");
    expect(customButton.size).toBe("md");
    expect(customButton.shadowRoot!.innerHTML).toBe(nestedShadowOf(CustomButton, ""));

    document.body.removeChild(customButton);
  });

  it("Should properly nest children.", async () => {

    const mockLabel: string = "Random Label " + Math.random();
    const customButton: CustomButton = new CustomButton();

    document.body.appendChild(customButton);

    await customButton.updateComplete;

    customButton.label = mockLabel;

    await customButton.updateComplete;

    expect(customButton.label).toBe(mockLabel);
    expect(customButton.shadowRoot!.innerHTML).toBe(nestedShadowOf(CustomButton, mockLabel));
  });
});
