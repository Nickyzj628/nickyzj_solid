/* @refresh reload */
import { Router } from "@solidjs/router";
import { render } from "solid-js/web";
import routes from "~solid-pages";
import App from "./App";
import "./index.css";

render(() =>
  <Router root={App} >{routes}</Router>,
  document.body,
);