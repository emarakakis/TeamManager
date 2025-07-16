import { FieldData, FieldDataReturn } from "@/types/FieldData";
import { Grid, Typography } from "@mui/material";
import ItemModal from "../ItemModal/ItemModal";
export default function FieldItem({
  data,
  index,
}: {
  data: FieldDataReturn;
  index: number;
}) {
  const color = index % 2 === 1 ? "white" : "#1976d2";

  return (
    <Grid container sx={{ backgroundColor: color, justifyContent: "center" }}>
      <Grid size={4.5}>
        <Typography>{data.area}</Typography>
      </Grid>
      <Grid size={4.5}>
        <Typography>{data.name}</Typography>
      </Grid>
      <Grid size={3} container sx={{ justifyContent: "end", pr: 3.5 }}>
        <ItemModal id={data.id} type="field" />
      </Grid>
    </Grid>
  );
}
