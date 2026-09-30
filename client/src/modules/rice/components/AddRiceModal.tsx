import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";
import { Select } from "@/shared/components/ui/Select";

import { useCreateRice } from "../hooks/useCreateRice";
import { useUpdateRice } from "../hooks/useUpdateRice";

import { riceSchema, type RiceFormValues } from "../schemas/rice.schema";

import type { IRice } from "../types/rice.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rice?: IRice;
}

export const AddRiceModal = ({ isOpen, onClose, rice }: Props) => {
  const createMutation = useCreateRice();
  const updateMutation = useUpdateRice();

  const isEdit = !!rice;

  const methods = useForm<RiceFormValues>({
    resolver: zodResolver(riceSchema),
    defaultValues: {
      quantity: undefined,
      unitPrice: undefined,
      purchaseType: "PAID",
      supplierName: "",
      supplierPhone: "",
      purchaseDate: "",
      dueDate: "",
      initialPaymentMethod: "",
      initialPaymentDate: "",
      initialPaymentNote: "",
      note: "",
    },
  });

  const { handleSubmit, reset, register, watch } = methods;

  const purchaseType = watch("purchaseType");

  useEffect(() => {
    if (rice) {
      reset({
        quantity: Number(rice.quantity),
        unitPrice: Number(rice.unitPrice),
        purchaseType: rice.purchaseType,
        supplierName: rice.supplierName ?? "",
        supplierPhone: rice.supplierPhone ?? "",
        purchaseDate: rice.purchaseDate
          ? new Date(rice.purchaseDate).toISOString().split("T")[0]
          : "",
        dueDate: rice.dueDate
          ? new Date(rice.dueDate).toISOString().split("T")[0]
          : "",
        initialPaymentMethod: "",
        initialPaymentDate: "",
        initialPaymentNote: "",
        note: rice.note ?? "",
      });
    } else {
      reset({
        quantity: undefined,
        unitPrice: undefined,
        purchaseType: "PAID",
        supplierName: "",
        supplierPhone: "",
        purchaseDate: "",
        dueDate: "",
        initialPaymentMethod: "",
        initialPaymentDate: "",
        initialPaymentNote: "",
        note: "",
      });
    }
  }, [rice, reset]);

  const onSubmit = (data: RiceFormValues) => {
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
              {...register("quantity", { valueAsNumber: true })}
            />

            <Input
              label="Unit Price"
              type="number"
              placeholder="Enter unit price"
              {...register("unitPrice", { valueAsNumber: true })}
            />

            <Input
              label="Supplier Name"
              placeholder="Enter supplier name"
              {...register("supplierName")}
            />

            <Input
              label="Supplier Phone"
              placeholder="Enter supplier phone"
              {...register("supplierPhone")}
            />

            <Input
              label="Purchase Date"
              type="date"
              {...register("purchaseDate")}
            />

            <Select
              label="Purchase Type"
              options={[
                { label: "Paid", value: "PAID" },
                { label: "Credit", value: "CREDIT" },
              ]}
              placeholder="Select purchase type"
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
              <Input label="Due Date" type="date" {...register("dueDate")} />
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
                  {...register("initialPaymentDate")}
                />

                <Input
                  label="Payment Note"
                  placeholder="Enter payment note"
                  {...register("initialPaymentNote")}
                />
              </>
            )}
          </div>

          <Input label="Note" placeholder="Enter note" {...register("note")} />

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
