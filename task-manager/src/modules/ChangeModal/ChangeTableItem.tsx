import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

import { useFormContext } from "react-hook-form";
export default function ChangeTableItem({
  data,
  index,
  selected,
  watchString,
}: {
  data: Array<[string, any]>;
  index: number;
  watchString: string;
  selected: boolean;
}) {
  const items = data.filter(
    ([key, value]) => key !== "id" && key !== "assigned" && key !== "sex"
  );
  const { setValue, watch } = useFormContext<{ [watchString]: number }>();
  const itemId = data.filter(([key, value]) => key === "id")[0][1];
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
        height: "60px",
        maxWidth: "100%",
        alignItems: "center",
        backgroundColor: color,
        padding: "5px",
        borderRadius: "5px",
        my: "5px",
      }}
    >
      {items.map(([key, value]) => {
        return (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            fontSize={12}
            key={key}
          >
            {value}
          </Typography>
        );
      })}
      <FormControlLabel
        sx={{ display: "flex", justifyContent: "end" }}
        control={
          <Checkbox
            checked={selected}
            value={itemId}
            onChange={(e) =>
              setValue(watchString, Number(e.currentTarget.value))
            }
          />
        }
        label=""
      />
    </Box>
  );
}
