import "@Test/utils/mock_custom_components";

// Test.
import { getThemedComponent, withMockedTheme } from "@Lib/theme/testing";
import { shallow } from "enzyme";

// View.
import { HomePage, IHomePageInjectedProps } from "./HomePage.component";

describe("Home page component rendering.", () => {

  it("Should match HOC snapshot.", () => {

    const wrapper = shallow(<HomePage {...{} as IHomePageInjectedProps}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });

  it("Should match mounted snapshot with default theme.", () => {

    const wrapper = shallow(withMockedTheme(<HomePage {...{} as IHomePageInjectedProps}/>));
    const mounted = getThemedComponent(wrapper);

    expect(mounted).toMatchSnapshot("Mounted with default theme.");
  });
});
