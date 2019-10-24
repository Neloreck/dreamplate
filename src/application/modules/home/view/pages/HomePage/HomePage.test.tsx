import "@Test/utils/mock_custom_elements";

// Test.
import { createMockClasses } from "@Lib/utils/styling_testing";
import { shallow } from "enzyme";

// View.
import { HomePage } from "./HomePage.component";

describe("Home page component rendering.", () => {

  const classes: Record<string, string> = createMockClasses();

  it("Should match snapshot.", () => {

    const wrapper = shallow(<HomePage classes={classes}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
