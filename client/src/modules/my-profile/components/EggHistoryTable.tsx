import { Table } from "@/shared/components/ui/Table";

import { useEggHistoryColumns } from "../configs/eggHistory.columns";

import { EGG_HISTORY_MESSAGES } from "../configs/eggHistory.messages";

interface IEggHistory {
  id: number;
  quantity: number | string;
  eggDate: string;
  createdAt: string;
}

interface Props {
  eggs: IEggHistory[];
}

export const EggHistoryTable = ({ eggs }: Props) => {
  const columns = useEggHistoryColumns();

  return (
    <Table
      columns={columns}
      data={eggs}
      loading={false}
      error={false}
      message={EGG_HISTORY_MESSAGES}
      refetch={() => {}}
    />
  );
};
