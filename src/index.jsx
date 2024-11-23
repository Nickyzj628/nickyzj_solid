/* @refresh reload */
import { Router } from "@solidjs/router";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import { render } from "solid-js/web";
import routes from "~solid-pages";
import App from "./App";
import "./index.css";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

render(() =>
  <Router root={App} >{routes}</Router>,
  document.body,
);