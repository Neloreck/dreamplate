import { useManager } from "dreamstate";
import { ReactElement, useCallback } from "react";
import { createUseStyles } from "react-jss";

import { IApplicationTheme } from "@Lib/theme";

import { RouterContextManager } from "@Core/data/store";
import { MainHeader } from "@Core/view/components/MainHeader";

export const useStyles = createUseStyles(({ palette }: IApplicationTheme) => ({
  content: {
    alignItems: "center",
    alignSelf: "normal",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    overflowY: "auto"
  }
}));

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

        <button onClick={onHomeNavigated}>
          Go home
        </button>
      </main>
    </>
  );
}
