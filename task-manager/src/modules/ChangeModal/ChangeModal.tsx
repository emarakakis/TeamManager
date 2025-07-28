import { useQueryBatch, useQueryState } from "@/app/hooks/query-state-hook";
import ChangeTable from "./ChangeTable";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import getChangeTableData from "@/serverFunctions/getChangeTableData";
import { EmployeeReturn } from "@/types/employee";
import { FieldDataReturn } from "@/types/FieldData";
import { JobReturn } from "@/types/Job";
import { FormProvider, useForm } from "react-hook-form";
import getItemFunction from "@/utils/getItemFunction";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import putEmployeeJob from "@/serverFunctions/putEmployeeJob";

export type ChangeType = EmployeeReturn | FieldDataReturn | JobReturn;
export type ChangeTypeArray = Array<ChangeType>;

export default function ChangeModal() {
  const [changeBatch, setChangeBatch] = useQueryBatch([
    "changeItem",
    "employeeJobId",
  ]);
  const { changeItem, employeeJobId } = { ...changeBatch };
  const { changeType, changeItemId } = { ...changeItem };
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<ChangeTypeArray>({
    queryKey: [`${changeType}s`, "with-item"],
    queryFn: async () => {
      const unAssignedItems = await getChangeTableData(changeType);

      if (changeType === "field") {
        return unAssignedItems;
      }
      const item = await getItemFunction(changeType, changeItemId);
      return item ? [...unAssignedItems, item] : unAssignedItems;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["change", changeType],
    mutationFn: putEmployeeJob,
    onSuccess: async () => {
      console.log("success");
      await queryClient.invalidateQueries({ queryKey: ["employeeJobs"] });
      setChangeBatch(null);
    },
  });

  const open = !!changeItem && Object.entries(changeItem).length > 0;

  const methods = useForm<{ id: number }>({
    defaultValues: { id: changeItemId },
  });

  useEffect(() => {
    methods.reset({ id: changeItemId });
  }, [open]);

  const orderedData = [
    ...(data ?? [])!.sort((a, b) => {
      if (a.id === Number(changeItemId)) return -1; // a πάει πάνω
      if (b.id === Number(changeItemId)) return 1; // b πάει πάνω
      return 0; // δεν αλλάζει η σειρά
    }),
  ];

  if (isLoading) return <Box>Loading...</Box>;

  return (
    <Dialog open={open} onClose={() => setChangeBatch(null)}>
      <DialogTitle>Change Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the value you want to change to.
        </DialogContentText>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data: { id: number }) => {
              mutate({
                employeeJobId: employeeJobId,
                type: changeType,
                itemId: data.id,
              });
            })}
          >
            <ChangeTable data={orderedData ?? []} defaultValue={changeItemId} />
            <Button type="submit">Submint</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
