/**
 * @module @application/home
 */

import { RouterContextManager } from "@Main/data/store";
import { useManager } from "dreamstate";
import { ReactElement, ReactNode, useCallback } from "react";

// View.
import { MainHeader } from "@Main/view/components/MainHeader";
import { useStyles } from "./HomePage.style";

import "@Lib/components/custom/CustomCard";

export function HomePage(): ReactElement {

  const { routingActions: { hardPush } } = useManager(RouterContextManager);
  const { content, cardLink, linkCard } = useStyles();

  const onAboutNavigated = useCallback(() => hardPush("/about"), []);

  return (
    <>

      <MainHeader/>

      <main className={content}>

        <div className={linkCard}>

          { renderReferenceCard(cardLink, "React", "https://reactjs.org/") }

          { renderReferenceCard(cardLink, "Typescript", "https://www.typescriptlang.org/") }

          {renderReferenceCard(cardLink, "DreamState", "https://github.com/Neloreck/dreamstate/") }

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
