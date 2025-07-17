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

export function RemoveItemModal() {
  const [editDataBatch, setEditDataBatch] = useQueryBatch([
    "deleteItem",
    "dataType",
  ]);

  const { deleteItem, dataType } = { ...editDataBatch };
  const queryClient = useQueryClient();

  console.log(editDataBatch);

  function handleClick() {
    if (dataType === "employee") mutateEmployee(Number(deleteItem));
    else if (dataType === "field") mutateField(Number(deleteItem));
    else if (dataType === "job") mutateJob(Number(deleteItem));
  }

  let content =
    dataType === "employee"
      ? "Employee"
      : dataType === "Field"
      ? "Field"
      : "Job";

  function handleClose() {
    setEditDataBatch({ deleteItem: null, dataType: null });
  }

  const { mutate: mutateEmployee } = useMutation({
    mutationKey: ["delete", "employee"],
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setEditDataBatch({ deleteItem: null, dataType: null });
      handleClose();
    },
  });

  const { mutate: mutateField } = useMutation({
    mutationKey: ["delete", "field"],
    mutationFn: deleteField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fields"] });
      setEditDataBatch({ deleteItem: null, dataType: null });
      handleClose();
    },
  });

  const { mutate: mutateJob } = useMutation({
    mutationKey: ["delete", "job"],
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setEditDataBatch({ deleteItem: null, dataType: null });
      handleClose();
    },
  });

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
          <Button sx={{ color: "green" }} onClick={handleClick}>
            Yes
          </Button>
          <Button sx={{ color: "red" }} onClick={() => handleClose()}>
            No
          </Button>
        </DialogContent>
      </Grid>
    </Grid>
  );
}
