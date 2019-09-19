// Test.
import { getThemedComponent, withMockedTheme } from "@Lib/theme/testing";
import { shallow } from "enzyme";

// View.
import { ErrorPage, IErrorPageInjectedProps } from "./ErrorPage.component";

describe("Error page component rendering.", () => {

  it("Should match HOC snapshot.", () => {

    const wrapper = shallow(<ErrorPage {...{} as IErrorPageInjectedProps}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });

  it("Should match mounted snapshot with default theme.", () => {

    const wrapper = shallow(withMockedTheme(<ErrorPage {...{} as IErrorPageInjectedProps}/>));
    const mounted = getThemedComponent(wrapper);

    expect(mounted).toMatchSnapshot("Mounted with default theme.");
  });
});
