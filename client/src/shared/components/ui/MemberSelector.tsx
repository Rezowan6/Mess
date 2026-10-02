import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { PartyMemberSelectorSkeleton } from "@/modules/party-expense/components/skeleton/PartyMemberSelectorSkeleton";
import { useAllMembers } from "@/modules/user-management/hooks/useAllMembers";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Checkbox } from "@/shared/components/ui/Checkbox";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { useSearchParamsOnly } from "@/shared/hooks/useSearchParams";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";

type MemberId = number;

type BaseProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
};

type SingleSelectProps = {
  multiple?: false;
  showSelectAll?: never;
};

type MultiSelectProps = {
  multiple: true;
  showSelectAll?: boolean;
};

type MemberSelectorProps<T extends FieldValues> = BaseProps<T> &
  (SingleSelectProps | MultiSelectProps);

export const MemberSelector = <T extends FieldValues>({
  name,
  label = "Select Member",
  multiple = false,
  showSelectAll = false,
}: MemberSelectorProps<T>) => {
  const { search, handleSearch } = useSearchParamsOnly({
    key: "memberSearch",
  });
  const { control } = useFormContext<T>();

  const { data, isPending } = useAllMembers(search);

  const members = data?.data ?? [];
  const currentPageIds: MemberId[] = members.map((member) => member.user.id);

  return (
    <div className="space-y-3">
      <h3 className="font-medium">{label}</h3>
      <SearchInput value={search} onChange={handleSearch} />

      {isPending ? (
        <PartyMemberSelectorSkeleton />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => {
            const value = field.value as MemberId | MemberId[] | undefined;
            const selectedIds: MemberId[] = Array.isArray(value) ? value : [];

            const isSelected = (userId: MemberId) =>
              multiple ? selectedIds.includes(userId) : value === userId;

            const allSelected =
              currentPageIds.length > 0 &&
              currentPageIds.every((id) => selectedIds.includes(id));

            const handleToggleAll = () => {
              if (allSelected) {
                field.onChange(
                  selectedIds.filter((id) => !currentPageIds.includes(id)),
                );
              } else {
                field.onChange([
                  ...new Set([...selectedIds, ...currentPageIds]),
                ]);
              }
            };

            const handleToggleOne = (userId: MemberId, checked: boolean) => {
              if (!multiple) {
                field.onChange(userId);
                return;
              }

              field.onChange(
                checked
                  ? [...selectedIds, userId]
                  : selectedIds.filter((id) => id !== userId),
              );
            };

            return (
              <>
                {multiple && showSelectAll && members.length > 0 && (
                  <label className="mb-2 flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-info hover:text-info/80">
                    <Checkbox
                      checked={allSelected}
                      onChange={handleToggleAll}
                    />
                    {allSelected ? "Deselect All" : "Select All"}
                  </label>
                )}

                <div className="max-h-60 space-y-2 overflow-y-auto rounded-md border border-info p-3">
                  {members.length === 0 && (
                    <p className="text-sm opacity-60">No members found</p>
                  )}

                  {members.map((member) => {
                    const userId: MemberId = member.user.id;
                    const selected = isSelected(userId);

                    return (
                      <label
                        key={userId}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${
                          selected
                            ? "bg-success/10 ring-1 ring-success"
                            : "bg-info/10 hover:bg-success/10"
                        }`}
                      >
                        <Avatar
                          src={member.user.avatar}
                          fallback={getAvatarInitial(member.user.name)}
                        />
                        <Checkbox
                          checked={selected}
                          onChange={(checked) =>
                            handleToggleOne(userId, Boolean(checked))
                          }
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
                  <p className="text-sm text-error">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            );
          }}
        />
      )}
    </div>
  );
};
