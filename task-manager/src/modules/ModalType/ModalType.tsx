import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { ObjectType } from "@/app/hooks/query-state-hook";

type ModalTypeProps = Omit<DialogProps, "open"> & {
  title: string;
  contentText: string;
  children: React.ReactNode;
  setValue: (values: ObjectType | null) => void;
  value: ObjectType | null | string;
};

export default function ModalType({
  title,
  contentText,
  children,
  setValue,
  value,
  ...props
}: ModalTypeProps) {
  const open = !!value;
  return (
    <Dialog open={open} {...props}>
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <IconButton
          sx={{ display: "flex", justifyContent: "end" }}
          onClick={() => setValue(null)}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          {title}
        </DialogTitle>
        <DialogContentText sx={{ display: "flex", justifyContent: "center" }}>
          {contentText}
        </DialogContentText>
        <DialogContent>{children}</DialogContent>
      </DialogContent>
    </Dialog>
  );
}
