import { Dialog } from "@mui/material";
import ModalType from "../ActionModal/AssignItemModal/ModalType";
import { useQueryState } from "@/app/hooks/query-state-hook";

export default function EmployeeCharsModal() {
  const [employeeChar, setEmployeeChar] = useQueryState("employeeChar");
  const { id } = employeeChar;

  const open = !!id;
  return (
    <Dialog open={open}>
      <ModalType title="Employee Characteristics" contentText="Mple">
        <h1>:D</h1>
      </ModalType>
    </Dialog>
  );
}
