import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  type DefaultValues,
} from "react-hook-form";

import { Input } from "@/shared/components/ui/Input";
import { MemberSelector } from "@/shared/components/ui/MemberSelector";
import { Select } from "@/shared/components/ui/Select";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { useRBAC } from "@/shared/hooks/useRBAC";
import {
  getCurrentMonthYear,
  getYearOptions,
  MONTH_OPTIONS,
} from "@/shared/utils/date.utils";
import { toMoney, toNumber } from "@/shared/utils/form.utils";

import { useCreateKhalaBill } from "../hooks/useCreateKhalaBill";
import { useUpdateKhalaBill } from "../hooks/useUpdateKhalaBill";
import {
  getKhalaBillSchema,
  KHALA_BILL_PAYMENT_METHOD_OPTIONS,
  type KhalaBillFormValues,
} from "../schemas/khalaBill.schema";
import type { IKhalaBill } from "../types/khalaBill.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  khalaBill?: IKhalaBill;
}

const monthOptions = MONTH_OPTIONS.map((month) => ({
  label: month.label,
  value: String(month.value),
}));

const getDefaultValues = (): DefaultValues<KhalaBillFormValues> => {
  const { month, year } = getCurrentMonthYear();

  return {
    userId: undefined,
    amount: undefined,
    paymentMethod: "cash",
    month,
    year,
  };
};

const normalizePaymentMethod = (value?: string | null) => {
  const normalized = (value ?? "").toLowerCase().replace(/\s+/g, "");
  const exists = KHALA_BILL_PAYMENT_METHOD_OPTIONS.some(
    (option) => option.value === normalized,
  );

  return exists ? (normalized as KhalaBillFormValues["paymentMethod"]) : "cash";
};

export const KhalaBillFormModal = ({ isOpen, onClose, khalaBill }: Props) => {
  const isEdit = Boolean(khalaBill);
  const { can } = useRBAC();

  const createMutation = useCreateKhalaBill();
  const updateMutation = useUpdateKhalaBill();

  const schema = useMemo(() => getKhalaBillSchema(isEdit), [isEdit]);

  const methods = useForm<KhalaBillFormValues>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  const yearOptions = useMemo(() => {
    const options = getYearOptions().map((option) => ({
      label: option.label,
      value: String(option.value),
    }));

    if (
      khalaBill &&
      !options.some((option) => option.value === String(khalaBill.year))
    ) {
      options.push({
        label: String(khalaBill.year),
        value: String(khalaBill.year),
      });
    }

    return options;
  }, [khalaBill]);

  useEffect(() => {
    if (!isOpen) return;

    reset(
      khalaBill
        ? {
            userId: khalaBill.userId,
            amount: Number(khalaBill.amount),
            paymentMethod: normalizePaymentMethod(khalaBill.paymentMethod),
            month: khalaBill.month,
            year: khalaBill.year,
          }
        : getDefaultValues(),
    );
  }, [isOpen, khalaBill, reset]);

  const permission = isEdit
    ? PERMISSIONS.KHALA_BILL_UPDATE
    : PERMISSIONS.KHALA_BILL_CREATE;

  if (!can(permission)) return null;

  const onSubmit = (values: KhalaBillFormValues) => {
    if (khalaBill) {
      // Backend update locates the record using its ID, month and year.
      // Send the complete editable payload, not a partial update.
      updateMutation.mutate(
        {
          id: khalaBill.id,
          payload: {
            amount: toMoney(values.amount),
            paymentMethod: values.paymentMethod,
            month: values.month,
            year: values.year,
          },
        },
        { onSuccess: onClose },
      );

      return;
    }

    if (values.userId === undefined) return;

    createMutation.mutate(
      {
        userId: values.userId,
        amount: toMoney(values.amount),
        paymentMethod: values.paymentMethod,
        month: values.month,
        year: values.year,
      },
      { onSuccess: onClose },
    );
  };

  return (
    <FormProvider {...methods}>
      <RecordFormModal
        isOpen={isOpen}
        onClose={onClose}
        title={isEdit ? "Update Khala Bill" : "Add Khala Bill"}
        isEdit={isEdit}
        isPending={createMutation.isPending || updateMutation.isPending}
        onSubmit={handleSubmit(onSubmit)}
        permission={permission}
      >
        <div className="grid grid-cols-2 gap-3">
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <Select
                label="Month"
                value={String(field.value ?? "")}
                options={monthOptions}
                error={errors.month?.message}
                onChange={(event) => field.onChange(Number(event.target.value))}
              />
            )}
          />

          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <Select
                label="Year"
                value={String(field.value ?? "")}
                options={yearOptions}
                error={errors.year?.message}
                onChange={(event) => field.onChange(Number(event.target.value))}
              />
            )}
          />
        </div>

        <Input
          label="Amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter amount"
          leftIcon={<span className="text-sm font-semibold">৳</span>}
          error={errors.amount?.message}
          {...register("amount", { setValueAs: toNumber })}
        />

        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <Select
              label="Payment Method"
              value={field.value}
              options={[...KHALA_BILL_PAYMENT_METHOD_OPTIONS]}
              error={errors.paymentMethod?.message}
              onChange={(event) => field.onChange(event.target.value)}
            />
          )}
        />

        {!isEdit && (
          <MemberSelector<KhalaBillFormValues>
            name="userId"
            label="Select Member"
          />
        )}
      </RecordFormModal>
    </FormProvider>
  );
};
