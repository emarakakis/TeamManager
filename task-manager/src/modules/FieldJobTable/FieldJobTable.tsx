import getFieldJobs from "@/serverFunctions/getFieldJobs";
import { useQuery } from "@tanstack/react-query";
import { FieldJobReturn } from "@/types/FieldJob";
import TypeTable from "../TypeTable/TypeTable";
import TypeItem from "../TypeItem/TypeItem";
import { useQueryState } from "@/app/hooks/query-state-hook";
import LoadingData from "../LoadingData/LoadingData";

const searchOptions = [
  { key: "fieldName", value: "Field Name" },
  { key: "jobName", value: "Job Name" },
  { key: "profession", value: "Profession" },
  { key: "area", value: "Area" },
];

export default function FieldJobTable() {
  const [fieldJob, setFieldJob] = useQueryState("fieldJob");

  const { data, isLoading } = useQuery<FieldJobReturn[]>({
    queryKey: ["fieldJobs", JSON.stringify(fieldJob)],
    queryFn: () => getFieldJobs(fieldJob),
  });

  return (
    <TypeTable
      type="fieldJob"
      title="Field Jobs"
      searchOptions={searchOptions}
      columnNames={["Area", "Field Name", "Job Name", "Profession"]}
    >
      {isLoading && <LoadingData />}
      {data &&
        !isLoading &&
        data.map((item, index) => (
          <TypeItem key={index} data={item} index={index} type="fieldJob" />
        ))}
    </TypeTable>
  );
}
