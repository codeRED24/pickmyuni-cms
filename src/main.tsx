import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);

root.render(
  import.meta.env.VITE_NODE_ENV !== "production" ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);
