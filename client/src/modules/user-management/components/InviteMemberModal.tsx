import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { useInviteMember } from "../hooks/useInviteMember";
import { inviteSchema, type InviteFormValues } from "../schemas/invite.schema";

import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROLES } from "@/shared/constants/roles";
import { ROLE_OPTIONS } from "@/shared/constants/selectOptions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteMemberModal = ({
  isOpen,
  onClose,
}: InviteMemberModalProps) => {
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

  const onSubmit = (data: InviteFormValues) => {
    inviteMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <RecordFormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite Member"
      isEdit={false}
      isPending={inviteMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={PERMISSIONS.USER_INVITE}
    >
      <Input
        label="Email"
        type="email"
        leftIcon={<Mail size={18} />}
        placeholder="member@email.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Select
        label="Role"
        options={ROLE_OPTIONS}
        error={errors.role?.message}
        {...register("role")}
      />
    </RecordFormModal>
  );
};
