import path from "path";
import { defineConfig } from "vite";
import pagesPlugin from "vite-plugin-pages";
import solid from "vite-plugin-solid";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [solid(), solidSvg(), pagesPlugin()],
});
