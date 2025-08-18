import { Box, Dialog } from "@mui/material";
import ModalType from "../ActionModal/AssignItemModal/ModalType";
import { useQueryState } from "@/app/hooks/query-state-hook";
import { useQuery } from "@tanstack/react-query";
import { CharacteristicsReturn } from "@/types/Characteristics";
import getEmployeeChars from "@/serverFunctions/getEmployeeChars";
import CharsTable from "./CharsTable";
import CharRow from "./CharRow";
import { EmployeeReturn } from "@/types/employee";
import getEmployee from "@/serverFunctions/getEmployee";

export default function EmployeeCharsModal() {
  const [employeeChar, setEmployeeChar] = useQueryState("employeeChar");
  const { id } = employeeChar;
  const open = !!id;

  const { data: characteristics } = useQuery<CharacteristicsReturn[]>({
    queryKey: ["employee", "characteristics", "view", id],
    queryFn: () => getEmployeeChars(id, "view"),
  });

  const { data: employeeInfo } = useQuery<EmployeeReturn>({
    queryKey: ["employee", id],
    queryFn: () => getEmployee(id),
  });

  const paperProps = {
    width: "750px",
  };

  const hasChars = characteristics && characteristics.length > 0;

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
        contentText={`Employee Characteristics of ${employeeInfo?.name} ${employeeInfo?.surname}`}
      >
        <CharsTable>
          {hasChars &&
            characteristics?.map((item, index) => (
              <Box
                sx={{ display: "flex", justifyContent: "center" }}
                key={index}
              >
                <CharRow data={item} index={index} type={"view"} />
              </Box>
            ))}
          {!hasChars && (
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              No Characteristics for this Employee.
            </Box>
          )}
        </CharsTable>
      </ModalType>
    </Dialog>
  );
}
