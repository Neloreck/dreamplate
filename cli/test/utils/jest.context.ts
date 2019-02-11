// https://jestjs.io/docs/en/api -> Jest.
// https://airbnb.io/enzyme/docs/api/ -> Shallow. Rendering of lazy_load etc.

import * as Adapter from "enzyme-adapter-react-16";

import * as DotEnv from "dotenv";
import * as enzyme from "enzyme";
import toJSON from "enzyme-to-json";
import * as path from "path";

DotEnv.config({path: path.resolve(__dirname, "../build/.env")});
enzyme.configure({adapter: new (Adapter as any)()});

export {forSeconds} from "./jest.utility";

export const render = enzyme.render;
export const shallow = enzyme.shallow;
export const toJson = toJSON;
