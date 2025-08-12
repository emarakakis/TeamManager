import { useForm } from "react-hook-form";
import { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
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
  const { getValues, control } = useForm<{ category: string }>();

  function handleSearch() {
    const typeObject = { ...searchType };
    const field = getValues("category") ?? "name";

    const val = intenalValue ? intenalValue : null;
    typeObject[field] = val;

    setInternalValue("");
    setSearchType(typeObject);
  }

  function handleDeleteCondition(key: string) {
    const typeObject = { ...searchType };
    typeObject[key] = null;
    setSearchType(typeObject);
  }

  const conditions = Object.entries(searchType);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "3fr 2fr",
        width: "100%",
        height: "50px",

        gap: 2,
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <SelectControl
              name="category"
              defaultValue="name"
              control={control}
              options={options}
            />
          </Box>

          <SearchInput value={intenalValue} setValue={setInternalValue} />
        </Box>
        <Grid container sx={{ justifyContent: "center" }}>
          <Button onClick={handleSearch}>Search</Button>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "grid",
          flexDirection: "column",
          overflowY: "auto",
          gap: 1,
        }}
      >
        {conditions.map(([condition, value], index) => (
          <SearchCondition
            condition={condition}
            value={value}
            onClick={() => handleDeleteCondition(condition)}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
}
