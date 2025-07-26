import { Button, DialogContent } from "@mui/material";

import { useQueryBatch } from "@/app/hooks/query-state-hook";

export default function RemoveButtons() {
  const [editDataBatch, setEditDataBatch] = useQueryBatch([
    "deleteItem",
    "dataType",
  ]);

  return (
    <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
      <Button type="submit" sx={{ color: "green" }}>
        Yes
      </Button>
      <Button sx={{ color: "red" }} onClick={() => setEditDataBatch(null)}>
        No
      </Button>
    </DialogContent>
  );
}
