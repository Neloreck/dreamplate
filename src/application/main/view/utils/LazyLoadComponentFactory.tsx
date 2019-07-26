import {
  ComponentClass,
  ComponentType,
  createElement, FunctionComponent,
  PureComponent,
  ReactNode,
} from "react";

// Props.
interface ILazyComponentState {
  component: ComponentType;
}

export class LazyLoadComponentFactory {

  public static getComponent(importFunc: () => Promise<any>, loadingNode?: FunctionComponent<any>): ComponentClass {

    // tslint:disable-next-line
    return class extends PureComponent<any, ILazyComponentState> {

      private static COMPONENT_INSTANCE: ComponentType;

      public state: ILazyComponentState = {
        // @ts-ignore static function props.
        component: this.constructor.COMPONENT_INSTANCE
      };

      private ready: boolean = false;

      public componentDidMount(): void {

        this.ready = true;

        this.loadComponent().then();
      }

      public componentWillUnmount(): void {
        this.ready = false;
      }

      public render(): ReactNode {

        const { component: RenderItem } = this.state;

        /*
         * You can implement custom spinner there or something else instead.
         */
        return RenderItem
          ? <RenderItem {...this.props}/>
          : loadingNode ? createElement(loadingNode) : null;
      }

      private async loadComponent(): Promise<void> {

        const { component } = this.state;

        if (!component) {

          const module: any = await importFunc();
          const importedRenderComponent: ComponentType = module[Object.keys(module)[0]];

          // @ts-ignore static function props.
          this.constructor.COMPONENT_INSTANCE = importedRenderComponent;

          if (this.ready) {
            this.setState({ component: importedRenderComponent });
          }
        }
      }

    };
  }

}
