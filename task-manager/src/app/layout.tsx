"use client"

import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { theme } from "./theme";
import { Box } from "@mui/material";
import NavigationHeader from "@/modules/NavigationHeader/NavigationHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const client = new QueryClient()
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={client}>
          <NavigationHeader >
          <ThemeProvider theme = {theme}>
            <Box sx={{width:1}}>
              {children}
            </Box>
          </ThemeProvider>
          </NavigationHeader>
        </QueryClientProvider>
      </body>
    </html>
  );
}
