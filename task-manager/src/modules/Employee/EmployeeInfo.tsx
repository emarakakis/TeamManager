"use client"

import { Box, TextField, Select, Grid, Container, MenuItem, SelectChangeEvent } from "@mui/material";

import { useFormContext } from "react-hook-form";
import { Employee } from "@/types/employee";
import { useState } from "react";

export default function CreateInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [sex, setSex] = useState<Employee['sex']>(undefined)

  function handleChange(event: SelectChangeEvent<string>){
    const s = event.target.value

    if (!s || typeof s !== 'string' || s === undefined){
      return
    }
    
    setSex(() => {
      if (s === "Male"){
        return "male"
      } else {
        return "female"
      }
    })

  }

  return (
      <Container sx={{border:'2px solid gray', borderRadius:"15px", width:0.25, padding:5, justifyContent:"center"}}>
        <Grid direction={"column"} spacing={2}>
            <Grid container sx={{justifyContent:"center", margin:1}} spacing={1}>
                <TextField label="Name" {...register("name")} />
                <TextField label="Surname" {...register("surname")} />
            </Grid>
            <Grid container sx={{justifyContent:"center", margin:1}} spacing={1}>
                <TextField label="Phone-Number" {...register("phoneNumber")} />
                {/* <Select 
                  multiple
                  name="sex"
                  label="Sex"
                  value={["Male", "Female"]}
                  onChange={handleChange}
                  >
                     { sexes.map((sex) => (
                      <MenuItem key={sex} value={sex}>{sex}</MenuItem>
                    ))}
                  </Select> */}
            </Grid>
            <Grid container sx={{justifyContent:"center", margin:1}} spacing={1}>
                <TextField label="City" {...register("city")} />
                <TextField label="email" {...register("email")}/>
            </Grid>
        </Grid>
      </Container>
    
  );
}
