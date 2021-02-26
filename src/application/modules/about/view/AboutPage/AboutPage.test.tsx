import { shallow } from "enzyme";
import { Classes } from "jss";

import { createMockClasses, createMockContext } from "@Lib/testing";

import { AboutPage } from "./AboutPage.component";

describe("About page component rendering.", () => {
  const classes: Classes = createMockClasses();

  it("Should match HOC snapshot.", () => {
    const wrapper = shallow(<AboutPage classes={classes} routerContext={createMockContext()}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
