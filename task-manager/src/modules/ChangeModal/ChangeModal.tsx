import { useQueryBatch, useQueryState } from "@/app/hooks/query-state-hook";
import {
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import getChangeTableData, {
  FieldJobConcat,
} from "@/serverFunctions/getChangeTableData";
import { EmployeeReturn } from "@/types/employee";
import { FieldDataReturn } from "@/types/FieldData";
import { JobReturn } from "@/types/Job";
import { FormProvider, useForm } from "react-hook-form";
import getItemFunction from "@/utils/getItemFunction";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import putEmployeeJob from "@/serverFunctions/putEmployeeJob";
import FormButton from "../FormButton/FormButton";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
import ChangeField from "./ChangeField";
import changeFieldJob from "@/serverFunctions/changeFieldJob";

export type ChangeType = EmployeeReturn | FieldDataReturn | JobReturn;
export type ChangeTypeArray = Array<ChangeType> | FieldJobConcat;

export default function ChangeModal() {
  const [changeBatch, setChangeBatch] = useQueryBatch([
    "changeItem",
    "employeeJobId",
  ]);
  const [disabled, setDisabled] = useFormButtonState("change");
  console.log(disabled);
  const { changeItem, employeeJobId } = { ...changeBatch };
  const { changeType, changeItemId } = { ...changeItem };
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<ChangeTypeArray>({
    queryKey: [`${changeType}s`, "with-item"],
    queryFn: async (): Promise<ChangeTypeArray> => {
      const unAssignedItems = await getChangeTableData(changeType);

      if (changeType === "field") {
        return unAssignedItems;
      }
      if (changeType === "fieldJob") {
        const jobItem = (await getItemFunction(
          "job",
          changeItemId.jobId
        )) as JobReturn;
        const fieldItem = (await getItemFunction(
          "field",
          changeItemId.fieldId
        )) as FieldDataReturn;

        const { jobs: unAssignedJobs, fields: unAssignedFields } =
          unAssignedItems as FieldJobConcat;
        const jobs = jobItem ? [...unAssignedJobs, jobItem] : unAssignedJobs;
        const fields = fieldItem
          ? [...unAssignedFields, fieldItem]
          : unAssignedFields;
        return { jobs, fields };
      } else {
        const item = await getItemFunction(changeType, changeItemId);
        return item
          ? [...(unAssignedItems as ChangeType[]), item]
          : unAssignedItems;
      }
    },
  });
  const { mutate: mutateEmployeeJobFields } = useMutation({
    mutationKey: ["change", changeType],
    mutationFn: putEmployeeJob,
    onSuccess: async () => {
      console.log("success");
      await queryClient.invalidateQueries({ queryKey: ["employeeJobs"] });
      setChangeBatch(null);
    },
  });

  const { mutate: mutateFieldJobFields } = useMutation({
    mutationKey: ["change", changeType],
    mutationFn: changeFieldJob,
    onSuccess: async () => {
      console.log("success");
      await queryClient.invalidateQueries({ queryKey: ["fieldJobs"] });
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setChangeBatch(null);
    },
  });

  const open = !!changeItem && Object.entries(changeItem).length > 0;

  const methods = useForm<{ id: number } | { jobId: number; fieldId: number }>({
    defaultValues: { id: changeItemId },
  });

  useEffect(() => {
    if (changeType !== "fieldJob") methods.reset({ id: changeItemId });
    else
      methods.reset({
        jobId: changeItemId.jobId,
        fieldId: changeItemId.fieldId,
      });
    setDisabled(false);
  }, [open]);

  if (isLoading && open) return <Box>Loading...</Box>;

  return (
    <Dialog open={open} onClose={() => setChangeBatch(null)}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        Change Item
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ display: "flex", justifyContent: "center", mb: 2 }}
        >
          Select the value you want to change to
        </DialogContentText>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(
              (data: { id: number } | { jobId: number; fieldId: number }) => {
                if ("jobId" in data) {
                  mutateFieldJobFields({
                    newId: {
                      jobId: data.jobId,
                      fieldId: data.fieldId,
                    },
                    previousId: { ...changeItemId },
                  });
                  setDisabled(true);
                } else {
                  mutateEmployeeJobFields({
                    employeeJobId: employeeJobId,
                    type: changeType,
                    itemId: data.id,
                  });
                  setDisabled(true);
                }
              }
            )}
          >
            {changeType !== "fieldJob" && (
              <ChangeField
                watchString="id"
                data={data! as ChangeType[]}
                id={Number(changeItemId)}
              />
            )}
            {changeType === "fieldJob" && (
              <Grid
                sx={{
                  display: "grid",
                  gridTemplateColumns: "48% 48%",
                  gap: 3,

                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <ChangeField
                  watchString="jobId"
                  data={(data as FieldJobConcat).jobs}
                  id={Number(changeItemId.jobId)}
                />
                <ChangeField
                  watchString="fieldId"
                  data={(data as FieldJobConcat).fields}
                  id={Number(changeItemId.jobId)}
                />
              </Grid>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <FormButton state="change" sx={{ color: "green" }}>
                Submit
              </FormButton>
            </Box>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
