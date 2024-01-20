import { Box } from "@mui/material";
// import type { Metadata } from "next";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import "./globals.css";

export const drawerWidth: number = 240;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body>
          <Sidebar />
          <Box
            component="main"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              flexGrow: 1,
              pt: 15,
              pl: { sm: "50px", md: `calc(${drawerWidth}px + 50px)` },
            }}
          >
            {children}
          </Box>
        </body>
      </ThemeRegistry>
    </html>
  );
}
