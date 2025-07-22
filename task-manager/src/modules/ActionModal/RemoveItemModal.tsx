import {
  Grid,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Button,
} from "@mui/material";

import deleteJob from "@/serverFunctions/deleteJob";
import deleteField from "@/serverFunctions/deleteField";
import deleteEmployee from "@/serverFunctions/deleteEmployee";
import { useMutation } from "@tanstack/react-query";

import { useQueryBatch } from "@/app/hooks/query-state-hook";

import { useQueryClient } from "@tanstack/react-query";
import deleteFieldJob from "@/serverFunctions/deleteFieldJob";
import deleteEmployeeJob from "@/serverFunctions/deleteEmployeeJob";

export function RemoveItemModal() {
  const [editDataBatch, setEditDataBatch] = useQueryBatch([
    "deleteItem",
    "dataType",
  ]);

  const { deleteItem, dataType } = { ...editDataBatch };
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
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <Button sx={{ color: "green" }} onClick={() => mutate(deleteItem)}>
            Yes
          </Button>
          <Button sx={{ color: "red" }} onClick={() => setEditDataBatch(null)}>
            No
          </Button>
        </DialogContent>
      </Grid>
    </Grid>
  );
}
