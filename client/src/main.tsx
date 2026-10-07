import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import { QueryProvider } from "@/app/providers/query.provider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/providers/auth.provider.tsx";

import App from "./App.tsx";
import "./index.css";

import "@/styles/globals.css";
import "@/styles/theme.css";
import { SocketProvider } from "./app/providers/SocketProvider.tsx";
import { ThemeProvider } from "./app/providers/ThemeProvider.tsx";
import { OfflineMessage } from "./shared/components/pwa/OfflineMessage.tsx";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <App />
          <OfflineMessage />
          <Toaster position="top-right" containerStyle={{ top: "64px" }} />
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryProvider>,
);
