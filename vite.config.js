import path from "path";
import { defineConfig } from "vite";
import pagesPlugin from "vite-plugin-pages";
import solid from "vite-plugin-solid";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [solid(), pagesPlugin()],
})
