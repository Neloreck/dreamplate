// Test.
import { getThemedComponent, withMockedTheme } from "@Lib/theme/testing";
import { shallow } from "enzyme";

// View.
import { IMainHeaderInjectedProps, MainHeader } from "./MainHeader.component";

describe("Main header component rendering.", () => {

  it("Should match HOC snapshot.", () => {

    const wrapper = shallow(<MainHeader {...{} as IMainHeaderInjectedProps}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });

  it("Should match mounted snapshot with default theme.", () => {

    const wrapper = shallow(withMockedTheme(<MainHeader {...{} as IMainHeaderInjectedProps}/>));
    const mounted = getThemedComponent(wrapper);

    expect(mounted).toMatchSnapshot("Mounted with default theme.");
  });
});
