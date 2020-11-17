import { shallow } from "enzyme";

import { createMockClasses, createMockContext } from "@Lib/testing";

import { MainHeader } from "./MainHeader.component";

describe("Main header component rendering.", () => {
  const mockClasses: Record<string, string> = createMockClasses();

  it("Should match snapshot.", () => {
    const wrapper = shallow(<MainHeader classes={mockClasses} themeContext={createMockContext()}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
