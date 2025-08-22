import { useQueryBatch } from "@/app/hooks/query-state-hook";
import { RemoveItemModal } from "./RemoveItemModal/RemoveItemModal";
import AssignItemModal from "./AssignItemModal/AssignItemModal";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
import { useEffect } from "react";
import ModalType from "../ModalType/ModalType";

const deletePaperProps = {
  paper: {
    sx: {
      width: 350,
      height: "250px",
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

  const open = (!!deleteItem && !!dataType) || !!mergeFieldJob || !!employeeJob;
  const [disabledDelete, setDisabledDelete] = useFormButtonState("deleteItem");
  const [disabledAssign, setDisabledAssign] = useFormButtonState("assignItem");
  useEffect(() => {
    if (!open) {
      setDisabledDelete(false);
      setDisabledAssign(false);
    }
  }, [open]);

  let content =
    dataType === "employee"
      ? "Employee"
      : dataType === "field"
      ? "Field"
      : dataType === "job"
      ? "Job"
      : dataType === "fieldJob"
      ? "FieldJob"
      : "EmployeeJob";

  const title = deleteItem
    ? "Delete Item?"
    : mergeFieldJob
    ? "Merge Field Job"
    : "Merge Employee Job";
  const contentText = deleteItem
    ? `Are you sure you want to delete ${content}?`
    : mergeFieldJob
    ? "Are you sure you want to create FieldJob?"
    : "Are yu sure you want to create an EmployeeJob?";
  const value = deleteItem
    ? deleteItem
    : mergeFieldJob
    ? mergeFieldJob
    : employeeJob;
  const setValue = setEditDataBatch;
  return (
    <ModalType
      title={title}
      contentText={contentText}
      setValue={setValue}
      value={value}
      sx={{ width: 1 }}
      slotProps={!!deleteItem ? deletePaperProps : mergePaperProps}
    >
      {!!deleteItem && !!dataType && <RemoveItemModal />}
      {!deleteItem && <AssignItemModal />}
    </ModalType>
  );
}
