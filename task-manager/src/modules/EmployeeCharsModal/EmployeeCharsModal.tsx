import { Dialog } from "@mui/material";
import ModalType from "../ActionModal/AssignItemModal/ModalType";
import { useQueryState } from "@/app/hooks/query-state-hook";
import { useQuery } from "@tanstack/react-query";
import { CharacteristicsReturn } from "@/types/Characteristics";
import getEmployeeChars from "@/serverFunctions/getEmployeeChars";

export default function EmployeeCharsModal() {
  const [employeeChar, setEmployeeChar] = useQueryState("employeeChar");
  const { id } = employeeChar;
  const open = !!id;

  const { data } = useQuery<CharacteristicsReturn[]>({
    queryKey: ["employee", "characteristics", id],
    queryFn: () => getEmployeeChars(id),
  });

  return (
    <Dialog open={open} onClose={() => setEmployeeChar(null)}>
      <ModalType title="Employee Characteristics" contentText="Mple">
        <h1>:D</h1>
      </ModalType>
    </Dialog>
  );
}
