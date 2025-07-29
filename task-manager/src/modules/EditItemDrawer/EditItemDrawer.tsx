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
import { FieldJobReturn } from "@/types/FieldJob";
import getFieldJob from "@/serverFunctions/getFieldJob";
import putFieldJob from "@/serverFunctions/putFieldJob";
import EditFieldJob from "./EditFieldJob";
import FormButton from "../FormButton/FormButton";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
import { boolean } from "drizzle-orm/gel-core";

type EditItemType =
  | EmployeeReturn
  | FieldDataReturn
  | JobReturn
  | FieldJobReturn;

export default function EditItemDrawer() {
  const queryClient = useQueryClient();
  const [editDataBatch, setEditDataBatch] = useQueryBatch([
    "editItem",
    "dataType",
  ]);
  const [disabled, setDisabled] = useFormButtonState("editItem");
  const { editItem, dataType } = { ...editDataBatch };
  const methods = useForm<EditItemType>();
  const { handleSubmit } = methods;

  const open = !!editItem && !!dataType;
  const { data, isLoading } = useQuery<EditItemType>({
    queryKey: [dataType, editItem],
    queryFn: () => {
      if (dataType === "employee")
        return getEmployee(editDataBatch.editItem ?? "");
      else if (dataType === "field")
        return getField(editDataBatch.editItem ?? "");
      else if (dataType === "job") return getJob(editDataBatch.editItem ?? "");
      else return getFieldJob(editDataBatch.editItem ?? "");
    },
    enabled: !!editItem,
  });

  useEffect(() => {
    if (data !== undefined) {
      if (dataType === "employee") methods.reset(data as EmployeeReturn);
      else if (dataType === "field") methods.reset(data as FieldDataReturn);
      else if (dataType === "fieldJob") methods.reset(data as FieldJobReturn);
      else methods.reset(data as JobReturn);
    }
  }, [data]);

  useEffect(() => {
    if (!open) {
      setDisabled(false); // reset όταν κλείσει το modal π.χ.
    }
  }, [open]);

  const { mutate } = useMutation({
    mutationKey: ["update", dataType],
    mutationFn: async (data: EditItemType) => {
      let fn: (data: any) => void;
      switch (dataType) {
        case "employee":
          fn = putEmployee;
          break;
        case "field":
          fn = putField;
          break;
        case "job":
          fn = putJob;
          break;
        case "fieldJob":
          fn = putFieldJob;
          break;
        default:
          throw new Error("This type isn't recognizable.");
      }
      return await fn(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${dataType}s`] });
      setEditDataBatch(null);
      setDisabled(true);
    },
  });

  return (
    <Drawer
      anchor="right"
      onClose={() => {
        setEditDataBatch(null);
        setDisabled(false);
      }}
      open={open}
      slotProps={slotProps}
    >
      {isLoading && <Box>Loading...</Box>}
      {!isLoading && (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data: EditItemType) => {
              mutate(data);
              setDisabled(true);
            })}
          >
            {dataType === "employee" && data && <EditEmployee />}
            {dataType === "field" && data && (
              <EditField data={data as FieldDataReturn} />
            )}
            {dataType === "job" && data && <EditJob data={data as JobReturn} />}
            {dataType === "fieldJob" && data && (
              <EditFieldJob data={data as FieldJobReturn} />
            )}

            <Grid
              container
              spacing={5}
              sx={{ mt: 2, justifyContent: "center" }}
            >
              <FormButton state="editItem">Submit</FormButton>
              <Button
                sx={{ color: "red" }}
                onClick={() => {
                  setEditDataBatch(null);
                }}
              >
                Cancel
              </Button>
            </Grid>
          </form>
        </FormProvider>
      )}
    </Drawer>
  );
}
