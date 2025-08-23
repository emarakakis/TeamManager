import { useQueryBatch } from "@/app/hooks/query-state-hook";
import AssignFieldJob from "./AssignFieldJob";
import AssignEmployeeJob from "./AssignEmployeeJob";
import ModalType from "../ModalType/ModalType";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
import { useEffect } from "react";

const slotProps = {
  paper: {
    sx: {
      padding: 3,
      borderRadius: 3,
    },
  },
};

export default function AssignItemModal() {
  const [assignItemBatch, setAssignItemBatch] = useQueryBatch([
    "mergeFieldJob",
    "employeeJob",
  ]);
  const { mergeFieldJob, employeeJob } = assignItemBatch;
  const isFieldJob = mergeFieldJob && Object.entries(mergeFieldJob).length > 0;

  const open =
    (mergeFieldJob && Object.entries(mergeFieldJob).length > 0) ||
    (employeeJob && Object.entries(employeeJob).length > 0);
  const [_, setDisabled] = useFormButtonState("assignItem");

  useEffect(() => {
    if (!open) {
      setDisabled(false);
    }
  }, [open]);
  return (
    <ModalType
      title={"Merge Fields"}
      contentText={"Are you sure you want to merge fields?"}
      setValue={setAssignItemBatch}
      value={isFieldJob ? mergeFieldJob : employeeJob}
      slotProps={slotProps}
    >
      {isFieldJob ? <AssignFieldJob /> : <AssignEmployeeJob />}
    </ModalType>
  );
}
