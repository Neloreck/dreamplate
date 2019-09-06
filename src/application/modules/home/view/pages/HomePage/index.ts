import { ComponentClass } from "react";

// View.
import { LazyLoadComponentFactory } from "@Main/view/utils";

export const HomePage: ComponentClass = LazyLoadComponentFactory.getComponent(
  () => import(
    "./HomePage.component")
);

export { IHomePageInjectedProps } from "./HomePage.component";
