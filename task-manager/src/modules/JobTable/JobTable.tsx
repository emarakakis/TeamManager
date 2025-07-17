import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getJobs from "@/serverFunctions/getJobs";
import { JobReturn } from "@/types/Job";
import JobItem from "../JobItem/JobItem";
import TableHeader from "../TypeTable/TableHeader";
import { useQueryState } from "@/app/hooks/query-state-hook";
import TypeTable from "../TypeTable/TypeTable";

const options = [
  { key: "name", value: "Name" },
  { key: "profession", value: "Profession" },
  { key: "area", value: "Area" },
];

export default function JobTable({ ...props }) {
  const [searchJobs, setSearchJobs] = useQueryState("jobs");
  const { data } = useQuery<JobReturn[]>({
    queryKey: ["jobs", searchJobs],
    queryFn: () => getJobs(searchJobs ?? ""),
  });

  return (
    <TypeTable type="job" title="Jobs" searchOptions={options}>
      <TableHeader columnNames={["Name", "Profession", "Area", "Options"]} />
      <Grid>
        {data &&
          data.map((item, index) => (
            <JobItem data={item} index={index} key={index} />
          ))}
      </Grid>
    </TypeTable>
  );
}
