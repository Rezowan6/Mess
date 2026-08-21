import { Controller, useFormContext } from "react-hook-form";

import { useAllMembers } from "@/modules/user-management/hooks/useAllMembers";
import type { PartyExpenseFormValues } from "../schemas/partyExpense.schema";

export const PartyMemberSelector = () => {
  const { control } = useFormContext<PartyExpenseFormValues>();

  const { data, isPending } = useAllMembers();

  const members = data?.data ?? [];

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Select Members</h3>

      {isPending ? (
        <p className="text-sm opacity-60">Loading members...</p>
      ) : (
        <Controller
          name="memberIds"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <div className="max-h-60 space-y-2 overflow-y-auto rounded-lg border border-base-300 p-3">
                {members.map((member) => {
                  const userId = member.user.id;
                  const checked = field.value.includes(userId);

                  return (
                    <label
                      key={userId}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-base-200"
                    >
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, userId]);
                          } else {
                            field.onChange(
                              field.value.filter((id) => id !== userId),
                            );
                          }
                        }}
                      />

                      <div>
                        <p className="font-medium text-text">
                          {member.user.name}
                        </p>

                        <p className="text-sm opacity-60">
                          {member.user.email}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {fieldState.error?.message && (
                <p className="text-sm text-error">{fieldState.error.message}</p>
              )}
            </>
          )}
        />
      )}
    </div>
  );
};
