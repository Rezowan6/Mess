import { Controller, useFormContext } from "react-hook-form";

import { useAllMembers } from "@/modules/user-management/hooks/useAllMembers";

import { PartyMemberSelectorSkeleton } from "@/modules/party-expense/components/PartyMemberSelectorSkeleton";
import { Checkbox } from "@/shared/components/ui/Checkbox";
import type { EggFormValues } from "../schemas/egg.schema";

export const EggMemberSelector = () => {
  const { control } = useFormContext<EggFormValues>();

  const { data, isPending } = useAllMembers();

  const members = data?.data ?? [];

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Select Member</h3>

      {isPending ? (
        <PartyMemberSelectorSkeleton />
      ) : (
        <Controller
          name="memberId"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <div className="max-h-60 space-y-2 overflow-y-auto rounded-md border border-info p-3">
                {members.map((member) => {
                  const userId = member.user.id;
                  const selected = field.value === userId;

                  return (
                    <label
                      key={userId}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${
                        selected
                          ? "bg-success/10 ring-1 ring-success"
                          : "bg-info/10 hover:bg-success/10"
                      }`}
                    >
                      <Checkbox
                        checked={selected}
                        onChange={() => field.onChange(userId)}
                      />

                      <div>
                        <p
                          className={`font-medium ${
                            selected ? "text-success" : "text-info"
                          }`}
                        >
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
