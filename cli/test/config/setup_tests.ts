import * as React from "react";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// @ts-ignore globals.
global.React = React;
