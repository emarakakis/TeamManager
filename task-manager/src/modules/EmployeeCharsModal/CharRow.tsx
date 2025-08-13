import { CharacteristicsReturn } from "@/types/Characteristics";
import { Box, Typography } from "@mui/material";

import DeleteCharButton from "./DeleteCharButton";

export default function CharRow({
  data,
  index,
}: {
  index: number;
  data: CharacteristicsReturn;
}) {
  const { id, ...characteristic } = data;
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
      <Typography>{characteristic.category}</Typography>
      <Typography>{characteristic.name}</Typography>
      <DeleteCharButton id={id} />
    </Box>
  );
}
