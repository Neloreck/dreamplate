// Lib.
import { CustomCard } from "@Lib/components/custom/CustomCard";

describe("Spinner loader web component.", () => {

  it("Should have proper default parameters.", async () => {

    const card: CustomCard = new CustomCard();

    document.body.appendChild(card);

    await card.updateComplete;

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

    expect(customCard.innerHTML).toBe(`<div>${mockLabel}</div>`);

    document.body.removeChild(customCard);
  });
});
