import { Banknote } from "lucide-react";

interface Deposit {
  id: number;
  amount: number;
  paymentMethod: string;
  createdAt: string;
}

interface Props {
  deposits: Deposit[];
}

export const MyProfileRecentDeposits = ({ deposits }: Props) => {
  return (
    <div className="rounded-2xl bg-background p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="font-semibold">Recent Deposits</h3>
        <p className="text-sm opacity-60">Your latest deposit history</p>
      </div>

      {deposits.length === 0 ? (
        <p className="py-6 text-center text-sm opacity-60">No deposits found</p>
      ) : (
        <div className="space-y-3">
          {deposits.slice(0, 5).map((deposit) => (
            <div
              key={deposit.id}
              className="flex items-center justify-between rounded-xl bg-info/10 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-success/10 p-2 text-success">
                  <Banknote size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium">{deposit.paymentMethod}</p>

                  <p className="text-xs opacity-50">
                    {new Date(deposit.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <span className="font-semibold text-success">
                +৳ {Number(deposit.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-info pt-4">
        <span className="font-medium">Total Deposit</span>

        <span className="text-lg font-bold text-success">
          ৳{" "}
          {deposits
            .reduce((total, deposit) => total + Number(deposit.amount), 0)
            .toFixed(2)}
        </span>
      </div>
    </div>
  );
};
