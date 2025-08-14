import { Box, Popover, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function AddCharModal({
  anchorEl,
  setAnchorElement,
}: {
  anchorEl: HTMLElement | null;
  setAnchorElement: Dispatch<SetStateAction<HTMLElement | null>>;
}) {
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={() => setAnchorElement(null)}
      slotProps={{
        paper: { sx: { width: "400px", height: "300px", padding: 2 } },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            Add following Characteristics to Employee
          </Typography>
          <Box></Box>
        </Box>
      </Box>
    </Popover>
  );
}
