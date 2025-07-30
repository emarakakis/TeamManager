import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import { useQueryState } from "@/app/hooks/query-state-hook";
import { ModalItem } from "./ItemModal";
import { FieldJobReturn } from "@/types/FieldJob";
import qs from "qs";
import { FieldJobIdConcat } from "@/serverFunctions/getChangeTableData";

export default function ChangeItem<T extends FieldJobIdConcat>({
  data,
}: {
  data: T;
}) {
  const [changeItem, setChangeItem] = useQueryState("changeItem");
  return (
    <MenuItem
      onClick={() => {
        const str = qs.stringify({
          changeItemId: data.id,
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
