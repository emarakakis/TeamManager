import { useQueryState } from "@/app/hooks/query-state-hook";
import getItemFunction, { ItemType } from "@/utils/getItemFunction";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  Box,
  DialogContent,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FormButton from "../FormButton/FormButton";
import duplicateItems from "@/serverFunctions/duplicateItems";
import { useFormButtonState } from "@/app/hooks/form-button-hook";

export default function DuplicateModal() {
  const [duplicateItem, setDuplicateItem] = useQueryState("duplicateItem");
  const [disabled, setDisabled] = useFormButtonState("duplicate");
  const { type, id } = duplicateItem;
  const client = useQueryClient();

  const { data, isLoading } = useQuery<ItemType>({
    queryKey: ["duplicate", type, id],
    queryFn: () => getItemFunction(type, id),
  });

  const { mutate } = useMutation({
    mutationKey: ["duplicate", type, id],
    mutationFn: async () => await duplicateItems(id, type),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [`${type}s`] });
      setDuplicateItem(null);
    },
  });

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const items = Object.entries(data ?? {}).filter(
    ([k, v]) =>
      k !== "id" && k !== "jobId" && k !== "fieldId" && k !== "assigned"
  );

  return (
    <Dialog
      open={!!type}
      onClose={() => {
        setDuplicateItem(null);
        setDisabled(false);
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        Duplicate Item
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <DialogContentText>Duplicate the following {type}?</DialogContentText>
        <Box>
          {items.map(([k, v]) => (
            <Typography key={k}>
              {k} = {v}
            </Typography>
          ))}
        </Box>
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <FormButton
            state="duplicate"
            sx={{ color: "green" }}
            onClick={() => {
              mutate();
              setDisabled(true);
            }}
          >
            Submit
          </FormButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
