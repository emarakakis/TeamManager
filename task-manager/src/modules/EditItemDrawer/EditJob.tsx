import { JobReturn } from "@/types/Job";
import { Grid, Typography, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import RadioSelect from "../FieldForm/RadioSelect";

export default function EditJob({ data }: { data: JobReturn }) {
  const { register, control } = useFormContext<JobReturn>();
  return (
    <Grid>
      <Typography
        variant="h2"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Edit Job
      </Typography>
      <Grid
        container
        direction="column"
        sx={{
          justifyContent: "center",
          backgroundColor: "#e8e8e8",
          borderRadius: "16px",
          padding: "4px",
        }}
      >
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          Profession
        </Typography>
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
      <Grid
        container
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#e8e8e8",
          borderRadius: "16px",
          my: "4px",
          padding: "4px",
        }}
      >
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          Area
        </Typography>
        <RadioSelect<JobReturn>
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
      <Grid container sx={{ justifyContent: "center", mt: "8px" }}>
        <TextField label="Job Name" {...register("name")} />
      </Grid>
    </Grid>
  );
}
