import {
  IconButton,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState, Dispatch, SetStateAction, MouseEvent } from "react";
import { useQueryBatch, useQueryState } from "@/app/hooks/query-state-hook";
import { ModalItem } from "./ItemModal";
import { JobReturn } from "@/types/Job";
import qs from "qs";

export default function OptionButton<T extends ModalItem>({
  data,
  open,
  type,
  setAnchorEl,
  anchorEl,
}: {
  data: T;
  open: boolean;
  type: string;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  anchorEl: HTMLElement | null;
}) {
  const [editDataBatch, setEditDataBatch] = useQueryBatch([
    "editItem",
    "deleteItem",
    "dataType",
  ]);
  const [assignJob, setAssignJob] = useQueryState("assignJob");

  function handleClick(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event?.currentTarget);
  }

  function handleEdit() {
    setEditDataBatch({ editItem: data.id, dataType: type });
    setAnchorEl(null);
  }

  function handleJobAssign() {
    const job = data as JobReturn;
    setAssignJob(qs.stringify({ id: job.id, area: job.area }));
    setAnchorEl(null);
  }

  return (
    <Box>
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
        onClose={() => setAnchorEl(null)}
      >
        <MenuList>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setEditDataBatch({ deleteItem: data.id, dataType: type });
              setAnchorEl(null);
            }}
          >
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
    </Box>
  );
}
