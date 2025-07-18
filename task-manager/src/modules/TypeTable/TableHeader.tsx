import { Grid, Typography } from "@mui/material";

export default function TableHeader({
  columnNames,
}: {
  columnNames: Array<string>;
}) {
  return (
    <Grid
      container
      spacing={columnNames.length}
      sx={{ width: "100%", background: "white" }}
    >
      {columnNames.map((name, index) => (
        <Grid
          key={index}
          size={12 / columnNames.length}
          sx={
            name.toLowerCase() === "options"
              ? { display: "flex", justifyContent: "end" }
              : {}
          }
        >
          <Typography>{name}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}
