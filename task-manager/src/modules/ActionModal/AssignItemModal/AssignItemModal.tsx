import { useQueryBatch } from "@/app/hooks/query-state-hook";
import AssignFieldJob from "./AssignFieldJob";
import AssignEmployeeJob from "./AssignEmployeeJob";

export default function AssignItemModal() {
  const [assignItemBatch, setAssignItemBatch] = useQueryBatch([
    "mergeFieldJob",
    "employeeJob",
  ]);
  const { mergeFieldJob } = assignItemBatch;
  const isFieldJob = mergeFieldJob && Object.entries(mergeFieldJob).length > 0;
  return isFieldJob ? <AssignFieldJob /> : <AssignEmployeeJob />;
}
