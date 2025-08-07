import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import { useQueryState } from "@/app/hooks/query-state-hook";
import qs from "qs";
import { Dispatch, SetStateAction } from "react";

export default function ChangeItem<
  T extends { jobId: number; fieldId: number }
>({
  data,
  setAnchorEl,
}: {
  data: T;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
}) {
  const [changeItem, setChangeItem] = useQueryState("changeItem");
  return (
    <MenuItem
      onClick={() => {
        setChangeItem({
          changeItemId: data,
          changeType: "fieldJob",
        });
        setAnchorEl(null);
      }}
    >
      <ListItemIcon>
        <RedoRoundedIcon sx={{ color: "orange" }} />
      </ListItemIcon>
      <ListItemText>Change Fields</ListItemText>
    </MenuItem>
  );
}
