import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import pagesPlugin from "vite-plugin-pages";

export default defineConfig({
  plugins: [solid(), pagesPlugin()],
})
