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
import { useEffect } from "react";
import ModalType from "../ModalType/ModalType";

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

  useEffect(() => {
    setDisabled(false);
  }, [data]);

  const items = Object.entries(data ?? {}).filter(
    ([k, v]) =>
      k !== "id" && k !== "jobId" && k !== "fieldId" && k !== "assigned"
  );

  return (
    <ModalType
      value={type}
      setValue={setDuplicateItem}
      title="Duplicate Item"
      contentText={`Duplicate the following ${type}?`}
      slotProps={{
        paper: {
          sx: {
            minWidth: "400px",
          },
        },
      }}
    >
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            padding: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          Loading...
        </Box>
      )}
      {!isLoading && (
        <Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: `repeat(${items.length},1fr)`,
              backgroundColor: "#e8e8e8",
              padding: "10px",
              borderRadius: "16px",
              gap: 1,
            }}
          >
            {items.map(([k, v]) => (
              <Box
                key={k}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "16px",
                }}
              >
                <Typography sx={{ display: "flex", justifyContent: "start" }}>
                  {k}
                </Typography>
                <Typography>{v}</Typography>
              </Box>
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
        </Box>
      )}
    </ModalType>
  );
}
