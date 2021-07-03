import { useManager } from "dreamstate";
import { ReactElement, useCallback } from "react";
import { createUseStyles } from "react-jss";

import { RouterManager } from "@/core/data/store";
import { MainHeader } from "@/core/view/components/MainHeader";
import { IApplicationTheme } from "@/lib/theme";

export const useStyles = createUseStyles(({ spacing }: IApplicationTheme) => ({
  content: {
    "& > button": {
      margin: spacing.unit * 2
    },
    alignItems: "center",
    alignSelf: "normal",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    overflowY: "auto",
    padding: spacing.unit * 2
  }
}));

export function AboutPage({
  classes: { content } = useStyles(),
  routerContext: { routingActions: { hardPush } } = useManager(RouterManager)
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
