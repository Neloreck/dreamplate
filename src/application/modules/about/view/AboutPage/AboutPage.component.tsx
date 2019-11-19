/**
 * @module @application/about
 */

import { useManager } from "dreamstate";
import { ReactElement, useCallback } from "react";

// Data.
import { RouterContextManager } from "@Main/data/store";

// View.
import { MainHeader } from "@Main/view/components/MainHeader";
import { useStyles } from "./AboutPage.style";

import "@Lib/components/custom/CustomButton";

export function AboutPage(): ReactElement {

  const { routingActions: { hardPush } } = useManager(RouterContextManager);
  const { content } = useStyles();

  const onHomeNavigated = useCallback(() => hardPush("/home"), []);

  return (
    <>

      <MainHeader/>

      <main className={content}>

        About page.

        <custom-button onClick={onHomeNavigated}>
          Go home
        </custom-button>

      </main>

    </>
  );

}
