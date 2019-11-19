/**
 * @module @application/main
 */

import { useManager } from "dreamstate";
import { ReactElement } from "react";

// Data.
import { ThemeContextManager } from "@Main/data/store";

// View.
import { useStyles } from "./MainHeader.style";

import "@Lib/components/custom/CustomButton";
import "@Lib/components/custom/CustomHeading";

export function MainHeader(): ReactElement {

  const { themeActions: { toggleTheme } } = useManager(ThemeContextManager);
  const { root } = useStyles();

  return (
    <header className={root}>

      <custom-heading text={"Dreamplate"} size={4}/>

      <custom-button onClick={toggleTheme}> Toggle </custom-button>

    </header>
  );
}
