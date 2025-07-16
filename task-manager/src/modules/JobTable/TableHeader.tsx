import { Grid, Typography } from "@mui/material";

export default function TableHeader() {
  return (
    <Grid container spacing={2} sx={{ background: "white" }}>
      <Grid size={3}>
        <Typography>Name</Typography>
      </Grid>
      <Grid size={3}>
        <Typography>Profession</Typography>
      </Grid>
      <Grid size={3}>
        <Typography>Area</Typography>
      </Grid>
      <Grid size={3} container sx={{ justifyContent: "end", pr: 3 }}>
        <Typography>Options</Typography>
      </Grid>
    </Grid>
  );
}
