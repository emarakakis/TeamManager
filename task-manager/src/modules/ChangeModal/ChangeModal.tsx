import { useQueryState } from "@/app/hooks/query-state-hook";
import ChangeTable from "./ChangeTable";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getChangeTableData from "@/serverFunctions/getChangeTableData";
import { EmployeeReturn } from "@/types/employee";
import { FieldDataReturn } from "@/types/FieldData";
import { JobReturn } from "@/types/Job";
import { FormProvider, useForm } from "react-hook-form";
import getMutationFunction from "@/utils/getMutationFunction";
import { EmployeeJob } from "@/types/EmployeeJob";
import { useEffect } from "react";

export type ChangeType = EmployeeReturn | FieldDataReturn | JobReturn;
export type ChangeTypeArray = Array<ChangeType>;

export default function ChangeModal() {
  const [changeItem, setChangeItem] = useQueryState("changeItem");
  const { changeType, changeItemId } = { ...changeItem };

  const { data, isLoading } = useQuery<ChangeTypeArray>({
    queryKey: [`${changeType}s`, "with-item"],
    queryFn: async () => {
      const unAssignedItems = await getChangeTableData(changeType);

      if (changeType === "field") {
        return unAssignedItems;
      }
      const item = await getMutationFunction(changeType, changeItemId);
      return item ? [...unAssignedItems, item] : unAssignedItems;
    },
  });

  const open = Object.entries(changeItem).length > 0;

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
    <Dialog open={open} onClose={() => setChangeItem(null)}>
      <DialogTitle>Change Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the value you want to change to.
        </DialogContentText>
        <FormProvider {...methods}>
          <ChangeTable data={orderedData ?? []} defaultValue={changeItemId} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
