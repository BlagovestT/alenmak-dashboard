"use client";
import { useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  MenuItem,
  Stack,
  Typography,
  Menu,
  Skeleton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Link from "next/link";
import { USERNAME, USER_ROLE } from "@/helpers/helpers";
import { signOut } from "@/services/Auth/auth";

const styles = {
  appBar: {
    height: "80px",
  },
  iconButton: {
    mr: 2,
    display: { sm: "none" },
  },
};

interface TopbarProps {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isClosing: boolean;
}

const Topbar: React.FC<TopbarProps> = ({
  mobileOpen,
  setMobileOpen,
  isClosing,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = useState({
    username: "",
    role: "",
  });

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  useEffect(() => {
    if (USERNAME && USER_ROLE) setUser({ username: USERNAME, role: USER_ROLE });
  }, []);

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Stack
        height="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <IconButton
          edge="start"
          onClick={handleDrawerToggle}
          sx={styles.iconButton}
        >
          <MenuIcon />
        </IconButton>

        <Stack
          width="100%"
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Stack direction="row" justifyContent="center" alignItems="center">
            <IconButton
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                setAnchorEl(event.currentTarget)
              }
              disableRipple
            >
              <AccountBoxIcon sx={{ fontSize: "3rem" }} />
              <Stack alignItems="flex-start" mx={2}>
                <Typography component="p" variant="body1" color="common.black">
                  {user.username ? (
                    user.username
                  ) : (
                    <Skeleton variant="text" width={100} height={20} />
                  )}
                </Typography>
                <Typography component="p" variant="body1" color="common.black">
                  {user.role === "admin" ? (
                    "Собственик"
                  ) : user.role === "user" ? (
                    "Управител"
                  ) : (
                    <Skeleton variant="text" width={100} height={20} />
                  )}
                </Typography>
              </Stack>
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
          </Stack>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <Link href="/profile">
              <MenuItem sx={{ gap: 2 }}>
                <AccountCircleIcon sx={{ fontSize: "1.8rem" }} />{" "}
                <Typography component="p" variant="body1">
                  Профил
                </Typography>
              </MenuItem>
            </Link>
            <MenuItem sx={{ gap: 2 }}>
              <SettingsOutlinedIcon sx={{ fontSize: "1.8rem" }} />{" "}
              <Typography component="p" variant="body1">
                Настройки
              </Typography>
            </MenuItem>
            <MenuItem sx={{ gap: 2 }} onClick={() => signOut()}>
              <LogoutIcon sx={{ fontSize: "1.8rem" }} />{" "}
              <Typography component="p" variant="body1">
                Изход
              </Typography>
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default Topbar;
