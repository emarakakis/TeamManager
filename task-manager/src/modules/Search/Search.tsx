import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Box,
  Grid,
  Button,
  List,
  ListItem,
  Typography,
  TextField,
} from "@mui/material";
import SearchInput from "../SearchInput/SearchInput";
import SelectControl from "../SelectControl/SelectControl";
import { useQueryState } from "@/app/hooks/query-state-hook";
import qs from "qs";
import { Option } from "../SelectControl/SelectControl";
import SearchCondition from "./SearchCondition";

export default function Search({
  type,
  options,
}: {
  type: string;
  options: Option[];
}) {
  const [searchType, setSearchType] = useQueryState(type);
  const [intenalValue, setInternalValue] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<Array<Object>>([]);

  const { getValues, control } = useForm<{ category: string }>();

  function handleSearch() {
    const typeObject = { ...searchType };
    const field = getValues("category") ?? "name";

    const val = intenalValue ? intenalValue : null;
    typeObject[field] = val;

    setInternalValue("");
    setSearchType(qs.stringify(typeObject));
  }

  function handleDeleteCondition(key: string) {
    const typeObject = { ...searchType };
    typeObject[key] = null;
    setSearchType(qs.stringify(typeObject));
  }

  const conditions = Object.entries(searchType);

  return (
    <Grid container direction="column">
      <Grid container sx={{ ml: 2 }}>
        <Grid container sx={{ width: "40%" }}>
          <SelectControl
            name="category"
            defaultValue="name"
            control={control}
            options={options}
          />
        </Grid>
        <Grid container sx={{ width: "40%" }}>
          <SearchInput value={intenalValue} setValue={setInternalValue} />
        </Grid>
        <Grid container sx={{ width: "20%" }}>
          <Button onClick={handleSearch}>Search</Button>
        </Grid>
        <Grid></Grid>
      </Grid>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {conditions.map(([condition, value], index) => (
          <SearchCondition
            condition={condition}
            value={value}
            onClick={() => handleDeleteCondition(condition)}
            key={index}
          />
        ))}
      </Grid>
    </Grid>
  );
}
