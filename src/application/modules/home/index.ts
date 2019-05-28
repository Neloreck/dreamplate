import { ComponentClass } from "react";

// View.
import { LazyLoadComponentFactory } from "@Main/view/utils/LazyLoadComponentFactory";

export const HomeModule: ComponentClass = LazyLoadComponentFactory.getComponent(
  () => import(
    /* webpackChunkName: "module@home" */
    /* webpackPreload: true */
    "./HomeRouter")
);
