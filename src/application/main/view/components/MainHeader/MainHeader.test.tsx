import "@Test/utils/mock_custom_elements";

// Lib.
import { createMockClasses } from "@Lib/utils/styling_testing";

// Test.
import { shallow } from "enzyme";

// View.
import { MainHeader } from "./MainHeader.component";

describe("Main header component rendering.", () => {

  const mockClasses: Record<string, string> = createMockClasses();

  it("Should match snapshot.", () => {

    const wrapper = shallow(<MainHeader classes={mockClasses}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
