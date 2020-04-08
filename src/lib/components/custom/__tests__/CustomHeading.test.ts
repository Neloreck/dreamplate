// Lib.
import { CustomHeading } from "@Lib/components/custom/CustomHeading";

describe("Spinner loader web component.", () => {
  it("Should have proper default parameters.", async () => {
    const heading: CustomHeading = new CustomHeading();

    heading.text = "Mock";
    heading.size = 1;

    expect(heading.size).toBe(1);

    document.body.appendChild(heading);

    await heading.updateComplete;

    document.body.removeChild(heading);
  });

  it("Should handle inner text changes.", async () => {
    const heading: CustomHeading = new CustomHeading();

    heading.text = "1";
    document.body.appendChild(heading);
    await heading.updateComplete;

    heading.text = "2";
    await heading.updateComplete;

    document.body.removeChild(heading);
  });
});
