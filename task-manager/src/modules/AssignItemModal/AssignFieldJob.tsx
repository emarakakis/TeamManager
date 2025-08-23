import { Box, DialogTitle, Typography, Button, Checkbox } from "@mui/material";
import getField from "@/serverFunctions/getField";
import getJob from "@/serverFunctions/getJob";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useQueryState } from "@/app/hooks/query-state-hook";
import postFieldJob from "@/serverFunctions/postFieldJob";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
import FormButton from "@/modules/FormButton/FormButton";
import AssignItem from "./AssignItem";
import { useState } from "react";

export default function AssignFieldJob() {
  const [mergeFieldJob, setMergeFieldJob] = useQueryState("mergeFieldJob");
  const { fieldId, jobId } = mergeFieldJob;
  const [keepFields, setKeepFields] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [disabled, setDisabled] = useFormButtonState("assignItem");
  const { data, isLoading } = useQuery({
    queryKey: ["assign-item"],
    queryFn: async () => {
      const field = await getField(fieldId);
      const job = await getJob(jobId);
      return { field, job };
    },
    enabled: !!mergeFieldJob && Object.entries(mergeFieldJob).length > 0,
  });
  const { mutate } = useMutation({
    mutationKey: ["merge-field-job"],
    mutationFn: postFieldJob,
    onSuccess: () => {
      setMergeFieldJob(null);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["fieldJobs"] });
    },
  });
  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  const { field, job } = { ...data };
  return (
    <Box sx={{ display: "grid", justifyContent: "center" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <AssignItem data={field!} />
        <AssignItem data={job!} />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Typography>Would you like to keep the Job?</Typography>
        <Checkbox
          value={keepFields}
          onChange={(e) => setKeepFields(e.target.checked)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <FormButton
          sx={{ color: "green" }}
          state="assignItem"
          onClick={() => {
            mutate({ fieldJobId: { jobId, fieldId }, keepFields });
            setDisabled(true);
          }}
        >
          Yes
        </FormButton>
        <Button sx={{ color: "red" }} onClick={() => setMergeFieldJob(null)}>
          No
        </Button>
      </Box>
    </Box>
  );
}
