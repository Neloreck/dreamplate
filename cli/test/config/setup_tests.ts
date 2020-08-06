import { configure } from "enzyme";
import * as React from "react";

configure({ adapter: new (require("enzyme-adapter-react-16"))() });

// @ts-ignore globals.
global.React = React;
