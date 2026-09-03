import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { inviteSchema, type InviteFormValues } from "../schemas/invite.schema";

import { useInviteMember } from "../hooks/useInviteMember";

import { ROLES } from "@/shared/constants/roles";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";
import { Select } from "@/shared/components/ui/Select";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROLE_OPTIONS } from "@/shared/constants/selectOptions";
import { useState } from "react";

export const InviteMemberModal = () => {
  const { can } = useRBAC();

  const inviteMutation = useInviteMember();

  const [isOpen, setIsOpen] = useState(false);

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
      <Button
        variant="moduleBtn"
        permission={PERMISSIONS.USER_INVITE}
        onClick={() => setIsOpen(true)}
      >
        Invite Member
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Invite Member"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <Input
            label="Email"
            type="email"
            leftIcon={<Mail size={18} />}
            placeholder="member@email.com"
            error={errors?.email?.message}
            {...register("email")}
          />

          <Select
            label="Role"
            options={ROLE_OPTIONS}
            error={errors.role?.message}
            {...register("role")}
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="error"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="success"
              type="submit"
              loading={inviteMutation.isPending}
              loadingText="Sending..."
              permission={PERMISSIONS.USER_INVITE}
            >
              Send Invite
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
