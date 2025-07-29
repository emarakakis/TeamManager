import { Grid, Typography, Box } from "@mui/material";
import Search from "../Search/Search";
import TableHeader from "./TableHeader";
import { Option } from "../SelectControl/SelectControl";
import { tableSx } from "./styles";
export default function TypeTable({
  type,
  title,
  children,
  columnNames,
  searchOptions,
  ...props
}: {
  children: React.ReactNode;
  type: string;
  title: string;
  columnNames: string[];
  searchOptions: Option[];
}) {
  return (
    <Grid sx={tableSx}>
      <Grid container sx={{ minHeight: "100%", minWidth: "100%" }}>
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
      </Grid>
      <Grid
        sx={{
          display: "block",
          padding: "5px",
          mt: 1,
          width: "100%",
          borderRadius: "16px",
          backgroundColor: "lightGray",
          maxWidth: "2000px",
          maxHeight: "320px",
          overflowX: "auto",
          overfloxY: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "thin",
        }}
      >
        <Box
          sx={{
            height: "320px",
          }}
        >
          <TableHeader columnNames={columnNames} />
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
