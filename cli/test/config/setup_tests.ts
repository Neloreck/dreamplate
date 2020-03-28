import * as React from "react";
import { configure } from "enzyme";

configure({ adapter: new (require("enzyme-adapter-react-16"))() });

// @ts-ignore globals.
global.React = React;
