import "@Test/utils/mock_custom_elements";

import { shallow } from "enzyme";

// Lib.
import { createMockClasses, createMockContext } from "@Lib/testing";

// View.
import { ErrorPage } from "./ErrorPage.component";

describe("Error page component rendering.", () => {
  const classes: Record<string, string> = createMockClasses();

  it("Should match snapshot.", () => {
    const wrapper = shallow(<ErrorPage classes={classes} routerContext={createMockContext()}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
