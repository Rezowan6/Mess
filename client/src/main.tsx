import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryProvider } from "@/app/providers/query.provider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/providers/auth.provider.tsx";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <App />
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
);
