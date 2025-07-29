import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Menu } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import { useQueryBatch, useQueryState } from "@/app/hooks/query-state-hook";
import qs from "qs";
import { EmployeeJobId } from "@/types/EmployeeJob";

export default function RowModal({
  type,
  id,
  ejId,
}: {
  type: string;
  id: string | number;
  ejId: number;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [changeItemBatch, setChangeItemBatch] = useQueryBatch([
    "changeItem",
    "employeeJobId",
  ]);
  const [editItemBatch, setEditItemBatch] = useQueryBatch([
    "editItem",
    "dataType",
  ]);
  const open = !!anchorEl;

  const { changeItem, employeeJobId } = { ...changeItemBatch };

  return (
    <Box>
      <IconButton
        sx={{ justifyContent: "center" }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuList>
          <MenuItem
            onClick={() => {
              setEditItemBatch({ editItem: id, dataType: type });
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              const itemStr = qs.stringify({
                changeType: type,
                changeItemId: id.toString(),
              });
              setChangeItemBatch({
                changeItem: {
                  changeType: type,
                  changeItemId: id.toString(),
                  employeeJobId: ejId,
                },
                employeeJobId: ejId,
              });
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <RedoRoundedIcon sx={{ color: "orange" }} />
            </ListItemIcon>
            <ListItemText>Change</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
