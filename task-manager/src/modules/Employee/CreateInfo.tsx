"use client"

import { Box, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";


export default function CreateInfo(){
    const methods = useFormContext()

    return (
        <>
            <Typography variant='h1'>Input your name</Typography>
            <TextField {...methods.register('name')}></TextField>
        </>
    )

}