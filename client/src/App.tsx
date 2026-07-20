import { RouterProvider } from "react-router-dom";

import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
import { router } from "./app/router";

function App() {
  return (
    <>
      <RouterProvider router={router} />

      <ConfirmModal />
    </>
  );
}

export default App;
