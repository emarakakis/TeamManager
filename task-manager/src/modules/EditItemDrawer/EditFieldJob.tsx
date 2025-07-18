import { FieldJobReturn } from "@/types/FieldJob";
import { useFormContext } from "react-hook-form";
import { Grid, TextField, Typography } from "@mui/material";
import RadioSelect from "../FieldForm/RadioSelect";

export default function EditFieldJob({ data }: { data: FieldJobReturn }) {
  const { register, getValues, control } = useFormContext<FieldJobReturn>();

  return (
    <Grid>
      <Typography
        sx={{ justifyContent: "center", display: "flex" }}
        variant="h2"
      >
        Edit Field Job
      </Typography>
      <Grid>
        <TextField label="Field Name" type="text" {...register("fieldName")} />
      </Grid>
      <Grid>
        <TextField label="Job Name" type="text" {...register("jobName")} />
      </Grid>
      <Grid>
        <RadioSelect<FieldJobReturn>
          name="jobFieldArea"
          control={control}
          defaultValue={!!data.jobFieldArea ? data.jobFieldArea : undefined}
          row={true}
          radios={[
            { key: "development", value: "development", label: "Development" },
            { key: "creative", value: "creative", label: "Creative" },
            { key: "production", value: "production", label: "Production" },
          ]}
        />
      </Grid>
      <Grid>
        <RadioSelect
          control={control}
          name="profession"
          row={true}
          defaultValue={data.profession}
          radios={[
            { key: "intern", value: "intern", label: "Intern" },
            { key: "junior", value: "junior", label: "Junior" },
            {
              key: "intermediate",
              value: "intermediate",
              label: "Intermediate",
            },
            { key: "senior", value: "senior", label: "senior" },
          ]}
        />
      </Grid>
    </Grid>
  );
}
