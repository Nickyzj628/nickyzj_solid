/* @refresh reload */
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { render } from "solid-js/web";
import routes from "~solid-pages";

const Layout = () => {
  return (
    <MetaProvider>
      <nav>
        <a href="/">Home</a>
        <a href="/blogs">Blogs</a>
        <a href="/animes">Animes</a>
        <a href="/about">About</a>
      </nav>
      <Router>{routes}</Router>
    </MetaProvider>
  );
};

render(() => <Layout />, document.body);