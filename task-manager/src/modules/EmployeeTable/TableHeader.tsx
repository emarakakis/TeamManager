import { Grid, Typography } from "@mui/material"

export default function TableHeader(){
    return (
        <Grid container spacing={2} sx={{background:"white"}}>
            <Grid size={10/5}>
                    <Typography>Name</Typography>
                </Grid>
            <Grid size={10/5}>
                <Typography>Surname</Typography>
            </Grid>
            <Grid size={10/5}>
                <Typography>Phone Number</Typography>
            </Grid>
            <Grid size={7/5}>
                <Typography>Sex</Typography>
            </Grid>
            <Grid size={17/5}>
                <Typography>Email</Typography>
            </Grid>
            <Grid size={5/5} container sx={{justifyContent:"center"}}>
                <Typography>Options</Typography>
            </Grid>
        </Grid>
    )
}