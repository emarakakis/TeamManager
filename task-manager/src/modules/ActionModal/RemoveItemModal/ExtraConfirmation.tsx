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

const employeeJobFields = ["employee", "fieldJob"];
const fieldJobFields = ["job", "field"];

export default function ExtraConfirmation({ type }: { type: string }) {
  const [deleteFields, setDeleteFields] = useState<boolean>(false);

  const { register, setValue, watch, reset } = useFormContext<
    EmployeeFields | FieldJobFields | { fieldJob: boolean }
  >();
  let fields = type === "employeeJob" ? employeeJobFields : fieldJobFields;
  if (watch("fieldJob")) fields = [...fields, ...fieldJobFields];

  return (
    <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
      <Grid container direction="column" sx={{ justifyContent: "center" }}>
        <DialogContent>
          <FormControlLabel
            sx={{ justifyContent: "center" }}
            control={
              <Checkbox
                value={deleteFields}
                onChange={(event, checked) => {
                  setDeleteFields(checked);
                  reset({ fieldJob: false, employee: false });
                }}
              />
            }
            label="Would you like to Delete Some Fields?"
          />
          {deleteFields && (
            <Grid container>
              {fields.map((value, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    sx={{ justifyContent: "center" }}
                    control={
                      <Checkbox
                        {...register(value as keyof EmployeeFields)}
                        onChange={(e) => {
                          register(value as keyof EmployeeFields).onChange(e);
                          if (value === "fieldJob") {
                            setValue("job", false);
                            setValue("field", false);
                          }
                        }}
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
      </Grid>
    </DialogContent>
  );
}
