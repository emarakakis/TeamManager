import { Dialog } from "@mui/material";
import { useQueryBatch } from "@/app/hooks/query-state-hook";

import { RemoveItemModal } from "./RemoveItemModal/RemoveItemModal";
import AssignItemModal from "./AssignItemModal/AssignItemModal";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
import { useEffect } from "react";

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
      width: 2000,
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
    "employeeJob",
    "dataType",
  ]);
  const { deleteItem, dataType, mergeFieldJob, employeeJob } = {
    ...editDataBatch,
  };

  function handleCloseDelete() {
    setEditDataBatch({ deleteItem: null, dataType: null });
  }

  function handleCloseMerge() {
    setEditDataBatch(null);
  }

  const open = (!!deleteItem && !!dataType) || !!mergeFieldJob || !!employeeJob;
  const [disabledDelete, setDisabledDelete] = useFormButtonState("deleteItem");
  const [disabledAssign, setDisabledAssign] = useFormButtonState("assignItem");
  useEffect(() => {
    if (!open) {
      setDisabledDelete(false);
      setDisabledAssign(false);
    }
  }, [open]);

  return (
    <Dialog
      scroll="paper"
      open={open}
      sx={{ width: 1 }}
      slotProps={!!deleteItem ? deletePaperProps : mergePaperProps}
      onClose={() => (deleteItem ? handleCloseDelete() : handleCloseMerge())}
    >
      {!!deleteItem && !!dataType && <RemoveItemModal />}
      {!deleteItem && <AssignItemModal />}
    </Dialog>
  );
}
