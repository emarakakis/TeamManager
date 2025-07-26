import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

export default function ChangeTableItem({
  data,
  index,
  selected,
}: {
  data: Array<[string, any]>;
  index: number;
  selected: boolean;
}) {
  const items = data.filter(
    ([key, value]) => key !== "id" && key !== "assigned" && key !== "sex"
  );

  console.log(selected);

  const color = selected
    ? "lightGreen"
    : index % 2 === 0
    ? "#c4c4c4"
    : "#e0e0e0";
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${items.length + 1}, 1fr)`,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color,
        padding: "5px",
        borderRadius: "5px",
        my: "5px",
      }}
    >
      {items.map(([key, value]) => {
        return <Typography key={key}>{value}</Typography>;
      })}
      <FormControlLabel
        sx={{ display: "flex", justifyContent: "end" }}
        control={<Checkbox checked={selected} />}
        label=""
      />
    </Box>
  );
}
