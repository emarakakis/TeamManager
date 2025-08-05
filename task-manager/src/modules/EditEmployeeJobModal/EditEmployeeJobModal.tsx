import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { EmployeeJob, EmployeeJobReturn } from "@/types/EmployeeJob";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useQueryBatch, useQueryState } from "@/app/hooks/query-state-hook";
import qs from "qs";

export default function EditEmployeeJobModal({
  data,
}: {
  data: EmployeeJobReturn;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
  const [employeeJobBatch, setEmployeeJobBatch] = useQueryBatch([
    "deleteItem",
    "dataType",
  ]);
  const open = !!anchorEl;
  const { employee, job, field, id } = data;
  const employeeJobIds = {
    employeeId: employee.id,
    fieldId: field.id,
    jobId: job.id,
  };

  return (
    <>
      <IconButton
        sx={{ height: "100%", width: "100%", borderRadius: "16px" }}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <AssignmentIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuList>
          <MenuItem
            onClick={() => {
              setEmployeeJobBatch({
                deleteItem: qs.stringify(employeeJobIds),
                dataType: "employeeJob",
              });
            }}
          >
            <ListItemIcon>
              <DeleteIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText>Delete Employee Job</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <EditIcon sx={{ color: "lightblue" }} />
            </ListItemIcon>
            <ListItemText>Change Fields</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
