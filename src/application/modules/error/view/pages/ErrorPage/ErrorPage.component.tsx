import { useManager } from "dreamstate";
import { ReactElement, useCallback } from "react";
import { createUseStyles } from "react-jss";

import { IApplicationTheme } from "@Lib/theme";

import { RouterManager } from "@Core/data/store";
import { MainHeader } from "@Core/view/components/MainHeader";

export const useStyles = createUseStyles(({ palette }: IApplicationTheme) => ({
  content: {
    alignItems: "center",
    alignSelf: "normal",
    backgroundColor: palette.background.default,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexWrap: "nowrap",
    justifyContent: "center",
    overflowY: "auto",
    transitionDuration: "500ms"
  },
  labelCard: {
    backgroundColor: palette.secondary.light
  }
}));

export function ErrorPage({
  classes: { content, labelCard } = useStyles(),
  routerContext: { routingActions: { hardPush } } = useManager(RouterManager)
}): ReactElement {
  const onHomeNavigated = useCallback(() => hardPush("/home"), []);

  return (
    <>
      <MainHeader/>

      <main className={content}>
        <div className={labelCard}>
          { IS_DEV ? "Page was not found or current path is not serving by dev server." : "Page was not found." }
        </div>

        <button onClick={onHomeNavigated}> Go Home </button>
      </main>
    </>
  );
}
