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
                  <label className="mb-2 flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-theme-info hover:opacity-80">
                    <Checkbox
                      checked={allSelected}
                      onChange={handleToggleAll}
                    />
                    {allSelected ? "Deselect All" : "Select All"}
                  </label>
                )}

                <div className="max-h-60 space-y-2 overflow-y-auto rounded-theme-md border border-theme-border p-3">
                  {members.length === 0 && (
                    <p className="text-sm text-theme-text-muted">
                      No members found
                    </p>
                  )}

                  {members.map((member) => {
                    const userId: MemberId = member.user.id;
                    const selected = isSelected(userId);

                    return (
                      <label
                        key={userId}
                        className={`flex cursor-pointer items-center gap-3 rounded-theme-lg px-2 py-1 transition ${
                          selected
                            ? "bg-theme-success-soft"
                            : "bg-theme-info-soft hover:bg-theme-success-soft"
                        }`}
                      >
                        <Avatar
                          size="xs"
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
                              selected
                                ? "text-theme-success"
                                : "text-theme-info"
                            }`}
                          >
                            {member.user.name}
                          </p>
                          <p className="text-sm text-theme-text-muted">
                            {member.user.email}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {fieldState.error?.message && (
                  <p className="text-sm text-theme-danger">
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
