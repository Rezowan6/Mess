import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import {
  Controller,
  useForm,
  useWatch,
  type DefaultValues,
} from "react-hook-form";

import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { useCreateSettlement } from "../hooks/useCreateSettlement";
import { useUpdateSettlement } from "../hooks/useUpdateSettlement";
import {
  getSettlementSchema,
  SETTLEMENT_PAYMENT_METHOD_OPTIONS,
  type SettlementFormValues,
} from "../schemas/settlement.schema";
import type {
  ICreateSettlementDto,
  ISettlement,
  IUpdateSettlementDto,
} from "../types/settlement.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  settlement?: ISettlement | null;
}

// The server must ignore this and use its own value, it is only for the DTO type
const SETTLEMENT_CURRENCY = "BDT";

const DEFAULT_VALUES: DefaultValues<SettlementFormValues> = {
  memberId: undefined,
  payerId: undefined,
  payeeId: undefined,
  amount: undefined,
  paymentMethod: "CASH",
  transactionReference: "",
  note: "",
};

// Empty input -> undefined (valueAsNumber would give NaN)
const toNumber = (value: unknown): number | undefined =>
  value === "" || value === null || value === undefined
    ? undefined
    : Number(value);

const toMoney = (value: number) => Math.round(value * 100) / 100;

const toNullableText = (value?: string) => value?.trim() || null;

export const SettlementFormModal = ({ isOpen, onClose, settlement }: Props) => {
  const isEdit = Boolean(settlement);
  const { can } = useRBAC();

  const createMutation = useCreateSettlement();
  const updateMutation = useUpdateSettlement();

  const schema = useMemo(() => getSettlementSchema(isEdit), [isEdit]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields },
  } = useForm<SettlementFormValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const paymentMethod = useWatch({ control, name: "paymentMethod" });

  // Fill the form every time the modal opens
  useEffect(() => {
    if (!isOpen) return;

    reset(
      settlement
        ? {
            memberId: settlement.memberId,
            payerId: settlement.payerId,
            payeeId: settlement.payeeId,
            amount: Number(settlement.amount),
            paymentMethod: settlement.paymentMethod,
            transactionReference: settlement.transactionReference ?? "",
            note: settlement.note ?? "",
          }
        : DEFAULT_VALUES,
    );
  }, [isOpen, settlement, reset]);

  const permission = isEdit
    ? PERMISSIONS.SETTLEMENT_UPDATE
    : PERMISSIONS.SETTLEMENT_CREATE;

  // All hooks are above this line, so the early return is safe
  if (!can(permission)) return null;

  const isPending = createMutation.isPending || updateMutation.isPending;
  const showReference = paymentMethod !== "CASH";

  const onSubmit = (values: SettlementFormValues) => {
    // Cash has no transaction reference
    const transactionReference =
      values.paymentMethod === "CASH"
        ? null
        : toNullableText(values.transactionReference);

    if (settlement) {
      // Send only what the user actually changed
      const payload: IUpdateSettlementDto = {
        ...(dirtyFields.amount && { amount: toMoney(values.amount) }),
        ...(dirtyFields.paymentMethod && {
          paymentMethod: values.paymentMethod,
        }),
        ...((dirtyFields.paymentMethod || dirtyFields.transactionReference) && {
          transactionReference,
        }),
        ...(dirtyFields.note && { note: toNullableText(values.note) }),
      };

      if (Object.keys(payload).length === 0) {
        onClose();
        return;
      }

      updateMutation.mutate(
        { id: settlement.id, payload },
        { onSuccess: onClose },
      );
      return;
    }

    // The schema already guarantees these, this only narrows the types
    if (
      values.memberId === undefined ||
      values.payerId === undefined ||
      values.payeeId === undefined
    ) {
      return;
    }

    const payload: ICreateSettlementDto = {
      memberId: values.memberId,
      payerId: values.payerId,
      payeeId: values.payeeId,
      amount: toMoney(values.amount),
      currency: SETTLEMENT_CURRENCY,
      paymentMethod: values.paymentMethod,
      transactionReference,
      note: toNullableText(values.note),
    };

    createMutation.mutate(payload, { onSuccess: onClose });
  };

  return (
    <RecordFormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Settlement" : "Create Settlement"}
      isEdit={isEdit}
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={permission}
    >
      {!isEdit && (
        <>
          <Input
            label="Member ID"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            error={errors.memberId?.message}
            {...register("memberId", { setValueAs: toNumber })}
          />

          <Input
            label="Payer ID"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            error={errors.payerId?.message}
            {...register("payerId", { setValueAs: toNumber })}
          />

          <Input
            label="Payee ID"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            error={errors.payeeId?.message}
            {...register("payeeId", { setValueAs: toNumber })}
          />
        </>
      )}

      <Input
        label="Amount"
        type="number"
        inputMode="decimal"
        min="0.01"
        step="0.01"
        placeholder="0.00"
        error={errors.amount?.message}
        {...register("amount", { setValueAs: toNumber })}
      />

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <Select
            label="Payment Method"
            options={SETTLEMENT_PAYMENT_METHOD_OPTIONS}
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
            error={errors.paymentMethod?.message}
          />
        )}
      />

      {showReference && (
        <Input
          label="Transaction Reference"
          placeholder="Enter transaction reference (optional)"
          autoComplete="off"
          error={errors.transactionReference?.message}
          {...register("transactionReference")}
        />
      )}

      <Input
        label="Note"
        placeholder="Add a note (optional)"
        autoComplete="off"
        error={errors.note?.message}
        {...register("note")}
      />
    </RecordFormModal>
  );
};
