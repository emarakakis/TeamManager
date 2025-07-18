import { Grid, Typography } from "@mui/material";
import Search from "../Search/Search";
import TableHeader from "./TableHeader";
import { Option } from "../SelectControl/SelectControl";
import { tableSx } from "./styles";
export default function TypeTable({
  type,
  title,
  children,
  searchOptions,
  ...props
}: {
  children: React.ReactNode;
  type: string;
  title: string;
  searchOptions: Option[];
}) {
  return (
    <Grid container direction="row" sx={tableSx}>
      <Grid
        container
        sx={{
          backgroundColor: "lightGray",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          width: "30%",
          borderRadius: "16px",
        }}
      >
        <Typography variant="h2" sx={{ justifyContent: "center" }}>
          {title}
        </Typography>
      </Grid>
      <Grid
        size={9}
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          width: "70%",
          borderRadius: "16px",
        }}
      >
        <Search type={type} options={searchOptions} />
      </Grid>
      {children}
    </Grid>
  );
}
