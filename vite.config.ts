// vite.config.ts
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import path from "path";

// ⬅️ CHANGE THIS to your repo name (case-sensitive!)
const repoName = "sprout_roadmap";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  publicDir: "./static",
  // For Project Pages:
  base: `/${repoName}/`,
  // For User/Org Pages (alt): base: "/",
  css: { postcss: { plugins: [tailwind()] } },
  // resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
}));
