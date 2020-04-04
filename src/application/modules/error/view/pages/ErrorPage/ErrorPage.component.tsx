/**
 * @packageDocumentation
 * @module @application/error
 */

import { useManager } from "dreamstate";
import { ReactElement, useCallback } from "react";

// Data.
import { RouterContextManager } from "@Core/data/store";

// View.
import { MainHeader } from "@Core/view/components/MainHeader";
import { useStyles } from "./ErrorPage.style";

import "@Lib/components/custom/CustomButton";
import "@Lib/components/custom/CustomCard";

export function ErrorPage({
  classes: { content, labelCard } = useStyles(),
  routerContext: { routingActions: { hardPush } } = useManager(RouterContextManager)
}): ReactElement {

  const onHomeNavigated = useCallback(() => hardPush("/home"), []);

  return (
    <>

      <MainHeader/>

      <main className={content}>

        <custom-card class={labelCard}>
          { IS_DEV ? "Page was not found or current path is not serving by dev server." : "Page was not found." }
        </custom-card>

        <custom-button onClick={onHomeNavigated}>
          Go Home
        </custom-button>

      </main>

    </>
  );
}
