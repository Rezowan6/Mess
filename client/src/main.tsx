import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryProvider } from "@/app/providers/query.provider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/providers/auth.provider.tsx";

import App from "./App.tsx";

import "@/styles/globals.css";
import "@/styles/theme.css";
import { ThemeProvider } from "./app/providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <App />
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
);
