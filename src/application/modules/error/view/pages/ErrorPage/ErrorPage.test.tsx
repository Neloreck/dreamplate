import { shallow } from "enzyme";
import { Classes } from "jss";

import { createMockClasses, createMockContext } from "@/lib/testing";

import { ErrorPage } from "./ErrorPage.component";

describe("Error page component rendering.", () => {
  const classes: Classes = createMockClasses();

  it("Should match snapshot.", () => {
    const wrapper = shallow(<ErrorPage classes={classes} routerContext={createMockContext()} />);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
