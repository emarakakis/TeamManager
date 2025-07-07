"use client"

import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme = {theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
