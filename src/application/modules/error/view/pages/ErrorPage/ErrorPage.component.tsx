/**
 * @module @application/error
 */

import { useManager } from "dreamstate";
import { ReactElement, useCallback } from "react";

// Data.
import { RouterContextManager } from "@Main/data/store";

// View.
import { MainHeader } from "@Main/view/components/MainHeader";
import { useStyles } from "./ErrorPage.style";

import "@Lib/components/custom/CustomButton";
import "@Lib/components/custom/CustomCard";

export function ErrorPage(): ReactElement {

  const { routingActions: { hardPush } } = useManager(RouterContextManager);
  const { content, labelCard } = useStyles();

  const onHomeNavigated = useCallback(() => hardPush("/home"), []);

  return (
    <>

      <MainHeader/>

      <main className={content}>

        <custom-card class={labelCard}>
          Page was not found.
        </custom-card>

        <custom-button onClick={onHomeNavigated}>
          Go Home
        </custom-button>

      </main>

    </>
  );
}
