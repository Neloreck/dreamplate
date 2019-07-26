import { Fragment, memo, NamedExoticComponent, useLayoutEffect, useState } from "react";

// Data.
import { themeContextManager } from "@Main/data/store";

const initialLoad: number = Date.now();
let lastUpdate: number= 0;

// tslint:disable-next-line
export const DefaultLoader: NamedExoticComponent<object> = memo(function() {

  const [ show, setShow ]: [ boolean, (value: boolean) => void ] = useState(
    (Date.now() - initialLoad) > 500 &&
    (Date.now() - lastUpdate) < 3000
  );

  const { theme: { palette, spacing } } = themeContextManager.context.themeState;
  const timeout: number = window.setTimeout( () => setShow(true), 510);

  useLayoutEffect(() => { lastUpdate = Date.now(); });
  useLayoutEffect(() => () => window.clearTimeout(timeout));

  return (
    show
      ?
      <Fragment key={"cl"}>
        <div className={"cl"}/>
        <style>
          {`
            .cl {
              width: ${spacing.unit * 25}px;
              height: ${spacing.unit * 25}px;
              border-radius: 50%;
              border: 15px solid #fff;
              border-color: ${palette.primary.main} transparent ${palette.primary.dark} transparent;
              animation: cl-rotation 1.5s linear infinite;
             }

             @keyframes cl-rotation {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
           `}
        </style>
      </Fragment>
      : null
  );
});
