import { Grid, Typography } from "@mui/material"

export default function TableHeader(){
return(            
    <Grid container sx={{backgroundColor:"white"}}>
        <Grid size={4.5}>
            <Typography>Area</Typography>
        </Grid>
        <Grid size={4.5}>
            <Typography>Name</Typography>
        </Grid>
        <Grid size={3} container sx={{justifyContent:"end", pr:2.5}}>
            <Typography>Options</Typography>
        </Grid>
    </Grid>
    )
}