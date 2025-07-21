import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Button,
  Grid,
} from "@mui/material";

import { useQueryState } from "@/app/hooks/query-state-hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ModalType from "./ModalType";
import TypeItem from "../../TypeItem/TypeItem";
import getEmployee from "@/serverFunctions/getEmployee";
import getFieldJob from "@/serverFunctions/getFieldJob";
import postEmployeeJob from "@/serverFunctions/postEmployeeJob";

export default function AssignEmployeeJob() {
  const [employeeJob, setEmployeeJob] = useQueryState("employeeJob");
  const { fieldId, jobId, employeeId } = { ...employeeJob };
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["employeeJob", fieldId, jobId, employeeId],
    queryFn: async () => {
      const employee = await getEmployee(employeeId);
      const fieldJob = await getFieldJob({ fieldId, jobId });

      return { employee, fieldJob };
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["employeeJob", employeeId],
    mutationFn: postEmployeeJob,
  });
  if (isLoading) {
    return <DialogTitle>Loading...</DialogTitle>;
  }
  return (
    <ModalType
      title="Employee Job"
      contentText="Are you sure you want to merge?"
    >
      <Typography>Employee</Typography>
      <TypeItem data={data?.employee!} index={0} type="employee" />
      <Typography>Field</Typography>
      <TypeItem data={data?.fieldJob!} index={0} type="field" />
      <Button
        sx={{ color: "green" }}
        onClick={() => mutate({ jobId, fieldId, employeeId })}
      >
        Yes
      </Button>
      <Button sx={{ color: "red" }} onClick={() => setEmployeeJob(null)}>
        No
      </Button>
    </ModalType>
  );
}
