import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ...(mode === "development" ? [screenGraphPlugin() as any] : []), // avoid boolean in array; cast to any to dodge type mismatch
  ],
  publicDir: "./static",
  base: "./",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
