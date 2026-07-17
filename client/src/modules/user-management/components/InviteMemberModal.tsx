import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { inviteSchema, type InviteFormValues } from "../schemas/invite.schema";

import { useInviteMember } from "../hooks/useInviteMember";

import { ROLES } from "@/shared/constants/roles";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";

export const InviteMemberModal = () => {
  const { can } = useRBAC();

  const inviteMutation = useInviteMember();

  const {
    register,

    handleSubmit,

    reset,

    formState: { errors },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),

    defaultValues: {
      role: ROLES.MEMBER,
    },
  });

  if (!can(PERMISSIONS.USER_INVITE)) {
    return null;
  }

  const onSubmit = (data: InviteFormValues) => {
    inviteMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          (
            document.getElementById("invite_member_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        Invite Member
      </button>

      <dialog id="invite_member_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Invite Member</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div>
              <label className="label">Email</label>

              <input
                className="input input-bordered w-full"
                placeholder="member@email.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-error text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="label">Role</label>

              <select
                className="select select-bordered w-full"
                {...register("role")}
              >
                <option value={ROLES.MEMBER}>Member</option>

                <option value={ROLES.MANAGER}>Manager</option>
              </select>

              {errors.role && (
                <p className="text-error text-sm">{errors.role.message}</p>
              )}
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  (
                    document.getElementById(
                      "invite_member_modal",
                    ) as HTMLDialogElement
                  ).close()
                }
              >
                Cancel
              </button>
              <Button
                type="submit"
                loading={inviteMutation.isPending}
                loadingText="Sending..."
                permission={PERMISSIONS.USER_INVITE}
              >
                Send Invite
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
