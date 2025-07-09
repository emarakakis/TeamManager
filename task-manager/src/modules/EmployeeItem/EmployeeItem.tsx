import { Employee } from "@/types/employee"
import { Box, Grid, Typography } from "@mui/material"

export default function EmployeeItem({data, colorIndex}: {data: Employee, colorIndex:number}){
    const {name, surname, phoneNumber, sex, email} = data
    return (
        <Grid container sx={{background: colorIndex % 2 === 0 ?"#1976d2" : "white", width:1}}>
            <Grid size={12/5}>
                <Typography>{name}</Typography>
            </Grid>
            <Grid size={12/5}>
                <Typography>{surname}</Typography>
            </Grid>
            <Grid size={12/5}>
                <Typography>{phoneNumber}</Typography>
            </Grid>
            <Grid size={7/5}>
                <Typography>{sex}</Typography>
            </Grid>
            <Grid size={17/5}>
                <Typography>{email}</Typography>
            </Grid>
        </Grid>

    )
}