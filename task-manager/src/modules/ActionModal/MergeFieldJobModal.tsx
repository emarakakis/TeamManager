import { useQueryState } from "@/app/hooks/query-state-hook";
import getField from "@/serverFunctions/getField";
import getJob from "@/serverFunctions/getJob";
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Grid } from "@mui/material";
import JobItem from "../JobItem/JobItem";
import FieldItem from "../FieldItem/FieldItem";
import postFieldJob from "@/serverFunctions/postFieldJob";
import { useQueryClient } from "@tanstack/react-query";

export default function MergeFieldJobModal() {
  const [mergeFieldJob, setMergeFieldJob] = useQueryState("mergeFieldJob");
  const { jobId, fieldId } = { ...mergeFieldJob };
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["merge-field-job", jobId, fieldId],
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
    },
  });

  if (isLoading) {
    return <DialogTitle>Loading...</DialogTitle>;
  }

  return (
    <Grid>
      <DialogContent>
        <DialogTitle>Merge Field Job</DialogTitle>
        <DialogContentText>
          Are you sure you want to merge theses 2?
        </DialogContentText>
        <DialogContent>
          <Typography>Job</Typography>
          <JobItem data={data?.job} index={0} />
          <Typography>Field</Typography>
          <FieldItem data={data?.field} index={0} />
        </DialogContent>
      </DialogContent>
      <Grid container sx={{ justifyContent: "center" }}>
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ color: "green" }}
            onClick={() => mutate({ jobId, fieldId })}
          >
            Yes
          </Button>
          <Button sx={{ color: "red" }} onClick={() => setMergeFieldJob(null)}>
            No
          </Button>
        </DialogContent>
      </Grid>
    </Grid>
  );
}
