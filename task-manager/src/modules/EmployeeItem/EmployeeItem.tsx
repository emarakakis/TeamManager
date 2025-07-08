import { Employee } from "@/types/employee"
import { Box, Grid, Typography } from "@mui/material"

export default function EmployeeItem({data, colorIndex}: {data: Employee, colorIndex:number}){
    const {name, surname, phoneNumber, sex, email} = data
    return (
        <Grid container spacing={2} sx={{background: colorIndex % 2 === 0 ?"lightGray" : "gray"}}>
            <Grid size={2.4}>
                <Typography>{name}</Typography>
            </Grid>
            <Grid size={2.4}>
                <Typography>{surname}</Typography>
            </Grid>
            <Grid size={2.4}>
                <Typography>{phoneNumber}</Typography>
            </Grid>
            <Grid size={2.4}>
                <Typography>{sex}</Typography>
            </Grid>
            <Grid size={2.4}>
                <Typography>{email}</Typography>
            </Grid>
        </Grid>

    )
}