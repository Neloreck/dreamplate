import { memo, NamedExoticComponent, useLayoutEffect, useState } from "react";

// Data.
import { applicationConfig } from "@Main/data/configs";
import { themeContextManager } from "@Main/data/store";

// tslint:disable-next-line
export const DefaultLoader: NamedExoticComponent<object> = memo(function() {

  const { theme: { palette, spacing } } = themeContextManager.context.themeState;
  const [ show, setShow ]: [ boolean, (value: boolean) => void ] = useState((Date.now() - applicationConfig.initialLoad) > 500);

  useLayoutEffect(() => {

    const timeout: number = window.setTimeout( () => setShow(true), 510);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    show
      ?
      <>
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
      </>
      : null
  );
});
