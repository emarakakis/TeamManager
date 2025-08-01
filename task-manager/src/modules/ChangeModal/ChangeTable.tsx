import { ChangeType } from "./ChangeModal";
import { Box, TextField, Typography } from "@mui/material";
import ChangeTableItem from "./ChangeTableItem";
import { useFormContext } from "react-hook-form";
export default function ChangeTable({
  data,
  defaultValue,
  watchString,
}: {
  data: Array<ChangeType>;
  defaultValue: number;
  watchString: string;
}) {
  const { watch } = useFormContext<{ [watchString]: number }>();
  const changedValue = Number(defaultValue) !== watch(watchString);
  return (
    <Box>
      {data && data.length > 0 && (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {"email" in data[0] && "Employee"}
          {"area" in data[0] && !("profession" in data[0]) && "Field"}
          {"profession" in data[0] && "Job"}
        </Typography>
      )}
      <Box
        sx={{
          display: "grid",
          borderRadius: "5px",
          gridAutoRows: "60px",
          backgroundColor: "#f5f5f5",
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
          minHeight: "300px",
          maxHeight: "300px",
          width: "100%",
          padding: 1,
          gap: 3,
        }}
      >
        {data.map((item, index) => (
          <ChangeTableItem
            key={index}
            index={index}
            watchString={watchString}
            selected={
              item.id === Number(watch(watchString)) ||
              (!changedValue && item.id === Number(defaultValue))
            }
            data={Object.entries(item)}
          />
        ))}
      </Box>
    </Box>
  );
}
