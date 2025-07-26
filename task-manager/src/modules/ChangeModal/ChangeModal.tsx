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
import { EmployeeJob } from "@/types/EmployeeJob";
import { EmployeeReturn } from "@/types/employee";
import { FieldData, FieldDataReturn } from "@/types/FieldData";
import { JobReturn } from "@/types/Job";

export type ChangeType = Array<EmployeeReturn | FieldDataReturn | JobReturn>;

export default function ChangeModal() {
  const [changeItem, setChangeItem] = useQueryState("changeItem");
  const { changeType, changeItemId } = { ...changeItem };

  const { data, isLoading } = useQuery<ChangeType>({
    queryKey: [`${changeType}s`],
    queryFn: () => getChangeTableData(changeType),
  });

  const open = Object.entries(changeItem).length > 0;

  if (isLoading) return <Box>Loading...</Box>;

  return (
    <Dialog open={open} onClose={() => setChangeItem(null)}>
      <DialogTitle>Change Field</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the value you want to change to.
        </DialogContentText>
        <ChangeTable data={data ?? []} defaultValue={changeItemId} />
      </DialogContent>
    </Dialog>
  );
}
