import { Grid, TextField, Typography, Box, Button } from "@mui/material";
import RadioSelect from "../FieldForm/RadioSelect";
import { useFormContext } from "react-hook-form";
import { JobCreate } from "@/types/Job";
import FormButton from "../FormButton/FormButton";

export default function JobForm() {
  const { register, control } = useFormContext<JobCreate>();

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        width: "0.3",
        display: "grid",
        justifyContent: "center",
        borderRadius: "16px",
        boxShadow: "1px 1px 16px #c9c9c9, -1px 1px 16px #c9c9c9",
      }}
    >
      <Grid>
        <Grid
          container
          sx={{ justifyContent: "center", marginTop: 2, marginBottom: 2 }}
          spacing={1}
        >
          <Typography
            variant="h2"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Create Job
          </Typography>
        </Grid>

        <Grid
          container
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            bgcolor: "#e8e8e8",
            borderRadius: "16px",
            my: 1,
            padding: 1,
          }}
        >
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            Select Job Area
          </Typography>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
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
        </Grid>

        <Grid
          direction="column"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "#e8e8e8",
            borderRadius: "16px",
            my: 1,
            padding: 1,
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Select Job Area
          </Typography>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
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
        </Grid>

        <Grid container sx={{ justifyContent: "center", my: 2 }}>
          <TextField
            label="Job Name"
            sx={{ width: "50%" }}
            {...register("name")}
          />
        </Grid>

        <Grid container sx={{ justifyContent: "center", my: 2 }}>
          <FormButton state="job">Submit</FormButton>
        </Grid>
      </Grid>
    </Box>
  );
}
