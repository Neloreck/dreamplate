import "@Test/utils/mock_custom_elements";

import { shallow } from "enzyme";

// Lib.
import { createMockClasses } from "@Lib/utils/styling_testing";

// View.
import { ErrorPage } from "./ErrorPage.component";

describe("Error page component rendering.", () => {

  const classes: Record<string, string> = createMockClasses();

  it("Should match snapshot.", () => {

    const wrapper = shallow(<ErrorPage classes={classes}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
