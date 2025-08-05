"use client";

import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { theme } from "./theme";
import { Box } from "@mui/material";
import NavigationHeader from "@/modules/NavigationHeader/NavigationHeader";
import EditItemDrawer from "@/modules/EditItemDrawer/EditItemDrawer";
import ActionModal from "@/modules/ActionModal/ActionModal";
import ChangeModal from "@/modules/ChangeModal/ChangeModal";
import DuplicateModal from "@/modules/DuplicateModal/DuplicateModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new QueryClient();
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={client}>
          <Box sx={{ height: "100vh", width: "100%" }}>
            <NavigationHeader>
              <ThemeProvider theme={theme}>
                <Box sx={{ width: "100%", height: "100%" }}>{children}</Box>
                <EditItemDrawer />
                <ActionModal />
                <ChangeModal />
                <DuplicateModal />
              </ThemeProvider>
            </NavigationHeader>
          </Box>
        </QueryClientProvider>
      </body>
    </html>
  );
}
