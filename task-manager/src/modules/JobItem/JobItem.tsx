import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import ItemModal from "../ItemModal/ItemModal";
import { JobReturn } from "@/types/Job";

export default function JobItem({
  data,
  index,
}: {
  data: JobReturn;
  index: number;
}) {
  console.log(data);
  const color = index % 2 === 1 ? "white" : "#1976d2";
  return (
    <Grid container sx={{ backgroundColor: color }}>
      <Grid container size={3}>
        <Typography>{data.name}</Typography>
      </Grid>
      <Grid container size={3}>
        <Typography>{data.profession}</Typography>
      </Grid>
      <Grid container size={3}>
        <Typography>{data.area} </Typography>
      </Grid>
      <Grid size={3} container sx={{ justifyContent: "end", pr: 3.5 }}>
        <ItemModal id={data.id} type="job" />
      </Grid>
    </Grid>
  );
}
