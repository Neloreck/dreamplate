import { shallow } from "enzyme";
import { Classes } from "jss";

import { createMockClasses, createMockContext } from "@/lib/testing";
import { HomePage } from "@/modules/home/view/pages/HomePage/HomePage.component";

describe("Home page component rendering.", () => {
  const classes: Classes = createMockClasses();

  it("Should match snapshot.", () => {
    const wrapper = shallow(<HomePage classes={classes} routerContext={createMockContext()}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
