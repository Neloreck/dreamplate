import { ComponentClass } from "react";

// View.
import { DefaultLoader, LazyLoadComponentFactory } from "@Main/view/utils";

export const HomePage: ComponentClass = LazyLoadComponentFactory.getComponent(
  () => import(
    /* webpackChunkName: "home@home-page" */
    /* webpackPreload: undefined */
    "./HomePage.component")
);

export { IHomePageInjectedProps } from "./HomePage.component";
