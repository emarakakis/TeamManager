import { Box, DialogTitle, Typography, Button } from "@mui/material";

import { useQueryState } from "@/app/hooks/query-state-hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ModalType from "./ModalType";
import TypeItem from "../../TypeItem/TypeItem";
import getEmployee from "@/serverFunctions/getEmployee";
import getFieldJob from "@/serverFunctions/getFieldJob";
import postEmployeeJob from "@/serverFunctions/postEmployeeJob";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
import FormButton from "@/modules/FormButton/FormButton";
import { EmployeeReturn } from "@/types/employee";
import { FieldJobReturn } from "@/types/FieldJob";
import AssignItem from "./AssignItem";

export default function AssignEmployeeJob() {
  const [employeeJob, setEmployeeJob] = useQueryState("employeeJob");
  const { fieldId, jobId, employeeId } = { ...employeeJob };
  const queryClient = useQueryClient();
  const [disabled, setDisabled] = useFormButtonState("assignItem");
  const { data, isLoading } = useQuery<{
    employee: EmployeeReturn;
    fieldJob: FieldJobReturn;
  }>({
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
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["fieldJobs"] });
      setEmployeeJob(null);
    },
  });
  if (isLoading) {
    return <DialogTitle>Loading...</DialogTitle>;
  }
  const allowedKeys = ["id", "assigned", "sex", "phoneNumber"];
  const { employee, fieldJob } = { ...data };
  return (
    <Box sx={{ display: "grid", justifyContent: "center" }}>
      <ModalType
        title="Employee Job Creation"
        contentText="Are you sure you want to merge?"
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <AssignItem data={employee!} />
          <AssignItem data={fieldJob!} />
        </Box>
      </ModalType>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <FormButton
          state="assignItem"
          sx={{ color: "green" }}
          onClick={() => {
            mutate({ jobId, fieldId, employeeId });
            setDisabled(true);
          }}
        >
          Yes
        </FormButton>
        <Button
          sx={{ color: "red", width: "200px" }}
          onClick={() => setEmployeeJob(null)}
        >
          No
        </Button>
      </Box>
    </Box>
  );
}
