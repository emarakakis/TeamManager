import { useQueryState } from "@/app/hooks/query-state-hook";
import { useQuery } from "@tanstack/react-query";

export default function AssignEmployeeJob() {
  const [employeeJob, setEmployeeJob] = useQueryState("employeeJob");

  return <h1>Employee</h1>;
}
