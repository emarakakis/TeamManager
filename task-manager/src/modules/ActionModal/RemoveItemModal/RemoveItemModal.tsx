import { Grid, DialogTitle, DialogContentText } from "@mui/material";

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

type EmployeeFields = {
  employee: boolean;
  job: boolean;
  field: boolean;
  fieldJob: boolean;
};

type FieldJobFields = {
  job: boolean;
  field: boolean;
};

export function RemoveItemModal() {
  const [dataTypeObject, setDataType] = useQueryBatch(["dataType"]);
  const [editDataBatch, setEditDataBatch] = useQueryBatch([
    "deleteItem",
    "dataType",
  ]);
  const { deleteItem, dataType } = { ...editDataBatch };
  const needFurtherConfirmation =
    dataType === "fieldJob" || dataType === "employeeJob";

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
      setEditDataBatch(null);
    },
  });

  const methods = useForm<any>();
  const { handleSubmit } = methods;

  function onSubmit(fields?: {
    employee: boolean;
    field: boolean;
    job: boolean;
    fieldJob: boolean;
  }) {
    if (dataType === "employeeJob" || dataType === "fieldJob") {
      if (Object.entries(fields as Object).length == 0) {
        fields = { employee: false, field: false, job: false, fieldJob: false };
      }
      return mutate({ deleteItem: deleteItem, fields: fields });
    }
    return mutate(deleteItem);
  }

  let content =
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid container sx={{ justifyContent: "center" }}>
            <DialogTitle>Delete Item</DialogTitle>
          </Grid>
          <Grid container sx={{ justifyContent: "center" }}>
            <DialogContentText>
              Are you sure you want to delete the {!!content && content}?
            </DialogContentText>
          </Grid>
          <Grid container sx={{ justifyContent: "center" }}>
            {!needFurtherConfirmation && <RemoveButtons />}
            {needFurtherConfirmation && <ExtraConfirmation type={dataType} />}
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
