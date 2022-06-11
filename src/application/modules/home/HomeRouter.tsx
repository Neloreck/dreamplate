import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { DefaultErrorFallback } from "@/core/view/layouts";
import { HomePage } from "@/modules/home/view/pages";

export function HomeRouter(): ReactElement {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/home"} element={<HomePage />} />
      <Route path={"*"} element={<DefaultErrorFallback />} />
    </Routes>
  );
}
