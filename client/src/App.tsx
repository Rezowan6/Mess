import { RouterProvider } from "react-router-dom";

import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
import { router } from "./app/router";

import "./App.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />

      <ConfirmModal />
    </>
  );
}

export default App;
