import { useQuery } from "@tanstack/react-query";
import { EmployeeReturn } from "@/types/employee";
import EmployeeItem from "@/modules/EmployeeItem/EmployeeItem";
import getEmployees from "@/serverFunctions/getEmployees";
import { useQueryState } from "@/app/hooks/query-state-hook";
import TypeTable from "../TypeTable/TypeTable";
import TableHeader from "../TypeTable/TableHeader";

const options = [
  { key: "name", value: "Name" },
  { key: "surname", value: "Surname" },
  { key: "phoneNumber", value: "Phone Number" },
  { key: "sex", value: "Sex" },
  { key: "options", value: "Options" },
];

export default function EmployeeTable() {
  const [searchEmployee, setSearchEmployee] = useQueryState("employee");
  const { data } = useQuery<EmployeeReturn[]>({
    queryKey: ["employees", searchEmployee],
    queryFn: () => getEmployees(searchEmployee),
  });
  return (
    <TypeTable title="Employees" type="employee" searchOptions={options}>
      <TableHeader
        columnNames={[
          "Name",
          "Surname",
          "Phone Number",
          "Sex",
          "Email",
          "Options",
        ]}
      />
      {data &&
        data.map((employee, index) => {
          return (
            <EmployeeItem key={index + 1} colorIndex={index} data={employee} />
          );
        })}
    </TypeTable>
  );
}
