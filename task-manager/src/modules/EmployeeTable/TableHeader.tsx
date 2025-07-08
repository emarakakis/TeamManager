import { Grid, Typography } from "@mui/material"

export default function TableHeader(){
    return (
        <Grid container spacing={2} sx={{background:"white"}}>
            <Grid size={2.4}>
                    <Typography>Name</Typography>
                </Grid>
            <Grid size={2.4}>
                <Typography>Surname</Typography>
            </Grid>
            <Grid size={2.4}>
                <Typography>Phone Number</Typography>
            </Grid>
            <Grid size={2.4}>
                <Typography>Sex</Typography>
            </Grid>
            <Grid size={2.4}>
                <Typography>Email</Typography>
            </Grid>
        </Grid>
    )
}