import { RouterProvider } from "react-router-dom";

import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
import { router } from "./app/router";
import { useApplyTheme } from "./shared/hooks/useApplyTheme";

function App() {
  useApplyTheme();
  return (
    <>
      <RouterProvider router={router} />

      <ConfirmModal />
    </>
  );
}

export default App;
