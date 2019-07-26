import { ComponentClass } from "react";

// View.
import { DefaultLoader } from "@Main/view/utils";
import { LazyLoadComponentFactory } from "@Main/view/utils/LazyLoadComponentFactory";

export const HomeModule: ComponentClass = LazyLoadComponentFactory.getComponent(
  () => import(
    /* webpackChunkName: "module@home" */
    /* webpackPreload: undefined */
    "./HomeRouter"
    ),
  DefaultLoader
);
