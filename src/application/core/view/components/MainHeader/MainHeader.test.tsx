import { shallow } from "enzyme";
import { Classes } from "jss";

import { createMockClasses, createMockContext } from "@Lib/testing";

import { MainHeader } from "./MainHeader.component";

describe("Main header component rendering.", () => {
  const mockClasses: Classes = createMockClasses();

  it("Should match snapshot.", () => {
    const wrapper = shallow(<MainHeader classes={mockClasses} themeContext={createMockContext()}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
