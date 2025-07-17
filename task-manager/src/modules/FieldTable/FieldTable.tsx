import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getFields from "../../serverFunctions/getFields";
import { FieldDataReturn } from "@/types/FieldData";
import FieldItem from "../FieldItem/FieldItem";
import { useQueryState } from "@/app/hooks/query-state-hook";
import TypeTable from "../TypeTable/TypeTable";
import TableHeader from "../TypeTable/TableHeader";

const options = [
  { key: "area", value: "Area" },
  { key: "name", value: "Name" },
];

export default function FieldTable({ ...props }) {
  const [searchField, setSearchEmployee] = useQueryState("field");
  const { data } = useQuery<FieldDataReturn[]>({
    queryKey: ["fields", searchField],
    queryFn: () => getFields(searchField ?? ""),
  });

  return (
    <TypeTable title="Fields" type="field" searchOptions={options}>
      <TableHeader columnNames={["Area", "Name", "Options"]} />
      {data?.map((f, i) => {
        return <FieldItem key={i} data={f} index={i} />;
      })}
    </TypeTable>
  );
}
