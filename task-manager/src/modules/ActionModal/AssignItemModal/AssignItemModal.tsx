import { useQueryBatch } from "@/app/hooks/query-state-hook";
import AssignFieldJob from "./AssignFieldJob";
import AssignEmployeeJob from "./AssignEmployeeJob";

export default function AssignItemModal() {
  const [assignItemBatch, setAssignItemBatch] = useQueryBatch([
    "mergeFieldJob",
    "employeeJob",
  ]);
  console.log(assignItemBatch);
  const { mergeFieldJob, employeeJob } = assignItemBatch;

  const isFieldJob = mergeFieldJob && Object.entries(mergeFieldJob).length > 0;
  return isFieldJob ? <AssignFieldJob /> : <AssignEmployeeJob />;
}
