import "@Test/utils/mock_custom_elements";

import { shallow } from "enzyme";

// Lib.
import { createMockClasses } from "@Lib/testing/styling_testing";

// View.
import { ErrorPage } from "./ErrorPage.component";
import { createMockContext } from "@Lib/testing";

describe("Error page component rendering.", () => {

  const classes: Record<string, string> = createMockClasses();

  it("Should match snapshot.", () => {

    const wrapper = shallow(<ErrorPage classes={classes} routerContext={createMockContext()}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
