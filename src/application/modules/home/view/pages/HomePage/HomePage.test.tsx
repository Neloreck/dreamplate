import "@Test/utils/mock_custom_elements";

import { shallow } from "enzyme";

// Test.
import { createMockClasses, createMockContext } from "@Lib/testing";

// View.
import { HomePage } from "./HomePage.component";

describe("Home page component rendering.", () => {

  const classes: Record<string, string> = createMockClasses();

  it("Should match snapshot.", () => {

    const wrapper = shallow(<HomePage classes={classes} routerContext={createMockContext()}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
