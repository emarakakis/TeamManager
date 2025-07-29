import { useQuery } from "@tanstack/react-query";
import getJobs from "@/serverFunctions/getJobs";
import { JobReturn } from "@/types/Job";
import { useQueryState } from "@/app/hooks/query-state-hook";
import TypeTable from "../TypeTable/TypeTable";
import TypeItem from "../TypeItem/TypeItem";
import LoadingData from "../LoadingData/LoadingData";

const options = [
  { key: "name", value: "Name" },
  { key: "profession", value: "Profession" },
  { key: "area", value: "Area" },
];

export default function JobTable() {
  const [searchJobs, setSearchJobs] = useQueryState("jobs");
  const { data, isLoading } = useQuery<JobReturn[]>({
    queryKey: ["jobs", searchJobs],
    queryFn: () => getJobs(searchJobs ?? ""),
  });

  return (
    <TypeTable
      type="job"
      title="Jobs"
      searchOptions={options}
      columnNames={["Name", "Profession", "Area"]}
    >
      {isLoading && <LoadingData />}
      {data &&
        !isLoading &&
        data.map((item, index) => (
          <TypeItem data={item} index={index} key={index} type="job" />
        ))}
    </TypeTable>
  );
}
