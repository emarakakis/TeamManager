import { Grid, TextField, Typography, Box, Button } from "@mui/material";
import RadioSelect from "../FieldForm/RadioSelect";
import { useFormContext } from "react-hook-form";
import { JobCreate } from "@/types/Job";
import FormButton from "../FormButton/FormButton";

export default function JobForm() {
  const { register, control } = useFormContext<JobCreate>();

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Grid sx={{ border: "1px solid", width: 0.5 }}>
        <Typography
          variant="h2"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Create Job
        </Typography>

        <Grid container sx={{ justifyContent: "center" }}>
          <TextField label="Job Name" {...register("name")} />
        </Grid>

        <Grid
          container
          direction="column"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography sx={{ justifyContent: "center" }}>
            Select Job Area
          </Typography>
          <RadioSelect
            control={control}
            name="profession"
            row={true}
            defaultValue=""
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
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography>Select Job Area</Typography>
          <RadioSelect
            control={control}
            name="area"
            row={true}
            defaultValue=""
            radios={[
              {
                key: "development",
                value: "development",
                label: "Development",
              },
              { key: "production", value: "production", label: "Production" },
              { key: "creative", value: "creative", label: "Creative" },
            ]}
          />
        </Grid>

        <Grid container sx={{ justifyContent: "center" }}>
          <FormButton state="job">Submit</FormButton>
        </Grid>
      </Grid>
    </Box>
  );
}
