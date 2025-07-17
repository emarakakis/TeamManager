import { useQueryState } from "@/app/hooks/query-state-hook";
import { Grid, Typography } from "@mui/material";

export default function TableHeader() {
  const [assignJob, setAssignJob] = useQueryState("assignJob");
  const hasAssign = Object.entries(assignJob).length > 0;
  return (
    <Grid container sx={{ backgroundColor: "white" }}>
      <Grid size={4.5}>
        <Typography>Area</Typography>
      </Grid>
      <Grid size={4.5}>
        <Typography>Name</Typography>
      </Grid>
      <Grid size={3} container sx={{ justifyContent: "end", pr: 2.5 }}>
        <Typography sx={{ fontSize: hasAssign ? "14px" : "15px" }}>
          {!hasAssign ? "Options" : "Assign Field"}
        </Typography>
      </Grid>
    </Grid>
  );
}
