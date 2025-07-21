import { useState } from "react";
import { useQueryState } from "@/app/hooks/query-state-hook";
import { EmployeeReturn } from "@/types/employee";
import { JobReturn } from "@/types/Job";
import { FieldDataReturn } from "@/types/FieldData";
import OptionButton from "./OptionButton";
import AssignItem from "./AssignItem";
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
  const [assignItem, setAssignItem] = useQueryState("assignItem");
  console.log(assignItem);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;

  const hasAssign =
    (Object.entries(assignItem).length > 0 &&
      type === "employee" &&
      "fieldId" in assignItem) ||
    (type === "field" && "area" in assignItem);

  return !hasAssign ? (
    <OptionButton
      anchorEl={anchorEl}
      setAnchorEl={setAnchorEl}
      open={open}
      data={data}
      type={type}
    />
  ) : (
    <AssignItem
      type={type}
      data={
        type === "employee"
          ? { employeeId: (data as EmployeeReturn).id }
          : {
              fieldId: (data as FieldDataReturn).id,
              area: (data as FieldDataReturn).area,
            }
      }
    />
  );
}
