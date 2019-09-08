import {
  ComponentClass,
  ComponentType,
  createElement, FunctionComponent,
  PureComponent,
  ReactNode,
} from "react";

// Data.
import { applicationConfig } from "@Main/data/configs/ApplicationConfig";

export class LazyLoadComponentFactory {

  public static getComponent(importFunc: () => Promise<any>, loadingNode?: FunctionComponent<any>): ComponentClass {

    // todo: Functional with suspense.
    // tslint:disable-next-line
    return class extends PureComponent {

      public static displayName: string = applicationConfig.isDev ? "LazyLoader" : "ll";

      private static COMPONENT_INSTANCE: ComponentType;

      private ready: boolean = false;

      public async componentDidMount(): Promise<void> {

        this.ready = true;

        await this.loadComponent();

        if (this.ready) {
          this.forceUpdate();
        }
      }

      public componentWillUnmount(): void {
        this.ready = false;
      }

      public render(): ReactNode {

        // @ts-ignore static function props.
        const RenderItem = this.constructor.COMPONENT_INSTANCE;

        /*
         * You can implement custom spinner there or something else instead.
         */
        return RenderItem
          ? <RenderItem {...this.props}/>
          : loadingNode ? createElement(loadingNode) : null;
      }

      private async loadComponent(): Promise<void> {

        // @ts-ignore static function props.
        const component = this.constructor.COMPONENT_INSTANCE;

        if (!component) {

          const module: any = await importFunc();
          // @ts-ignore static function props. Todo: Optional param?
          this.constructor.COMPONENT_INSTANCE = module[Object.keys(module)[0]];
        }
      }
    };
  }

}
