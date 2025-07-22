import { Dialog } from "@mui/material";
import { useQueryBatch } from "@/app/hooks/query-state-hook";

import { RemoveItemModal } from "./RemoveItemModal/RemoveItemModal";
import AssignFieldJob from "./AssignItemModal/AssignFieldJob";
import AssignEmployeeJob from "./AssignItemModal/AssignEmployeeJob";

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
        mergeFieldJob &&
        Object.entries(mergeFieldJob).length > 0 && <AssignFieldJob />}
      {!deleteItem && employeeJob && Object.entries(employeeJob).length > 0 && (
        <AssignEmployeeJob />
      )}
    </Dialog>
  );
}
