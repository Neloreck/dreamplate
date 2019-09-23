import "@Test/utils/mock_custom_elements";

// Test.
import { getThemedComponent, withMockedTheme } from "@Lib/theme/testing";
import { shallow } from "enzyme";

// View.
import { AboutPage, IAboutPageInjectedProps } from "./AboutPage.component";

describe("About page component rendering.", () => {

  it("Should match HOC snapshot.", () => {

    const wrapper = shallow(<AboutPage {...{} as IAboutPageInjectedProps}/>);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });

  it("Should match mounted snapshot with default theme.", () => {

    const wrapper = shallow(withMockedTheme(<AboutPage {...{} as IAboutPageInjectedProps}/>));
    const mounted = getThemedComponent(wrapper);

    expect(mounted).toMatchSnapshot("Mounted with default theme.");
  });
});
