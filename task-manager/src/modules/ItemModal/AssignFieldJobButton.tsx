import { useQueryBatch } from "@/app/hooks/query-state-hook";
import { IconButton, Box } from "@mui/material";

import { Dispatch, SetStateAction } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { green } from "@mui/material/colors";
export default function AssignFieldJobButton({
  area,
  id,
}: {
  area: string;
  id: number;
}) {
  const [batch, setBatchState] = useQueryBatch(["mergeFieldJob", "assignJob"]);

  const { assignJob, mergeFieldJob } = { ...batch };
  const sameArea = area === assignJob.area;
  return (
    <Box>
      {sameArea && (
        <IconButton sx={{ justifyContent: "center" }}>
          <AddTaskIcon
            onClick={() => {
              const mergeInfo = { fieldId: id, jobId: assignJob.id };
              setBatchState({ assignJob: null, mergeFieldJob: mergeInfo });
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
