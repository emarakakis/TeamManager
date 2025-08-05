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
      <Grid container>
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
          display: "flex",
          padding: "5px",
          width: "100%",
          height: "100%",
          mt: "4px",
          borderRadius: "16px",
          backgroundColor: "lightGray",
          maxHeight: "300px",
          overflowX: "auto",
          overflowY: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "thin",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <TableHeader columnNames={columnNames} />
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
