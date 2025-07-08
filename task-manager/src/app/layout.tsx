"use client"

import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { theme } from "./theme";

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
          <ThemeProvider theme = {theme}>
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
