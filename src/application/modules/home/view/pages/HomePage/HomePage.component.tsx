/**
 * @module @application/home
 */

import { PureComponent, ReactNode } from "react";
import { WithStyles } from "react-jss";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { IMainHeaderInjectedProps, MainHeader } from "@Modules/home/view/components/MainHeader";
import { homePageStyle } from "./HomePage.style";

import "@Lib/components/custom/CustomCard";

// Props.
export interface IHomePageOwnProps {}

export interface IHomePageInjectedProps extends WithStyles<typeof homePageStyle> {}

export interface IHomePageProps extends IHomePageOwnProps, IHomePageInjectedProps {}

@Styled(homePageStyle)
export class HomePage extends PureComponent<IHomePageProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <>

        <MainHeader {...{} as IMainHeaderInjectedProps}/>

        <main className={classes.content}>

          { this.renderReferenceCard("React", "https://reactjs.org/") }

          { this.renderReferenceCard("Typescript", "https://www.typescriptlang.org/") }

          { this.renderReferenceCard("DreamState", "https://github.com/Neloreck/dreamstate/") }

        </main>

      </>
    );
  }

  private renderReferenceCard(label: string, href: string): ReactNode {

    const { classes } = this.props;

    return (
      <custom-card
        class={classes.cardLink}
      >

        <a
          href={href}
          target={"_blank"}
          rel={"noreferrer"}
        >
          { label }
        </a>

      </custom-card>
    );
  }

}
