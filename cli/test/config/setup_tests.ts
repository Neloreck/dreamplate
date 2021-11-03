import { configure } from "enzyme";

configure({
  adapter: new (require("@wojtekmaj/enzyme-adapter-react-17"))()
});
