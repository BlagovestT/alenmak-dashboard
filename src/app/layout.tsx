"use client";
import { Box } from "@mui/material";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import { useEffect } from "react";
import { USER_ID } from "@/helpers/helpers";
import { signOut } from "@/services/Auth/auth";
import { usePathname } from "next/navigation";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!USER_ID) {
      if (pathname !== "/auth/login" && pathname !== "/auth/register") {
        signOut();
        window.location.replace("/auth/login");
      }
    } else {
      if (pathname === "/auth/login" || pathname === "/auth/register") {
        window.location.replace("/");
      }
    }
  }, [pathname]);

  return (
    <html lang="en">
      <ThemeRegistry>
        <body suppressHydrationWarning={true} style={{ overflowX: "hidden" }}>
          {pathname !== "/auth/login" && pathname !== "/auth/register" && (
            <Sidebar />
          )}

          {pathname !== "/auth/login" && pathname !== "/auth/register" ? (
            <Box
              component="main"
              sx={{
                width: { sm: `calc(100vw - ${240}px)` },
                flexGrow: 1,
                pt: 10,
                pb: 3,
                pl: { sm: "50px", md: `calc(${240}px)` },
              }}
            >
              {children}
            </Box>
          ) : (
            <>{children}</>
          )}
        </body>
      </ThemeRegistry>
    </html>
  );
};

export default RootLayout;
