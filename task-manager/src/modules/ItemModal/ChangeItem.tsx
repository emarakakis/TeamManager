import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import { useQueryState } from "@/app/hooks/query-state-hook";
import qs from "qs";

export default function ChangeItem<
  T extends { jobId: number; fieldId: number }
>({ data }: { data: T }) {
  const [changeItem, setChangeItem] = useQueryState("changeItem");
  return (
    <MenuItem
      onClick={() => {
        const str = qs.stringify({
          changeItemId: data,
          changeType: "fieldJob",
        });
        setChangeItem(str);
      }}
    >
      <ListItemIcon>
        <RedoRoundedIcon sx={{ color: "orange" }} />
      </ListItemIcon>
      <ListItemText>Change Fields</ListItemText>
    </MenuItem>
  );
}
