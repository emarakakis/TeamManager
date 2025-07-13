import { Box, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import getJobs from "@/serverFunctions/getJobs"
import { JobReturn } from "@/types/Job"
import JobItem from "../JobItem/JobItem"
import TableHeader from "./TableHeader"

export default function JobTable({...props}){
        const {data} = useQuery<JobReturn[]>({
        queryKey: ['jobs'],
        queryFn: getJobs
    })
    
    return (
        <Grid {...props}>
            <Typography variant="h2">Jobs</Typography>
            <hr/>
            <TableHeader />
            <hr/>
            <Grid>
                {data && data.map((item, index) =><JobItem {...item} index={index} key={index}/>)}
            </Grid>
        </Grid>
    )

}