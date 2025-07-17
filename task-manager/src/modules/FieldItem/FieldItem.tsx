import { FieldDataReturn } from "@/types/FieldData";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Grid, Typography, IconButton } from "@mui/material";
import ItemModal from "../ItemModal/ItemModal";
import { useQueryBatch } from "@/app/hooks/query-state-hook";
import qs from "qs";
export default function FieldItem({
  data,
  index,
}: {
  data: FieldDataReturn;
  index: number;
}) {
  const color = index % 2 === 1 ? "white" : "#1976d2";

  const [batch, setBatch] = useQueryBatch(["assignJob", "mergeFieldJob"]);
  const { assignJob, mergeFieldJob } = batch;
  const hasAssign = assignJob && Object.entries(assignJob).length > 0;
  const sameArea = assignJob && assignJob.area === data.area;

  function handleJobFieldPair() {
    const mergeFieldJobObject = { jobId: assignJob.id, fieldId: data.id };
    setBatch({ assignJob: null, mergeFieldJob: mergeFieldJobObject });
  }

  return (
    <Grid container sx={{ backgroundColor: color, justifyContent: "center" }}>
      <Grid size={4.5}>
        <Typography>{data.area}</Typography>
      </Grid>
      <Grid size={4.5}>
        <Typography>{data.name}</Typography>
      </Grid>
      <Grid size={3} container sx={{ justifyContent: "end", pr: 3.5 }}>
        {hasAssign && sameArea ? (
          <IconButton onClick={handleJobFieldPair}>
            <CheckCircleIcon
              sx={{
                color: "lightGreen",
                border: "1px solid black",
                borderRadius: "32px",
                backgroundColor: "white",
              }}
            />
          </IconButton>
        ) : (
          <></>
        )}
        {!hasAssign && <ItemModal data={data} type="field" />}
      </Grid>
    </Grid>
  );
}
