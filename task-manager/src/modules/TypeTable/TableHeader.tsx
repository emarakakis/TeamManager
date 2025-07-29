import { Grid, Typography } from "@mui/material";

export default function TableHeader({
  columnNames,
}: {
  columnNames: string[];
}) {
  return (
    <Grid sx={{ display: "grid", gridTemplateColumns: "14fr 1fr", gap: "5px" }}>
      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columnNames.length},1fr)`,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "16px",
          width: "100%",
          minWidth: `${columnNames.length * 170}px`,
          background: "white",
        }}
      >
        {columnNames.map((name, index) => (
          <Grid key={index} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>{name}</Typography>
          </Grid>
        ))}
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Options</Typography>
      </Grid>
    </Grid>
  );
}
