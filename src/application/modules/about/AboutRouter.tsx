import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { DefaultErrorFallback } from "@/core/view/layouts";
import { AboutPage } from "@/modules/about/view";

export function AboutRouter(): ReactElement {
  return (
    <Routes>
      <Route path={"/about"} element={<AboutPage />} />

      <Route element={<DefaultErrorFallback />} />
    </Routes>
  );
}
