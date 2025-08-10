import { FormControlLabel, Grid, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import Search from "./Search";
import { EmployeeCreate } from "@/types/employee";
import { FieldDataCreate } from "@/types/FieldData";
import { JobCreate } from "@/types/Job";

const selectOptions = [
  { key: "employee", label: "Employee" },
  { key: "field", label: "Field" },
  { key: "job", label: "Job" },
];

export type SearchFields = {
  employee?: Partial<EmployeeCreate>;
  field?: Partial<FieldDataCreate>;
  job?: Partial<JobCreate>;
};

type SearchType = {
  employee: { key: string; label: string };
  job: { key: string; label: string };
  field: { key: string; label: string };
};

const searchOptions = {
  employee: [
    { key: "name", value: "Name" },
    { key: "surname", value: "Surname" },
    { key: "phoneNumber", value: "Phone Number" },
    { key: "sex", value: "Sex" },
    { key: "options", value: "Options" },
  ],
  job: [
    { key: "name", value: "Name" },
    { key: "profession", value: "Profession" },
    { key: "area", value: "Area" },
  ],
  field: [
    { key: "area", value: "Area" },
    { key: "name", value: "Name" },
  ],
};

export default function EmployeeJobSearch() {
  const [select, setSelect] = useState<keyof SearchType | "unselected">(
    "unselected"
  );
  const options = select !== "unselected" ? searchOptions[select] : [];

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        backgroundColor: "#e8e8e8",
        height: "75px",
        borderRadius: "16px",
      }}
    >
      <Select
        value={select}
        sx={{ width: "150px", height: "50%" }}
        onChange={(e) => setSelect(e.target.value)}
      >
        <MenuItem value="unselected" disabled>
          Select...
        </MenuItem>
        {selectOptions.map(({ key, label }) => (
          <MenuItem value={key} key={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {select !== "unselected" && <Search type={select} options={options} />}
    </Grid>
  );
}
