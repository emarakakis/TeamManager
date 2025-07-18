import { useState, MouseEvent } from "react";
import { useQueryBatch, useQueryState } from "@/app/hooks/query-state-hook";
import { EmployeeReturn } from "@/types/employee";
import { JobReturn } from "@/types/Job";
import { FieldDataReturn } from "@/types/FieldData";
import OptionButton from "./OptionButton";
import AssignFieldJobButton from "./AssignFieldJobButton";
import { FieldJobReturn } from "@/types/FieldJob";

export type ModalItem =
  | EmployeeReturn
  | JobReturn
  | FieldDataReturn
  | FieldJobReturn;

export default function ItemModal<T extends ModalItem>({
  data,
  type,
}: {
  data: T;
  type: string;
}) {
  const [assignJob, setAssignJob] = useQueryState("assignJob");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const hasJobAssign = Object.entries(assignJob).length > 0 && type === "field";
  const open = !!anchorEl;

  return !hasJobAssign ? (
    <OptionButton
      anchorEl={anchorEl}
      setAnchorEl={setAnchorEl}
      open={open}
      data={data}
      type={type}
    />
  ) : (
    <AssignFieldJobButton
      area={(data as FieldDataReturn).area}
      id={(data as FieldDataReturn).id}
    />
  );
}
