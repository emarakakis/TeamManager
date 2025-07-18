import getFieldJobs from "@/serverFunctions/getFieldJobs";
import { useQuery } from "@tanstack/react-query";
import { FieldJobReturn } from "@/types/FieldJob";
import TypeTable from "../TypeTable/TypeTable";
import TableHeader from "../TypeTable/TableHeader";
import TypeItem from "../TypeItem/TypeItem";

const searchOptions = [
  { key: "fieldName", value: "Field Name" },
  { key: "jobName", value: "Job Name" },
  { key: "profession", value: "Profession" },
  { key: "area", value: "Area" },
];

export default function FieldJobTable() {
  const { data } = useQuery<FieldJobReturn[]>({
    queryKey: ["fieldJobs"],
    queryFn: getFieldJobs,
  });

  return (
    <TypeTable type="fieldJob" title="Field Jobs" searchOptions={searchOptions}>
      <TableHeader
        columnNames={[
          "Field Name",
          "Job Name",
          "Profession",
          "Area",
          "Options",
        ]}
      />
      {data?.map((item, index) => (
        <TypeItem key={index} data={item} index={index} type="fieldJob" />
      ))}
    </TypeTable>
  );
}
