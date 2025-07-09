import { FieldData } from "@/types/FieldData";
import { Grid, Typography } from "@mui/material";

export default function FieldItem({data, index}: {data: FieldData, index: number}){

    const color = index % 2 === 1 ? "white" : "#1976d2"

    return(
        <Grid container sx={{backgroundColor:color, justifyContent:"center"}}>
            <Grid size={6}>
                <Typography>{data.area}</Typography>
            </Grid>
            <Grid size={6}>
                <Typography>{data.name}</Typography>
            </Grid>
        </Grid>
    )
}