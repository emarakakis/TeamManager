import { Box, Button, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import AddCharModal from "./AddCharModal";

export default function CharsTable({ children }: { children: ReactNode }) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  return (
    <Box
      sx={{
        backgroundColor: "lightGray",
        borderRadius: "16px",
        width: "450px",
        maxWidth: "200",
        padding: 1,
      }}
    >
      <Box
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",

          m: 1,
        }}
      >
        <Typography>View, Add and Edit Characteristics</Typography>

        <Button
          variant="outlined"
          sx={{ borderColor: "gray", color: "gray" }}
          onClick={(e) => setAnchorElement(e.currentTarget)}
        >
          Add +
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",

          width: "400px",
          maxHeight: "110px",
          overflow: "auto",
          gap: 1,
          padding: 2,
          borderRadius: "8px",
          backgroundColor: "#ebebeb",
          mx: "auto",
        }}
      >
        {children}
      </Box>
      <AddCharModal
        anchorEl={anchorElement}
        setAnchorElement={setAnchorElement}
      />
    </Box>
  );
}
