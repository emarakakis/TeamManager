import { FieldJobReturn } from "@/types/FieldJob";
import { useFormContext } from "react-hook-form";
import { Grid, TextField, Typography } from "@mui/material";
import RadioSelect from "../FieldForm/RadioSelect";

export default function EditFieldJob({ data }: { data: FieldJobReturn }) {
  const { register, control } = useFormContext<FieldJobReturn>();

  return (
    <Grid>
      <Grid sx={{ mt: "1px" }}>
        <Typography
          sx={{ justifyContent: "center", display: "flex" }}
          variant="h2"
        >
          Edit Field Job
        </Typography>
      </Grid>
      <Grid container spacing={1} sx={{ my: "6px" }}>
        <Grid>
          <TextField
            label="Field Name"
            type="text"
            {...register("fieldName")}
          />
        </Grid>
        <Grid>
          <TextField label="Job Name" type="text" {...register("jobName")} />
        </Grid>
      </Grid>
      <Grid
        sx={{
          backgroundColor: "#e8e8e8",
          borderRadius: "16px",
          padding: "4px",
        }}
      >
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          Select Area
        </Typography>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <RadioSelect<FieldJobReturn>
            name="area"
            control={control}
            defaultValue={!!data.area ? data.area : undefined}
            row={true}
            radios={[
              {
                key: "development",
                value: "development",
                label: "Development",
              },
              { key: "creative", value: "creative", label: "Creative" },
              { key: "production", value: "production", label: "Production" },
            ]}
          />
        </Grid>
      </Grid>
      <Grid
        sx={{
          mt: "6px",
          backgroundColor: "#e8e8e8",
          borderRadius: "16px",
          padding: "4px",
        }}
      >
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          Select Field
        </Typography>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
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
    </Grid>
  );
}
