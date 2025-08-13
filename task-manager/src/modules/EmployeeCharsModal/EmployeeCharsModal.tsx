import { Box, Dialog } from "@mui/material";
import ModalType from "../ActionModal/AssignItemModal/ModalType";
import { useQueryState } from "@/app/hooks/query-state-hook";
import { useQuery } from "@tanstack/react-query";
import { CharacteristicsReturn } from "@/types/Characteristics";
import getEmployeeChars from "@/serverFunctions/getEmployeeChars";
import CharsTable from "./CharsTable";
import CharRow from "./CharRow";

export default function EmployeeCharsModal() {
  const [employeeChar, setEmployeeChar] = useQueryState("employeeChar");
  const { id } = employeeChar;
  const open = !!id;

  const { data } = useQuery<CharacteristicsReturn[]>({
    queryKey: ["employee", "characteristics", id],
    queryFn: () => getEmployeeChars(id),
  });

  const paperProps = {
    width: "750px",
  };

  return (
    <Dialog
      open={open}
      onClose={() => setEmployeeChar(null)}
      slotProps={{
        paper: {
          sx: { paperProps },
        },
      }}
    >
      <ModalType
        title="Employee Characteristics"
        contentText="Characteristics of Employee"
      >
        <CharsTable>
          {data?.map((item, index) => (
            <Box sx={{ display: "flex", justifyContent: "center" }} key={index}>
              <CharRow data={item} index={index} />
            </Box>
          ))}
        </CharsTable>
      </ModalType>
    </Dialog>
  );
}
