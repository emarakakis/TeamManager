import { Box, DialogTitle, Typography, Button } from "@mui/material";
import TypeItem from "../../TypeItem/TypeItem";
import getField from "@/serverFunctions/getField";
import getJob from "@/serverFunctions/getJob";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useQueryState } from "@/app/hooks/query-state-hook";
import postFieldJob from "@/serverFunctions/postFieldJob";
import ModalType from "./ModalType";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
import FormButton from "@/modules/FormButton/FormButton";

export default function AssignFieldJob() {
  const [mergeFieldJob, setMergeFieldJob] = useQueryState("mergeFieldJob");
  const { fieldId, jobId } = mergeFieldJob;
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
  console.log("yeah!");
  if (isLoading) {
    return <DialogTitle>Loading...</DialogTitle>;
  }
  return (
    <ModalType title="Job" contentText="Are you sure you want to merge?">
      <Typography>Job</Typography>
      <TypeItem data={data?.job} index={0} type="job" />
      <Typography>Field</Typography>
      <TypeItem data={data?.field} index={0} type="field" />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FormButton
          sx={{ color: "green" }}
          state="assignItem"
          onClick={() => {
            mutate({ jobId, fieldId });
            setDisabled(true);
          }}
        >
          Yes
        </FormButton>
        <Button
          sx={{ color: "red", width: "200px" }}
          onClick={() => setMergeFieldJob(null)}
        >
          No
        </Button>
      </Box>
    </ModalType>
  );
}
