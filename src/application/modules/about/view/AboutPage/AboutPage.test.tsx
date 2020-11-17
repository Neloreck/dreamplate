import { shallow } from "enzyme";

import { createMockClasses, createMockContext } from "@Lib/testing";

import { AboutPage } from "./AboutPage.component";

describe("About page component rendering.", () => {
  const classes: Record<string, string> = createMockClasses();

  it("Should match HOC snapshot.", () => {
    const wrapper = shallow(<AboutPage classes={classes} routerContext={createMockContext()}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
