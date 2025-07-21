import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";

export default function ModalType({
  title,
  contentText,
  children,
}: {
  title: string;
  contentText: string;
  children: React.ReactNode;
}) {
  return (
    <Grid>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogContentText>{contentText}</DialogContentText>
        <DialogContent>{children}</DialogContent>
      </DialogContent>
    </Grid>
  );
}
