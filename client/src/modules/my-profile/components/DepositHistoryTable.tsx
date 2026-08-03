import { Table } from "@/shared/components/ui/Table";

import { useDepositHistoryColumns } from "../configs/depositHistory.columns";
import { DEPOSIT_HISTORY_MESSAGES } from "../configs/depositHistory.messages";

interface IDepositHistory {
  id: number;
  amount: number;
  paymentMethod: string;
  createdAt: string;
}

interface Props {
  deposits: IDepositHistory[];
}

export const DepositHistoryTable = ({ deposits }: Props) => {
  const columns = useDepositHistoryColumns();

  return (
    <Table
      columns={columns}
      data={deposits}
      loading={false}
      error={false}
      message={DEPOSIT_HISTORY_MESSAGES}
      refetch={() => {}}
    />
  );
};
