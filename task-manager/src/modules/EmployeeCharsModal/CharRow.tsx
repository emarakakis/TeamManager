import { CharacteristicsCreate } from "@/types/Characteristics";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CharRow({
  data,
  index,
}: {
  index: number;
  data: CharacteristicsCreate;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        gridTemplateColumns: "5fr 5fr 1fr",
        backgroundColor: index % 2 == 0 ? "darkgray" : "white",
        padding: 1,
        borderRadius: "4px",
      }}
    >
      <Typography>{data.category}</Typography>
      <Typography>{data.name}</Typography>
      <IconButton sx={{ display: "flex", alignContent: "center" }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
