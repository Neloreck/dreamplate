import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";

import "document-register-element";

Enzyme.configure({ adapter: new Adapter() });

// @ts-ignore globals.
global.React = React;
