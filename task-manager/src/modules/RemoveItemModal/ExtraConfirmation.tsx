import {
  Box,
  Checkbox,
  DialogContent,
  FormControlLabel,
  Grid,
} from "@mui/material";
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
    <Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", mb: 1 }}>
        <FormControlLabel
          sx={{ display: "flex", justifyContent: "flex-start", height: "50px" }}
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
          label="Delete Fields"
        />
        <Box>
          {deleteFields && (
            <Box
              sx={{
                display: "grid",
                justifyContent: "end",
                gridTemplateRows: `repeat(${fields.length}, 1fr)`,
                overflowY: "scroll",
                height: "50px",
                maxHeight: "50px",
              }}
            >
              {fields.map((value, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    sx={{ justifyContent: "start", height: "20px" }}
                    control={
                      <Checkbox
                        sx={{ height: "20px" }}
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
            </Box>
          )}
        </Box>
      </Box>
      <RemoveButtons />
    </Box>
  );
}
