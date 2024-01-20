"use client";
import { useState } from "react";
import { Box, Stack } from "@mui/material";
import Topbar from "../Topbar/Topbar";
import Drawer from "../Drawer/Drawer";

const styles = {
  nav: {
    width: { sm: "240px" },
    flexShrink: { sm: 0 },
  },
};

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  return (
    <Stack>
      <Topbar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isClosing={isClosing}
      />
      <Box component="nav" sx={styles.nav}>
        <Drawer
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          setIsClosing={setIsClosing}
        />
      </Box>
    </Stack>
  );
};

export default Sidebar;
