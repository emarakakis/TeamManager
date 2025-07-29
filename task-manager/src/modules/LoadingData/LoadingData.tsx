import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingData() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ mr: 3 }}>Loading Data...</Typography>
      <CircularProgress size={32} sx={{ color: "gray" }} />
    </Box>
  );
}
