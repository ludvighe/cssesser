/* @refresh reload */
import { Router, Routes, Route, useNavigate } from "@solidjs/router";
import { lazy, onMount } from "solid-js";
import { render } from "solid-js/web";
import Header from "./components/common/Header";

import "./index.scss";
import { getRandomNumber } from "./services/random.service";
const HomePage = lazy(() => import("./components/pages/home"));

const GraderPage = lazy(() => import("./components/pages/grader"));
const SlicerPage = lazy(() => import("./components/pages/slicer"));
const ShaderPage = lazy(() => import("./components/pages/shader"));
const ConverterPage = lazy(() => import("./components/pages/converter"));

export const routes = {
  grader: {
    name: "Grader",
    path: "/grader",
  },
  slicer: {
    name: "Slicer",
    path: "/slicer",
  },
  shader: {
    name: "Shader",
    path: "/shader",
  },
  converter: {
    name: "Converter",
    path: "/converter",
  },
};

render(
  () => (
    <Router>
      <Header />
      <Routes>
        <Route path={routes.grader.path} element={GraderPage} />
        <Route path={routes.slicer.path} element={SlicerPage} />
        <Route path={routes.shader.path} element={ShaderPage} />
        <Route path={routes.converter.path} element={ConverterPage} />
      </Routes>
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
