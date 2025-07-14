import { Box, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import getJobs from "@/serverFunctions/getJobs"
import { JobReturn } from "@/types/Job"
import JobItem from "../JobItem/JobItem"
import TableHeader from "./TableHeader"
import Search from "../Search/Search"
import { useQueryState } from "@/app/hooks/query-state-hook"

export default function JobTable({...props}){
        const [searchJobs, setSearchJobs] = useQueryState('jobs')
        const {data} = useQuery<JobReturn[]>({
        queryKey: ['jobs', searchJobs],
        queryFn: () => getJobs(searchJobs ?? "")
    })
    
    return (
        <Grid {...props}>
            <Typography variant="h2">Jobs</Typography>
            <Search type="jobs"/>
            <hr/>
            <TableHeader />
            <hr/>
            <Grid>
                {data && data.map((item, index) =><JobItem {...item} index={index} key={index}/>)}
            </Grid>
        </Grid>
    )

}