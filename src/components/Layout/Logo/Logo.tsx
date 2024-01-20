import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Stack height="5rem" justifyContent="center" alignItems="center" p={2}>
      <Link href="/">
        <Typography component="h1" variant="h2">
          Аленмак
        </Typography>
      </Link>
    </Stack>
  );
};

export default Logo;
