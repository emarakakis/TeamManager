import { useQueryBatch } from "@/app/hooks/query-state-hook";
import AssignFieldJob from "./AssignFieldJob";
import AssignEmployeeJob from "./AssignEmployeeJob";

export default function AssignItemModal() {
  const [assignItemBatch, setAssignItemBatch] = useQueryBatch([
    "mergeFieldJob",
    "employeeJob",
  ]);
  const { mergeFieldJob, employeeJob } = assignItemBatch;

  console.log(employeeJob);

  const isFieldJob = Object.entries(mergeFieldJob).length > 0;
  console.log(isFieldJob);
  return isFieldJob ? <AssignFieldJob /> : <AssignEmployeeJob />;
}
