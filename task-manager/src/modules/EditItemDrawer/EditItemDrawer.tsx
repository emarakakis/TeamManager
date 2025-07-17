import { useQueryBatch } from "@/app/hooks/query-state-hook";
import { EmployeeReturn } from "@/types/employee";
import { Drawer, Box, Grid, Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import getEmployee from "@/serverFunctions/getEmployee";
import getField from "@/serverFunctions/getField";
import putJob from "@/serverFunctions/putJob";
import getJob from "@/serverFunctions/getJob";
import putEmployee from "@/serverFunctions/putEmployee";
import { useEffect } from "react";
import EditJob from "./EditJob";

import { slotProps } from "./styling";
import { FieldDataReturn } from "@/types/FieldData";
import EditEmployee from "./EditEmployee";
import EditField from "./EditField";
import putField from "@/serverFunctions/putField";
import { JobReturn } from "@/types/Job";

export default function EditItemDrawer() {
  const methods = useForm<
    EmployeeReturn | Exclude<FieldDataReturn, "success">
  >();
  const queryClient = useQueryClient();
  const [editDataBatch, setEditDataBatch] = useQueryBatch([
    "editItem",
    "dataType",
  ]);
  const { editItem, dataType } = { ...editDataBatch };
  console.log(editItem);

  const open = !!editItem && !!dataType;
  const { data, isLoading } = useQuery<
    EmployeeReturn | JobReturn | Exclude<FieldDataReturn, "success">
  >({
    queryKey: [dataType, editItem],
    queryFn: () => {
      if (dataType === "employee")
        return getEmployee(editDataBatch.editItem ?? "");
      else if (dataType === "field")
        return getField(editDataBatch.editItem ?? "");
      else dataType === "job";
      return getJob(editDataBatch.editItem ?? "");
    },
    enabled: !!editItem,
  });

  useEffect(() => {
    if (data !== undefined) methods.reset(data);
  }, [data]);

  const { mutate: mutateEmployee } = useMutation({
    mutationKey: ["employee", "update"],
    mutationFn: putEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      handleClose();
      setEditDataBatch({ editItem: null, dataType: null });
    },
  });

  const { mutate: mutateField } = useMutation({
    mutationKey: ["fields", "update"],
    mutationFn: putField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fields"] });
      handleClose();
      setEditDataBatch({ editItem: null, dataType: null });
    },
  });

  const { mutate: mutateJob } = useMutation({
    mutationKey: ["jobs", "update"],
    mutationFn: putJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      handleClose();
      setEditDataBatch({ editItem: null, dataType: null });
    },
  });

  function onSubmit(data: EmployeeReturn | FieldDataReturn | JobReturn) {
    if (dataType === "employee") mutateEmployee(data as EmployeeReturn);
    else if (dataType === "job") mutateJob(data as JobReturn);
    else if (dataType === "field") mutateField(data as FieldDataReturn);
  }

  function handleClose() {
    setEditDataBatch({ editItem: null, dataType: null });
  }

  return (
    <Drawer
      anchor="right"
      onClose={handleClose}
      open={open}
      slotProps={slotProps}
    >
      {isLoading && <Box>Loading...</Box>}
      {!isLoading && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {dataType === "employee" && data && <EditEmployee />}

            {dataType === "field" && data && (
              <EditField data={data as FieldDataReturn} />
            )}

            {dataType === "job" && data && <EditJob data={data as JobReturn} />}

            <Grid
              container
              spacing={5}
              sx={{ mt: 2, justifyContent: "center" }}
            >
              <Button type="submit">Submit</Button>
              <Button sx={{ color: "red" }} onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
          </form>
        </FormProvider>
      )}
    </Drawer>
  );
}
