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

import { useCreateCurrentBill } from "../hooks/useCreateCurrentBill";
import { useUpdateCurrentBill } from "../hooks/useUpdateCurrentBill";
import {
  CURRENT_BILL_PAYMENT_METHOD_OPTIONS,
  getCurrentBillSchema,
  normalizePaymentMethod,
  type CurrentBillFormValues,
} from "../schemas/currentBill.schema";
import type { ICurrentBill } from "../types/currentBill.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentBill?: ICurrentBill;
}

// Select works with string values, the form keeps real numbers
const MONTH_SELECT_OPTIONS = MONTH_OPTIONS.map((month) => ({
  label: month.label,
  value: String(month.value),
}));

const getDefaultValues = (): DefaultValues<CurrentBillFormValues> => {
  const { month, year } = getCurrentMonthYear();

  return {
    userId: undefined,
    amount: undefined,
    paymentMethod: "cash",
    month, // current month is selected by default
    year,
  };
};

export const CurrentBillFormModal = ({
  isOpen,
  onClose,
  currentBill,
}: Props) => {
  const isEdit = Boolean(currentBill);

  const { can } = useRBAC();
  const createMutation = useCreateCurrentBill();
  const updateMutation = useUpdateCurrentBill();

  const schema = useMemo(() => getCurrentBillSchema(isEdit), [isEdit]);

  const methods = useForm<CurrentBillFormValues>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors, dirtyFields },
  } = methods;

  // Keep an old bill's year selectable even if it is outside the normal range
  const yearOptions = useMemo(() => {
    const options = getYearOptions().map((year) => ({
      label: year.label,
      value: String(year.value),
    }));

    if (
      currentBill &&
      !options.some((o) => o.value === String(currentBill.year))
    ) {
      options.push({
        label: String(currentBill.year),
        value: String(currentBill.year),
      });
    }

    return options;
  }, [currentBill]);

  // Fill the form every time the modal opens
  useEffect(() => {
    if (!isOpen) return;

    reset(
      currentBill
        ? {
            userId: currentBill.userId,
            amount: Number(currentBill.amount),
            paymentMethod: normalizePaymentMethod(currentBill.paymentMethod),
            month: currentBill.month,
            year: currentBill.year,
          }
        : getDefaultValues(),
    );
  }, [isOpen, currentBill, reset]);

  const permission = isEdit
    ? PERMISSIONS.CURRENT_BILL_UPDATE
    : PERMISSIONS.CURRENT_BILL_CREATE;

  // All hooks are above this line, so the early return is safe
  if (!can(permission)) return null;

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (values: CurrentBillFormValues) => {
    if (currentBill) {
      // Send only what the user changed. Month and year always go together.
      const payload: Partial<Omit<CurrentBillFormValues, "userId">> = {
        ...(dirtyFields.amount && { amount: toMoney(values.amount) }),
        ...(dirtyFields.paymentMethod && {
          paymentMethod: values.paymentMethod,
        }),
        ...((dirtyFields.month || dirtyFields.year) && {
          month: values.month,
          year: values.year,
        }),
      };

      if (Object.keys(payload).length === 0) {
        onClose();
        return;
      }

      updateMutation.mutate(
        { id: currentBill.id, payload },
        { onSuccess: onClose },
      );
      return;
    }

    // The schema already guarantees this, it only narrows the type
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
        title={isEdit ? "Update Current Bill" : "Add Current Bill"}
        isEdit={isEdit}
        isPending={isPending}
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
                options={MONTH_SELECT_OPTIONS}
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
          inputMode="decimal"
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
              options={CURRENT_BILL_PAYMENT_METHOD_OPTIONS}
              error={errors.paymentMethod?.message}
              onChange={(event) => field.onChange(event.target.value)}
            />
          )}
        />

        {!isEdit && (
          <MemberSelector<CurrentBillFormValues>
            name="userId"
            label="Select Member"
          />
        )}
      </RecordFormModal>
    </FormProvider>
  );
};
