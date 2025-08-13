import { useQueryState } from "@/app/hooks/query-state-hook";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteEmployeeChar from "@/serverFunctions/deleteEmployeeChar";

export default function DeleteCharButton({ id }: { id: number }) {
  const [employeeChar] = useQueryState("employeeChar");
  const { id: employeeId } = employeeChar;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteEmployeeChar"],
    mutationFn: deleteEmployeeChar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee", "characteristics", employeeId],
      });
    },
  });

  return (
    <IconButton
      sx={{ display: "flex", alignContent: "center" }}
      onClick={() => {
        mutate({ employeeId: employeeId, charId: id });
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
