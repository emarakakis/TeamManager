import { useQuery } from "@tanstack/react-query";
import getFields from "../../serverFunctions/getFields";
import { FieldDataReturn } from "@/types/FieldData";
import { useQueryState } from "@/app/hooks/query-state-hook";
import TypeTable from "../TypeTable/TypeTable";
import TableHeader from "../TypeTable/TableHeader";
import TypeItem from "../TypeItem/TypeItem";

const options = [
  { key: "area", value: "Area" },
  { key: "name", value: "Name" },
];

export default function FieldTable() {
  const [searchField, setSearchEmployee] = useQueryState("field");
  const { data } = useQuery<FieldDataReturn[]>({
    queryKey: ["fields", searchField],
    queryFn: () => getFields(searchField ?? ""),
  });

  return (
    <TypeTable title="Fields" type="field" searchOptions={options}>
      <TableHeader columnNames={["Name", "Area"]} />
      {data?.map((f, i) => {
        return <TypeItem key={i} data={f} index={i} type="field" />;
      })}
    </TypeTable>
  );
}
