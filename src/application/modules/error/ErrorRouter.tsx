import { ReactElement, createElement, ReactNode, useMemo } from "react";
import { Route, Routes } from "react-router-dom";

import { DefaultErrorFallback } from "@/core/view/layouts";
import { ErrorPage } from "@/modules/error/view/pages";

export function ErrorRouter(): ReactElement {
  const redirectNode: ReactNode = useMemo(() => createElement(() => <DefaultErrorFallback reload={false} />), []);

  return (
    <Routes>
      <Route path={"/not_found"} element={<ErrorPage />} />
      <Route path={"/error"} element={<ErrorPage />} />
      <Route path={"*"} element={redirectNode} />
    </Routes>
  );
}
