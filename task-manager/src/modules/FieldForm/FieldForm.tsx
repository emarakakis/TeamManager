import { useFormContext } from "react-hook-form";
import { Grid, Box, TextField, Button, Typography } from "@mui/material";
import RadioSelect from "./RadioSelect";
import { FieldDataCreate } from "@/types/FieldData";
import FormButton from "../FormButton/FormButton";

export default function FieldForm() {
  const { register, control } = useFormContext<FieldDataCreate>();

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
        <Typography variant="h2">Add Field</Typography>
      </Grid>
      <Grid
        container
        direction="column"
        sx={{
          justifyContent: "center",
          borderRadius: "16px",
          width: "100%",
          my: 1,
        }}
      >
        <Grid container sx={{ justifyContent: "center", my: 1 }}>
          <RadioSelect<FieldDataCreate>
            name="area"
            control={control}
            row={true}
            defaultValue="development"
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
        <Grid container sx={{ justifyContent: "center", my: 1 }}>
          <TextField label="Name of Field" type="text" {...register("name")} />
        </Grid>
        <Grid container sx={{ justifyContent: "center", my: 1 }}>
          <FormButton state={"field"}>Submit</FormButton>
        </Grid>
      </Grid>
    </Box>
  );
}
