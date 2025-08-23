import { CharacteristicsReturn } from "@/types/Characteristics";
import { Box, Typography } from "@mui/material";

import DeleteCharButton from "./DeleteCharButton";
import AddCharButton from "./AddCharButton";

export default function CharRow({
  data,
  index,
  type,
}: {
  index: number;
  data: CharacteristicsReturn;
  type: "view" | "add";
}) {
  const { id, ...characteristic } = data;
  return (
    <Box
      sx={{
        width: "100%",
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

      {type === "view" && <DeleteCharButton id={id} />}
      {type === "add" && <AddCharButton id={id} />}
    </Box>
  );
}
