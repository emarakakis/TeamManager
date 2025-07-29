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
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          {title}
        </DialogTitle>
        <DialogContentText sx={{ display: "flex", justifyContent: "center" }}>
          {contentText}
        </DialogContentText>
        <DialogContent>{children}</DialogContent>
      </DialogContent>
    </Grid>
  );
}
