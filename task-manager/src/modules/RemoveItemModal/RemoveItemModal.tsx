import { Grid, DialogTitle, DialogContentText, Box } from "@mui/material";

import ExtraConfirmation from "./ExtraConfirmation";
import { useQueryBatch } from "@/app/hooks/query-state-hook";
import RemoveButtons from "./RemoveButtons";
import { useQueryClient } from "@tanstack/react-query";
import deleteFieldJob from "@/serverFunctions/deleteFieldJob";
import deleteEmployeeJob from "@/serverFunctions/deleteEmployeeJob";
import deleteJob from "@/serverFunctions/deleteJob";
import deleteField from "@/serverFunctions/deleteField";
import deleteEmployee from "@/serverFunctions/deleteEmployee";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
import { DeleteFields } from "./types";
import ModalType from "../ModalType/ModalType";
import { useEffect } from "react";

const slotProps = {
  paper: {
    sx: {
      padding: 3,
      borderRadius: 3,
    },
  },
};

export function RemoveItemModal() {
  const [editDataBatch, setEditDataBatch] = useQueryBatch([
    "deleteItem",
    "dataType",
  ]);
  const { deleteItem, dataType } = { ...editDataBatch };
  const needFurtherConfirmation =
    dataType === "fieldJob" || dataType === "employeeJob";
  const [disabled, setDisabled] = useFormButtonState("deleteItem");
  const open = !!dataType && !!deleteItem;
  useEffect(() => {
    if (!open) {
      setDisabled(false);
    }
  }, [open]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["delete", dataType],
    mutationFn: async (data: any) => {
      let fn: (data: any) => void;
      switch (dataType) {
        case "employee":
          fn = deleteEmployee;
          break;
        case "field":
          fn = deleteField;
          break;
        case "job":
          fn = deleteJob;
          break;
        case "fieldJob":
          fn = deleteFieldJob;
          break;
        case "employeeJob":
          fn = deleteEmployeeJob;
          break;
        default:
          throw new Error("Unknown data Type");
      }
      return await fn(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${dataType}s`] });
      queryClient.invalidateQueries({ queryKey: [`fields`] });
      queryClient.invalidateQueries({ queryKey: [`jobs`] });
      setEditDataBatch(null);
    },
  });

  const methods = useForm<any>();
  const { handleSubmit } = methods;

  function onSubmit(fields?: DeleteFields) {
    if (dataType === "employeeJob") {
      if (Object.entries(fields as Object).length == 0) {
        fields = { employee: false, field: false, job: false, fieldJob: false };
      }
      mutate({ deleteItem: deleteItem, fields: fields });
      setDisabled(true);
      return;
    } else if (dataType === "fieldJob") {
      if (Object.entries(fields as Object).length == 0) {
        fields = { field: false, job: false };
      }
      mutate({ id: deleteItem, fields: fields });
      setDisabled(true);
      return;
    }
    mutate(deleteItem);
    setDisabled(true);
  }

  let type =
    dataType === "employee"
      ? "Employee"
      : dataType === "field"
      ? "Field"
      : dataType === "job"
      ? "Job"
      : dataType === "fieldJob"
      ? "FieldJob"
      : "EmployeeJob";

  return (
    <ModalType
      title={"Delete Item"}
      contentText={`Are you sure you want to delete ${type}?`}
      setValue={setEditDataBatch}
      value={deleteItem}
      slotProps={slotProps}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!needFurtherConfirmation && <RemoveButtons />}
          {needFurtherConfirmation && <ExtraConfirmation type={dataType} />}
        </form>
      </FormProvider>
    </ModalType>
  );
}
