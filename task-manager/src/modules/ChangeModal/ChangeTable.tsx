import { ChangeTypeArray, ChangeType } from "./ChangeModal";
import { Box } from "@mui/material";
import ChangeTableItem from "./ChangeTableItem";
import { useFormContext } from "react-hook-form";
export default function ChangeTable({
  data,
  defaultValue,
}: {
  data: ChangeTypeArray;
  defaultValue: string;
}) {
  const { watch, getValues } = useFormContext<{ id: number }>();
  console.log(defaultValue, watch("id"));
  const changedValue = Number(defaultValue) !== watch("id");
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          borderRadius: "5px",
          backgroundColor: "#f5f5f5",
          overflow: "auto",
          maxHeight: "300px",
          padding: 1,
        }}
      >
        {data.map((item, index) => (
          <ChangeTableItem
            key={index}
            index={index}
            selected={
              item.id === Number(watch("id")) ||
              (!changedValue && item.id === Number(defaultValue))
            }
            data={Object.entries(item)}
          />
        ))}
      </Box>
    </Box>
  );
}
