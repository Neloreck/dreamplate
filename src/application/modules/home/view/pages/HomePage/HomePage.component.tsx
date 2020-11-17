import { useManager } from "dreamstate";
import { ReactElement, ReactNode, useCallback } from "react";
import { createUseStyles } from "react-jss";

import { down } from "@Macro/style.macro";

import { IApplicationTheme } from "@Lib/theme";

import { RouterContextManager } from "@Core/data/store";
import { MainHeader } from "@Core/view/components/MainHeader";

export const useStyles = createUseStyles(({ palette, spacing }: IApplicationTheme) => ({
  cardLink: {
    "& a": {
      color: palette.text.primary
    },
    backgroundColor: palette.background.paper,
    display: "flex",
    justifyContent: "center",
    minWidth: spacing.unit * 15
  },
  content: {
    alignItems: "center",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    overflowY: "auto"
  },
  linkCard: {
    [down("sm")]: {
      flexDirection: "column"
    },
    display: "flex",
    flexDirection: "row",
    padding: spacing.unit * 10
  }
}));

const renderReferenceCard = (className: string, label: string, href: string): ReactNode => (
  <div className={className}>
    <a
      href={href}
      target={"_blank"}
      rel={"noopener noreferrer"}
    >
      { label }
    </a>
  </div>
);

export function HomePage({
  classes: { content, cardLink, linkCard } = useStyles(),
  routerContext: { routingActions: { hardPush } } = useManager(RouterContextManager)
}): ReactElement {
  const onAboutNavigated = useCallback(() => hardPush("/about"), []);

  return (
    <>
      <MainHeader/>

      <main className={content}>

        <div className={linkCard}>
          { renderReferenceCard(cardLink, "React", "https://reactjs.org/") }
          { renderReferenceCard(cardLink, "Typescript", "https://www.typescriptlang.org/") }
          { renderReferenceCard(cardLink, "DreamState", "https://github.com/Neloreck/dreamstate/") }
        </div>

        <button onClick={onAboutNavigated}>
          About
        </button>
      </main>

    </>
  );
}
