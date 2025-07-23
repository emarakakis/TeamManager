import { Checkbox, DialogContent, FormControlLabel, Grid } from "@mui/material";
import { useState } from "react";
import RemoveButtons from "./RemoveButtons";
import { useFormContext } from "react-hook-form";

export type EmployeeFields = {
  employee: boolean;
} & FieldJobFields;

type FieldJobFields = {
  job: boolean;
  field: boolean;
};

const employeeJobFields = ["employee", "job", "field", "fieldJob"];
const fieldJobFields = ["job", "field"];

export default function ExtraConfirmation({ type }: { type: string }) {
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [keepFields, setKeepFields] = useState<boolean>(false);
  const fields = type === "employeeJob" ? employeeJobFields : fieldJobFields;
  const { register } = useFormContext<EmployeeFields | FieldJobFields>();
  return (
    <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
      <Grid container direction="column" sx={{ justifyContent: "center" }}>
        <FormControlLabel
          sx={{ justifyContent: "center" }}
          control={
            <Checkbox
              value={confirmation}
              onChange={(event, checked) => setConfirmation(checked)}
            />
          }
          label="Are you sure?"
        />
        {confirmation && (
          <DialogContent>
            <FormControlLabel
              sx={{ justifyContent: "center" }}
              control={
                <Checkbox
                  value={keepFields}
                  onChange={(event, checked) => setKeepFields(checked)}
                />
              }
              label="Would you like to Delete Some Fields?"
            />
            {keepFields && (
              <Grid container>
                {fields.map((value, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      sx={{ justifyContent: "center" }}
                      control={
                        <Checkbox
                          value={keepFields}
                          {...register(value as keyof EmployeeFields)}
                        />
                      }
                      label={value}
                    />
                  );
                })}
              </Grid>
            )}
            <RemoveButtons />
          </DialogContent>
        )}
      </Grid>
    </DialogContent>
  );
}
