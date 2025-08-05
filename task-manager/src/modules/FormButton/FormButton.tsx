import { useFormButtonState } from "@/app/hooks/form-button-hook";
import { Button, Box, ButtonProps } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { stat } from "fs";

type FormButtonProps = ButtonProps & {
  state: string;
};

export default function FormButton({
  children,
  state,
  ...props
}: FormButtonProps) {
  const type = !!props.onClick ? "button" : "submit";
  const [disabled, setDisabled] = useFormButtonState(state);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        type={type}
        sx={{ display: "flex" }}
        {...props}
        disabled={disabled}
      >
        {children}
        {disabled && (
          <CircularProgress size={16} sx={{ ml: 1, color: "gray" }} />
        )}
      </Button>
    </Box>
  );
}
