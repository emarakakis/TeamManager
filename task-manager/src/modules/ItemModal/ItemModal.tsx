import {
  IconButton,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, MouseEvent } from "react";
import { useQueryBatch, useQueryState } from "@/app/hooks/query-state-hook";
import { useQueryClient } from "@tanstack/react-query";
import AssignmentIcon from "@mui/icons-material/Assignment";
import qs from "qs";
import { EmployeeReturn } from "@/types/employee";
import { JobReturn } from "@/types/Job";
import { FieldDataReturn } from "@/types/FieldData";

type ModalItem = EmployeeReturn | JobReturn | FieldDataReturn;

export default function ItemModal({
  data,
  type,
}: {
  data: ModalItem;
  type: string;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [editDataBatch, setEditDataBatch] = useQueryBatch([
    "editItem",
    "deleteItem",
    "dataType",
  ]);
  const [assignJob, setAssignJob] = useQueryState("assignJob");
  const queryClient = useQueryClient();

  const open = !!anchorEl;
  function handleClick(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event?.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleEdit() {
    setEditDataBatch({ editItem: data.id, dataType: type });
    setAnchorEl(null);
  }

  function handleDelete() {
    setEditDataBatch({ deleteItem: data.id, dataType: type });
    setAnchorEl(null);
  }

  function handleJobAssign() {
    const job = data as JobReturn;
    setAssignJob(qs.stringify({ id: job.id, area: job.area }));
  }

  return (
    <>
      <IconButton
        sx={{ justifyContent: "center" }}
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={open}
        id="basic-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuList>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          {type === "job" && (
            <MenuItem onClick={handleJobAssign}>
              <ListItemIcon>
                <AssignmentIcon sx={{ color: "green" }} />
              </ListItemIcon>
              <ListItemText>Assign to Field</ListItemText>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
}
