"use client";

import { TextField, Grid, Typography, Box } from "@mui/material";

import SelectControl from "../SelectControl/SelectControl";
import { useFormContext } from "react-hook-form";
import { EmployeeCreate } from "@/types/employee";
import FormButton from "../FormButton/FormButton";

export default function EmployeeForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EmployeeCreate>();

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
      <Grid
        container
        sx={{ justifyContent: "center", marginTop: 2, marginBottom: 2 }}
        spacing={1}
      >
        <Typography variant="h2">Add Employee</Typography>
      </Grid>
      <Grid direction={"column"} spacing={2}>
        <Grid
          container
          sx={{ justifyContent: "center", marginTop: 2, marginBottom: 2 }}
          spacing={1}
        >
          <TextField label="Name" {...register("name")} />
          <TextField label="Surname" {...register("surname")} />
        </Grid>
        <Box
          sx={{
            display: "grid",
            justifyContent: "center",
            marginTop: 2,
            marginBottom: 2,
            gridTemplateColumns: "2fr 1fr",
            gap: 1,
          }}
        >
          <TextField label="Phone-Number" {...register("phoneNumber")} />
          <SelectControl<EmployeeCreate>
            control={control}
            options={[
              { key: "male", value: "Male" },
              { key: "female", value: "Female" },
              { key: "undefined", value: "Undefined" },
            ]}
            name="sex"
          />
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            marginTop: 2,
            marginBottom: 2,
            width: "100%",
          }}
        >
          <TextField
            label="Email"
            sx={{ width: "100%" }}
            {...register("email")}
          />
        </Box>
        <Grid
          container
          sx={{ justifyContent: "center", marginTop: 2, marginBottom: 2 }}
        >
          <FormButton state="employee">Submit</FormButton>
        </Grid>
      </Grid>
    </Box>
  );
}
