// Lib.
import { CustomCard } from "@Lib/components/custom/CustomCard";
import { nestedShadowSlotOf } from "@Lib/components/utils/testing";

describe("Spinner loader web component.", () => {

  it("Should have proper default parameters.", async () => {

    const card: CustomCard = new CustomCard();

    document.body.appendChild(card);

    await card.updateComplete;

    expect(card.shadowRoot!.innerHTML).toBe(nestedShadowSlotOf(CustomCard, ""));

    document.body.removeChild(card);
  });

  it("Should handle nested slots.", async () => {

    const mockLabel: string = "Random Label " + Math.random();
    const mockDiv: HTMLDivElement = document.createElement("div");

    mockDiv.innerHTML = mockLabel;

    const customCard: CustomCard = new CustomCard();

    document.body.appendChild(customCard);
    customCard.appendChild(mockDiv);

    await customCard.updateComplete;

    expect(customCard.shadowRoot!.innerHTML).toBe(nestedShadowSlotOf(CustomCard, ""));
    expect(customCard.innerHTML).toBe(`<div>${mockLabel}</div>`);

    document.body.removeChild(customCard);
  });
});
