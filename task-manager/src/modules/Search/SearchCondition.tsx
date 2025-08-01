import {
  Box,
  Grid,
  Typography,
  Button,
  ButtonProps,
  alpha,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SearchConditionProps {
  condition: string;
  value: string;
  onClick?: ButtonProps["onClick"];
}

const buttonSx = {
  color: "red",
  borderRadius: "32px",
  "&:hover": { backgroundColor: alpha("#eb4b4b", 0.25) },
};

export default function SearchCondition({
  condition,
  value,
  onClick,
}: SearchConditionProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#c9c9c9ff",
        borderRadius: "16px",
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "1fr 1fr",
        justifyContent: "center",
        whiteSpace: "nowrap",
      }}
    >
      <Typography
        sx={{ fontSize: "13px", display: "flex", justifyContent: "center" }}
      >
        {condition} = {value}
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
      >
        <IconButton
          onClick={onClick}
          sx={{
            ...buttonSx,
            fontSize: "13px",
            display: "flex",
            width: "50px",
            justifyContent: "center",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
