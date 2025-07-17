import { Grid, Typography, Button, ButtonProps, alpha } from "@mui/material";
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
    <Grid
      container
      direction="row"
      sx={{
        backgroundColor: "#ebebeb",
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        width: "25%",
      }}
    >
      <Grid container size={8} sx={{ justifyContent: "center" }}>
        <Typography sx={{ fontSize: "13px" }}>
          {condition} = {value}
        </Typography>
      </Grid>
      <Grid container size={4} sx={{ justifyContent: "center" }}>
        <Button onClick={onClick} sx={buttonSx}>
          <CloseIcon />
        </Button>
      </Grid>
    </Grid>
  );
}
