
import { shallow } from "enzyme";

import { createMockClasses, createMockContext } from "@Lib/testing";

import { ErrorPage } from "./ErrorPage.component";

describe("Error page component rendering.", () => {
  const classes: Record<string, string> = createMockClasses();

  it("Should match snapshot.", () => {
    const wrapper = shallow(<ErrorPage classes={classes} routerContext={createMockContext()}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
