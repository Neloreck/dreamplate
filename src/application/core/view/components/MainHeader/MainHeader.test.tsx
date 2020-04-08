import "@Test/utils/mock_custom_elements";

import { shallow } from "enzyme";

// Lib.
import { createMockClasses, createMockContext } from "@Lib/testing";

// View.
import { MainHeader } from "./MainHeader.component";

describe("Main header component rendering.", () => {
  const mockClasses: Record<string, string> = createMockClasses();

  it("Should match snapshot.", () => {
    const wrapper = shallow(<MainHeader classes={mockClasses} themeContext={createMockContext()}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
