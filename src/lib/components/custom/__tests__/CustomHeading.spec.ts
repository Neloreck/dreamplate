// Lib.
import { CustomHeading } from "@Lib/components/custom/CustomHeading";
import { nestedShadowValueOf } from "@Lib/components/utils/testing";

describe("Spinner loader web component.", () => {

  it("Should have proper default parameters.", async () => {

    const heading: CustomHeading = new CustomHeading();

    heading.text = "Mock";

    expect(heading.size).toBe(1);

    document.body.appendChild(heading);

    await heading.updateComplete;

    expect(heading.shadowRoot!.innerHTML).toBe(nestedShadowValueOf(CustomHeading, "Mock"));

    document.body.removeChild(heading);
  });

  it("Should handle inner text changes.", async () => {

    const heading: CustomHeading = new CustomHeading();

    heading.text = "1";

    document.body.appendChild(heading);

    await heading.updateComplete;

    expect(heading.shadowRoot!.innerHTML).toBe(nestedShadowValueOf(CustomHeading, "1"));

    heading.text = "2";

    await heading.updateComplete;

    expect(heading.shadowRoot!.innerHTML).toBe(nestedShadowValueOf(CustomHeading, "2"));

    document.body.removeChild(heading);
  });
});
