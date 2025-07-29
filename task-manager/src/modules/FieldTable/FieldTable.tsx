import { useQuery } from "@tanstack/react-query";
import getFields from "../../serverFunctions/getFields";
import { FieldDataReturn } from "@/types/FieldData";
import { useQueryState } from "@/app/hooks/query-state-hook";
import TypeTable from "../TypeTable/TypeTable";
import TypeItem from "../TypeItem/TypeItem";
import LoadingData from "../LoadingData/LoadingData";

const options = [
  { key: "area", value: "Area" },
  { key: "name", value: "Name" },
];

export default function FieldTable() {
  const [searchField, setSearchEmployee] = useQueryState("field");
  const { data, isLoading } = useQuery<FieldDataReturn[]>({
    queryKey: ["fields", searchField],
    queryFn: () => getFields(searchField ?? ""),
  });

  return (
    <TypeTable
      title="Fields"
      type="field"
      searchOptions={options}
      columnNames={["Name", "Area"]}
    >
      {isLoading && <LoadingData />}
      {data &&
        !isLoading &&
        data?.map((f, i) => {
          return <TypeItem key={i} data={f} index={i} type="field" />;
        })}
    </TypeTable>
  );
}
