// vite.config.ts
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import path from "path";

const repoName = "sprout_roadmap";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "development" ? "/" : `/${repoName}/`,
  css: { postcss: { plugins: [tailwind()] } },
  resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
}));
