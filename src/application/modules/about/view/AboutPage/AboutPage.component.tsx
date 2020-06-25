import { useManager } from "dreamstate";
import { ReactElement, useCallback } from "react";

import { RouterContextManager } from "@Core/data/store";
import { MainHeader } from "@Core/view/components/MainHeader";

import { useStyles } from "./AboutPage.style";

import "@Lib/components/custom/CustomButton";

export function AboutPage({
  classes: { content } = useStyles(),
  routerContext: { routingActions: { hardPush } } = useManager(RouterContextManager)
}): ReactElement {
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
