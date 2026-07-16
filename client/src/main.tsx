import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/app/providers/query.provider";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
      <Toaster position="top-right" />
    </QueryProvider>
  </StrictMode>,
);
