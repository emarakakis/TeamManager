import { Checkbox, FormControlLabel } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddCharButton({ id }: { id: number }) {
  const { setValue, getValues } = useFormContext<{ values: number[] }>();

  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={(e) => {
            const checked = e.currentTarget.checked;

            const old = getValues("values") ?? [];
            let newValues;
            if (checked) {
              newValues = [...old, id];
            } else {
              newValues = [...old].filter((val) => val !== id);
            }

            setValue("values", newValues);
          }}
        />
      }
      label=""
    />
  );
}
