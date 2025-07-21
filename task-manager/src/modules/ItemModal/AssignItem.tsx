import { useQueryBatch } from "@/app/hooks/query-state-hook";
import { IconButton, Box } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { FieldDataReturn } from "@/types/FieldData";

type AssignEmployeeJob = {
  employeeId: number;
};

type AssignFieldJob = {
  fieldId: number;
  area: string;
};

type AssignItemType = AssignEmployeeJob | AssignFieldJob;

export default function AssignItem<T extends AssignItemType>({
  data,
  type,
}: {
  data: T;
  type: string;
}) {
  const [batch, setBatchState] = useQueryBatch([
    "mergeFieldJob",
    "assignItem",
    "employeeJob",
  ]);

  const { assignItem, mergeFieldJob, employeeJob } = { ...batch };

  const sameArea =
    Object.entries(assignItem).length > 0 &&
    "area" in assignItem &&
    "area" in data &&
    data.area === assignItem.area;

  const isEmployee =
    Object.entries(assignItem).length > 0 && "fieldId" in assignItem;
  return (
    <Box>
      {((sameArea && type === "field") ||
        (isEmployee && type === "employee")) && (
        <IconButton sx={{ justifyContent: "center" }}>
          <AddTaskIcon
            onClick={() => {
              const item = {
                fieldId: assignItem.fieldId ?? (data as AssignFieldJob).fieldId,
                jobId: type === "field" ? assignItem.id : assignItem.jobId,
              };
              const assignedItem =
                type === "employee"
                  ? { employeeJob: item }
                  : { mergeFieldJob: item };

              setBatchState({ assignItem: null, ...assignedItem });
            }}
            sx={{
              color: "green",
              backgroundColor: "white",
              border: "2px solid green",
              borderRadius: "16px",
            }}
          />
        </IconButton>
      )}
    </Box>
  );
}
