import { useQueryState } from "@/app/hooks/query-state-hook";
import { Dialog } from "@mui/material";

export default function ChangeModal() {
  const [changeItem, setChangeItem] = useQueryState("changeItem");

  console.log(changeItem);

  const open = Object.entries(changeItem).length > 0;
  const { changeType, changeItemId } = { ...changeItem };

  return <Dialog open={open} onClose={() => setChangeItem(null)}></Dialog>;
}
