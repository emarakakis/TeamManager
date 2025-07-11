import { EmployeeReturn } from "@/types/employee"
import { Button, Grid, Typography, } from "@mui/material"
import ItemModal from "../ItemModal/ItemModal"


export default function EmployeeItem({data, colorIndex}: {data: EmployeeReturn, colorIndex:number}){
    const {id, name, surname, phoneNumber, sex, email} = data
    return (
        <Grid container sx={{background: colorIndex % 2 === 0 ?"#1976d2" : "white", width:1}}>
            <Grid size={10/5}>
                <Typography>{name}</Typography>
            </Grid>
            <Grid size={10/5}>
                <Typography>{surname}</Typography>
            </Grid>
            <Grid size={10/5}>
                <Typography>{phoneNumber}</Typography>
            </Grid>
            <Grid size={7/5}>
                <Typography>{sex}</Typography>
            </Grid>
            <Grid size={17/5}>
                <Typography>{email}</Typography>
            </Grid>
            <Grid size={6/5} container sx={{justifyContent:"center"}}>
                <ItemModal id={id} type={"employee"}/>
            </Grid>
        </Grid>

    )
}