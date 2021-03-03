import { configure } from "enzyme";
import * as React from "react";

configure({
  adapter: new (require("enzyme-adapter-react-16"))()
});

(global as NodeJS.Global & { React?: typeof React }).React = React;
