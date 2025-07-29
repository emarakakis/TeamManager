import { Button, DialogContent, Box } from "@mui/material";

import { useQueryBatch } from "@/app/hooks/query-state-hook";
import FormButton from "@/modules/FormButton/FormButton";

export default function RemoveButtons() {
  const [editDataBatch, setEditDataBatch] = useQueryBatch([
    "deleteItem",
    "dataType",
  ]);

  return (
    <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
      <FormButton state="deleteItem">Yes</FormButton>
      <Box sx={{ width: "200px", display: "flex", justifyContent: "center" }}>
        <Button sx={{ color: "red" }} onClick={() => setEditDataBatch(null)}>
          No
        </Button>
      </Box>
    </DialogContent>
  );
}
