import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";

import { useCreateRice } from "../hooks/useCreateRice";
import { useUpdateRice } from "../hooks/useUpdateRice";

import {
  getSavedRiceSupplier,
  saveRiceSupplier,
} from "../utils/riceSupplierStorage";

import { riceSchema, type RiceFormValues } from "../schemas/rice.schema";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import {
  formatDateForInput,
  getLocalDate,
  isLocked,
} from "@/shared/utils/date.utils";
import {
  riceBasicFieldList,
  riceFields,
  riceInitialPaymentFieldList,
} from "../configs/rice.fields.config";
import { RicePaymentStatus, type IRice } from "../types/rice.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rice?: IRice;
}

export const AddRiceModal = ({ isOpen, onClose, rice }: Props) => {
  const createMutation = useCreateRice();
  const updateMutation = useUpdateRice();

  const isEdit = !!rice;

  const savedSupplier = getSavedRiceSupplier();

  const methods = useForm<RiceFormValues>({
    resolver: zodResolver(riceSchema),
    defaultValues: {
      quantity: undefined,
      unitPrice: savedSupplier.unitPrice,
      purchaseType: "PAID",
      supplierName: savedSupplier.supplierName,
      supplierPhone: savedSupplier.supplierPhone,
      purchaseDate: getLocalDate(),
      dueDate: "",
      initialPaymentMethod: "CASH",
      initialPaymentDate: getLocalDate(),
      initialPaymentNote: "",
      note: "",
    },
  });

  const {
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = methods;

  const purchaseType = watch("purchaseType");
  useEffect(() => {
    if (purchaseType === "PAID") {
      methods.setValue("dueDate", "");
    }

    if (purchaseType === "CREDIT") {
      methods.setValue("initialPaymentMethod", "");
      methods.setValue("initialPaymentDate", "");
      methods.setValue("initialPaymentNote", "");
    }
  }, [purchaseType, methods]);

  useEffect(() => {
    if (rice) {
      reset({
        quantity: Number(rice.quantity),
        unitPrice: Number(rice.unitPrice),
        purchaseType: rice.purchaseType,
        supplierName: rice.supplierName ?? "",
        supplierPhone: rice.supplierPhone ?? "",
        purchaseDate: rice.purchaseDate
          ? formatDateForInput(rice.purchaseDate)
          : getLocalDate(),

        dueDate: rice.dueDate ? formatDateForInput(rice.dueDate) : "",
        initialPaymentMethod: rice.purchaseType === "PAID" ? "CASH" : "",

        initialPaymentDate: rice.purchaseType === "PAID" ? getLocalDate() : "",

        initialPaymentNote: "",
        note: rice.note ?? "",
      });
    } else {
      reset({
        quantity: undefined,
        unitPrice: savedSupplier.unitPrice,
        purchaseType: "PAID",
        supplierName: savedSupplier.supplierName,
        supplierPhone: savedSupplier.supplierPhone,
        purchaseDate: getLocalDate(),
        dueDate: "",
        initialPaymentMethod: "CASH",
        initialPaymentDate: getLocalDate(),
        initialPaymentNote: "",
        note: "",
      });
    }
  }, [rice, reset]);

  const onSubmit = (data: RiceFormValues) => {
    saveRiceSupplier(
      String(data.supplierName),
      String(data.supplierPhone),
      Number(data.unitPrice),
    );
    if (isEdit) {
      updateMutation.mutate(
        {
          id: rice.id,
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
    <FormProvider {...methods}>
      <RecordFormModal
        isOpen={isOpen}
        onClose={onClose}
        title={isEdit ? "Update Rice Purchase" : "Add Rice Purchase"}
        isEdit={isEdit}
        isPending={isEdit ? updateMutation.isPending : createMutation.isPending}
        onSubmit={handleSubmit(onSubmit)}
        permission={
          isEdit ? PERMISSIONS.EXPENSE_UPDATE : PERMISSIONS.EXPENSE_CREATE
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {riceBasicFieldList.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              error={errors[field.name]?.message}
              {...register(field.name, {
                valueAsNumber: field.valueAsNumber,
              })}
            />
          ))}

          <Input
            label={riceFields.purchaseDate.label}
            type={riceFields.purchaseDate.type}
            disabled={
              rice?.paymentStatus === RicePaymentStatus.PARTIAL &&
              isLocked(String(rice.createdAt))
            }
            error={errors.purchaseDate?.message}
            {...register("purchaseDate")}
          />

          <Select
            label="Purchase Type"
            disabled={
              rice?.paymentStatus === RicePaymentStatus.PARTIAL || isEdit
            }
            options={[
              { label: "Paid", value: "PAID" },
              { label: "Credit", value: "CREDIT" },
            ]}
            value={purchaseType}
            onChange={(event) =>
              methods.setValue(
                "purchaseType",
                event.target.value as RiceFormValues["purchaseType"],
                { shouldValidate: true },
              )
            }
          />

          {purchaseType === "CREDIT" && (
            <Input
              label={riceFields.dueDate.label}
              type={riceFields.dueDate.type}
              error={errors.dueDate?.message}
              {...register("dueDate")}
            />
          )}

          {!isEdit && purchaseType === "PAID" && (
            <>
              <Select
                label="Payment Method"
                options={[
                  { label: "Cash", value: "CASH" },
                  { label: "bKash", value: "BKASH" },
                  { label: "Bank", value: "BANK" },
                  { label: "Other", value: "OTHER" },
                ]}
                placeholder="Select payment method"
                value={methods.watch("initialPaymentMethod")}
                error={errors.initialPaymentMethod?.message}
                onChange={(event) =>
                  methods.setValue(
                    "initialPaymentMethod",
                    event.target
                      .value as RiceFormValues["initialPaymentMethod"],
                    { shouldValidate: true },
                  )
                }
              />

              {riceInitialPaymentFieldList.map((field) => (
                <Input
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  error={errors[field.name]?.message}
                  {...register(field.name)}
                />
              ))}
            </>
          )}
        </div>

        <Input
          label={riceFields.note.label}
          placeholder={riceFields.note.placeholder}
          error={errors.note?.message}
          {...register("note")}
        />
      </RecordFormModal>
    </FormProvider>
  );
};
