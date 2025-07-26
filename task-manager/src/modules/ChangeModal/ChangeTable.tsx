import { useState } from "react";
import { ChangeType } from "./ChangeModal";
import { Box } from "@mui/material";
import ChangeTableItem from "./ChangeTableItem";
import { useQueryState } from "@/app/hooks/query-state-hook";
export default function ChangeTable({
  data,
  defaultValue,
}: {
  data: ChangeType;
  defaultValue: string;
}) {
  const [changeItem, setChangeItem] = useQueryState("changeItem");
  const { changeType, changeItemId } = { ...changeItem };
  const orderedData = [
    ...data.sort((a, b) => {
      if (a.id === Number(changeItemId)) return -1; // a πάει πάνω
      if (b.id === Number(changeItemId)) return 1; // b πάει πάνω
      return 0; // δεν αλλάζει η σειρά
    }),
  ];
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
        {orderedData.map((item, index) => (
          <ChangeTableItem
            key={index}
            index={index}
            selected={defaultValue === item.id.toString()}
            data={Object.entries(item)}
          />
        ))}
      </Box>
    </Box>
  );
}
