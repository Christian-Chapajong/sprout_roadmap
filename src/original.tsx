import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IphoneHome } from "./screens/IphoneHome/IphoneHome_copy"; // ⬅️ use your home screen

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <IphoneHome />
  </StrictMode>,
);