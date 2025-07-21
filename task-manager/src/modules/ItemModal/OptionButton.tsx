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
import { FieldJobReturn } from "@/types/FieldJob";

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
  const [assignItem, setAssignItem] = useQueryState("assignItem");

  function handleClick(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event?.currentTarget);
  }

  function handleEdit() {
    setEditDataBatch({
      editItem:
        "jobId" in data
          ? { fieldId: data.fieldId, jobId: data.jobId }
          : data.id,
      dataType: type,
    });
    setAnchorEl(null);
  }

  function handleAssign() {
    const d = type === "job" ? (data as JobReturn) : (data as FieldJobReturn);
    const item =
      "jobId" in d
        ? { jobId: d.jobId, fieldId: d.fieldId }
        : { id: d.id, area: d.area };

    setAssignItem(qs.stringify(item));
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
              setEditDataBatch({
                deleteItem:
                  "jobId" in data
                    ? { jobId: data.jobId, fieldId: data.fieldId }
                    : data.id,
                dataType: type,
              });
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <DeleteIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          {(type === "job" || type === "fieldJob") && (
            <MenuItem onClick={handleAssign}>
              <ListItemIcon>
                <AssignmentIcon sx={{ color: "green" }} />
              </ListItemIcon>
              <ListItemText>
                Assign to {type === "job" ? "Field" : "Employee"}
              </ListItemText>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
}
