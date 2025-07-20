import { Dialog } from "@mui/material";
import { useQueryBatch } from "@/app/hooks/query-state-hook";

import { RemoveItemModal } from "./RemoveItemModal";
import MergeFieldJobModal from "./MergeFieldJobModal";

const deletePaperProps = {
  paper: {
    sx: {
      width: 350,
      height: 150,
      padding: 3,
      borderRadius: 3,
    },
  },
};

const mergePaperProps = {
  paper: {
    sx: {
      width: 500,
      height: 450,
      padding: 3,
      borderRadius: 3,
    },
  },
};

export default function ActionModal() {
  const [editDataBatch, setEditDataBatch] = useQueryBatch([
    "deleteItem",
    "mergeFieldJob",
    "dataType",
  ]);
  const { deleteItem, dataType, mergeFieldJob } = { ...editDataBatch };

  function handleCloseDelete() {
    console.log("Deleted Item");
    setEditDataBatch({ deleteItem: null, dataType: null });
  }

  function handleCloseMerge() {
    console.log("Deleted merge");
    setEditDataBatch(null);
  }

  const open = (!!deleteItem && !!dataType) || !!mergeFieldJob;

  return (
    <Dialog
      scroll="paper"
      open={open}
      sx={{ width: 1 }}
      slotProps={!!deleteItem ? deletePaperProps : mergePaperProps}
      onClose={() => (deleteItem ? handleCloseDelete() : handleCloseMerge())}
    >
      {!!deleteItem && !!dataType && <RemoveItemModal />}
      {!deleteItem &&
        !!mergeFieldJob &&
        Object.entries(mergeFieldJob).length > 0 && <MergeFieldJobModal />}
    </Dialog>
  );
}
