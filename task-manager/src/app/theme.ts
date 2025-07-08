import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette : {
        primary : {
             main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#fff',
        }
    },
    typography : {
        h1 : {
            fontFamily: "sans-serif",
            fontSize: 10
        },
        h2 : {
            fontFamily: "sans-serif",
            fontSize: 40,
            fontStyle: "italic"
        }
    }
})