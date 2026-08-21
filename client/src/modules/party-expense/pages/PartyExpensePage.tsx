// File: PartyExpensePage.tsx

import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AddPartyExpenseModal } from "../components/AddPartyExpenseModal";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Button } from "@/shared/components/ui/Button";

export const PartyExpensePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <ManagementPage
        title="Party Expenses"
        description="Manage party expenses and participating members."
        action={
          <Button variant="moduleBtn" onClick={() => setIsOpen(true)}>
            Add Party Expense
          </Button>
        }
      >
        <Outlet />
      </ManagementPage>

      <AddPartyExpenseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
