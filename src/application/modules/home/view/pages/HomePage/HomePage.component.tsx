/**
 * @module @application/home
 */

import { useManager } from "dreamstate";
import { ReactElement, ReactNode, useCallback } from "react";

// Data.
import { RouterContextManager } from "@Main/data/store";

// View.
import { MainHeader } from "@Main/view/components/MainHeader";
import { useStyles } from "./HomePage.style";

import "@Lib/components/custom/CustomCard";

// Sub-render util.
const renderReferenceCard = (className: string, label: string, href: string): ReactNode => (
  <custom-card class={className}>

    <a
      href={href}
      target={"_blank"}
      rel={"noreferrer"}
    >
      { label }
    </a>

  </custom-card>
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

        <custom-button
          color={"grayscale"}
          onClick={onAboutNavigated}
        >
          About
        </custom-button>

      </main>

    </>
  );
}
