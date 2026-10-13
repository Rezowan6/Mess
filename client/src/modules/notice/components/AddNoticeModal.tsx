import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useCreateNotice } from "../hooks/useCreateNotice";
import { useUpdateNotice } from "../hooks/useUpdateNotice";
import { noticeSchema, type NoticeFormValues } from "../schemas/notice.schema";
import type { INotice } from "../types/notice.types";

import { Input } from "@/shared/components/ui/Input";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { useRBAC } from "@/shared/hooks/useRBAC";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  notice?: INotice;
}

export const AddNoticeModal = ({ isOpen, onClose, notice }: Props) => {
  const { can } = useRBAC();
  const createMutation = useCreateNotice();
  const updateMutation = useUpdateNotice();

  const isEdit = !!notice;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (notice) {
      reset({
        title: notice.title,
        description: notice.description,
      });
    } else {
      reset({
        title: "",
        description: "",
      });
    }
  }, [notice, reset]);

  if (!can(isEdit ? PERMISSIONS.NOTICE_UPDATE : PERMISSIONS.NOTICE_CREATE)) {
    return null;
  }

  const onSubmit = (data: NoticeFormValues) => {
    if (isEdit && notice) {
      updateMutation.mutate(
        {
          id: notice.id,
          payload: data,
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  return (
    <RecordFormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Notice" : "Add Notice"}
      isEdit={isEdit}
      isPending={isEdit ? updateMutation.isPending : createMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={
        isEdit ? PERMISSIONS.NOTICE_UPDATE : PERMISSIONS.NOTICE_CREATE
      }
    >
      <Input
        label="Title"
        placeholder="Enter notice title"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        label="Message"
        placeholder="Enter notice message"
        error={errors.description?.message}
        {...register("description")}
      />
    </RecordFormModal>
  );
};
