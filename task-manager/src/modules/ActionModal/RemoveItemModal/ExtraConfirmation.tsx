import { Checkbox, DialogContent, FormControlLabel, Grid } from "@mui/material";
import { useState } from "react";
import RemoveButtons from "./RemoveButtons";
import { useFormContext } from "react-hook-form";
import { EmployeeJobDeleteFields } from "@/types/EmployeeJob";
import { FieldJobDeleteFields } from "@/types/FieldJob";
import { DeleteFields } from "./types";

const employeeJobFields: Array<keyof EmployeeJobDeleteFields | "fieldJob"> = [
  "employee",
  "fieldJob",
];
const fieldJobFields: Array<keyof FieldJobDeleteFields> = ["job", "field"];

export default function ExtraConfirmation({ type }: { type: string }) {
  const [deleteFields, setDeleteFields] = useState<boolean>(false);

  const { register, setValue, watch, reset } = useFormContext<DeleteFields>();
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
                  if (type === "employeeJob")
                    reset({ fieldJob: false, employee: false });
                  if (type === "fieldJob") reset({ field: false, job: false });
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
                        {...register(value)}
                        onChange={(e) => {
                          register(value).onChange(e);
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
