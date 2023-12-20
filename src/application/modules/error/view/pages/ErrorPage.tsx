import { useManager } from "dreamstate";
import { ReactElement } from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

import { RouterManager } from "@/core/data/store";
import { MainHeader } from "@/core/view/components";
import { IApplicationTheme } from "@/lib/theme";

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
    transitionDuration: "500ms",
  },
  labelCard: {
    backgroundColor: palette.secondary.light,
  },
}));

export function ErrorPage({
  classes: { content, labelCard } = useStyles(),
  routerContext: { history } = useManager(RouterManager),
}): ReactElement {
  return (
    <>
      <MainHeader />

      <main className={content}>
        <div className={labelCard}>
          {IS_DEV ? "Page was not found or current path is not serving by dev server." : "Page was not found."}
        </div>

        <Link to={history.createHref("/home")} reloadDocument>
          <button> Go Home </button>
        </Link>
      </main>
    </>
  );
}
