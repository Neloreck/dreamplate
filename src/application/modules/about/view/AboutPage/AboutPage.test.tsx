import "@Test/utils/mock_custom_elements";

import { shallow } from "enzyme";

// Lib.
import { createMockClasses, createMockContext } from "@Lib/testing";

// View.
import { AboutPage } from "./AboutPage.component";

describe("About page component rendering.", () => {
  const classes: Record<string, string> = createMockClasses();

  it("Should match HOC snapshot.", () => {
    const wrapper = shallow(<AboutPage classes={classes} routerContext={createMockContext()}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
