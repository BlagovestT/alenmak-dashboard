import { Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Stack height="5rem" justifyContent="center" alignItems="center" p={2}>
      <Link href="/">
        <Image
          src="https://ik.imagekit.io/obelussoft/logo_LrobyDgIb.png?updatedAt=1706031675190"
          width={200}
          height={70}
          alt="logo"
        />
      </Link>
    </Stack>
  );
};

export default Logo;
