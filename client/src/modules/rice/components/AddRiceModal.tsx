import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";
import { Select } from "@/shared/components/ui/Select";

import { useCreateRice } from "../hooks/useCreateRice";
import { useUpdateRice } from "../hooks/useUpdateRice";

import {
  getSavedRiceSupplier,
  saveRiceSupplier,
} from "../utils/riceSupplierStorage";

import { riceSchema, type RiceFormValues } from "../schemas/rice.schema";

import {
  formatDateForInput,
  getLocalDate,
  isLocked,
} from "@/shared/utils/date.utils";
import { RicePaymentStatus, type IRice } from "../types/rice.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rice?: IRice;
}

export const AddRiceModal = ({ isOpen, onClose, rice }: Props) => {
  console.log(rice);
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Rice Purchase" : "Add Rice Purchase"}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Rice Quantity"
              type="number"
              placeholder="Enter rice quantity"
              error={errors.quantity?.message}
              {...register("quantity", { valueAsNumber: true })}
            />

            <Input
              label="Unit Price"
              type="number"
              placeholder="Enter unit price"
              error={errors.unitPrice?.message}
              {...register("unitPrice", { valueAsNumber: true })}
            />

            <Input
              label="Supplier Name"
              placeholder="Enter supplier name"
              error={errors.supplierName?.message}
              {...register("supplierName")}
            />

            <Input
              label="Supplier Phone"
              placeholder="Enter supplier phone"
              error={errors.supplierPhone?.message}
              {...register("supplierPhone")}
            />

            <Input
              label="Purchase Date"
              type="date"
              disabled={
                rice?.paymentStatus === RicePaymentStatus.PARTIAL ||
                isLocked(String(rice?.createdAt))
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
                  {
                    shouldValidate: true,
                  },
                )
              }
            />

            {purchaseType === "CREDIT" && (
              <Input
                label="Due Date"
                type="date"
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
                      event.target.value as any,
                      {
                        shouldValidate: true,
                      },
                    )
                  }
                />

                <Input
                  label="Payment Date"
                  type="date"
                  error={errors.initialPaymentDate?.message}
                  {...register("initialPaymentDate")}
                />

                <Input
                  label="Payment Note"
                  placeholder="Enter payment note"
                  error={errors.initialPaymentNote?.message}
                  {...register("initialPaymentNote")}
                />
              </>
            )}
          </div>

          <Input
            label="Note"
            placeholder="Enter note"
            error={errors.note?.message}
            {...register("note")}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="error" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="success"
              type="submit"
              loading={
                isEdit ? updateMutation.isPending : createMutation.isPending
              }
              loadingText={isEdit ? "Updating..." : "Saving..."}
            >
              {isEdit ? "Update Rice" : "Add Rice"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};
