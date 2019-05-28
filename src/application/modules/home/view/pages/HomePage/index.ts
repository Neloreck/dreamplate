import { ComponentClass, createElement } from "react";

// View.
import { LazyLoadComponentFactory } from "@Main/view/utils";

export const HomePage: ComponentClass = LazyLoadComponentFactory.getComponent(
  () => import(
    /* webpackChunkName: "home@home-page" */
    /* webpackPreload: true */
    "./HomePage.component"),
  createElement("div", {}, "Loading...") /* Fallback for loading time. */
);

export { IHomePageInjectedProps }from "./HomePage.Component";
