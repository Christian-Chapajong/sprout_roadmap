import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./screens/Mobile/Home";
import "../tailwind.css"; // make sure this path points to your tailwind.css at project root

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
