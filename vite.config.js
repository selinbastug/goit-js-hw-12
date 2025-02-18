import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { glob } from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        input: "index.html",
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
      outDir: "dist",
      emptyOutDir: true,
    },
    plugins: [react(), injectHTML(), FullReload(["./src/**/**.html"])],
  };
});
