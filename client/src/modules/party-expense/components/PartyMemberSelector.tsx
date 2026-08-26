import { Controller, useFormContext } from "react-hook-form";

import { useAllMembers } from "@/modules/user-management/hooks/useAllMembers";
import { Checkbox } from "@/shared/components/ui/Checkbox";
import type { PartyExpenseFormValues } from "../schemas/partyExpense.schema";
import { PartyMemberSelectorSkeleton } from "./PartyMemberSelectorSkeleton";

export const PartyMemberSelector = () => {
  const { control } = useFormContext<PartyExpenseFormValues>();

  const { data, isPending } = useAllMembers();

  const members = data?.data ?? [];

  return (
    <div className="space-y-3">
      {isPending ? (
        <PartyMemberSelectorSkeleton />
      ) : (
        <>
          <h3 className="font-medium">Select Members</h3>
          <Controller
            name="memberIds"
            control={control}
            render={({ field, fieldState }) => {
              const allSelected =
                members.length > 0 &&
                members.every((member) => field.value.includes(member.user.id));

              return (
                <>
                  {/* Select All button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (allSelected) {
                        field.onChange([]);
                      } else {
                        field.onChange(members.map((member) => member.user.id));
                      }
                    }}
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-info hover:text-info/80 cursor-pointer"
                  >
                    <Checkbox
                      checked={allSelected}
                      onChange={() => {
                        if (allSelected) {
                          field.onChange([]);
                        } else {
                          field.onChange(
                            members.map((member) => member.user.id),
                          );
                        }
                      }}
                    />
                    {allSelected ? "Deselect All" : "Select All"}
                  </button>
                  <div className="max-h-60 space-y-2 overflow-y-auto rounded-md border border-info p-3">
                    {members.map((member) => {
                      const userId = member.user.id;
                      const checked = field.value.includes(userId);

                      return (
                        <label
                          key={userId}
                          className="flex cursor-pointer items-center gap-3 rounded-lg p-2 bg-info/10 hover:bg-success/10"
                        >
                          <Checkbox
                            checked={checked}
                            onChange={(value) => {
                              if (value) {
                                field.onChange([...field.value, userId]);
                              } else {
                                field.onChange(
                                  field.value.filter((id) => id !== userId),
                                );
                              }
                            }}
                          />

                          <div>
                            <p className="font-medium text-info">
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
                    <p className="text-sm text-error">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              );
            }}
          />
        </>
      )}
    </div>
  );
};
