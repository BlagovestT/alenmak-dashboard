import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useTheme,
} from "@mui/material";
import Logo from "../Logo/Logo";
import { SIDEBAR_MENU, SidebarMenuProps } from "../Routes/SidebarMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { USER_ROLE } from "@/helpers/helpers";

const DrawerContent = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const [sideBarMenuData, setSideBarMenuData] = useState<SidebarMenuProps[]>();

  useEffect(() => {
    if (USER_ROLE) {
      const filteredSideBarMenuData: SidebarMenuProps[] = SIDEBAR_MENU;
      if (USER_ROLE !== "admin") {
        filteredSideBarMenuData.pop();
      }

      setSideBarMenuData(filteredSideBarMenuData);
    }
  }, []);

  return (
    <Stack>
      <Logo />
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {sideBarMenuData?.map((menuItem) => (
          <ListItem
            key={menuItem.title}
            sx={{
              bgcolor: pathname === menuItem.to ? theme.palette.grey[100] : "",
            }}
            disablePadding
          >
            <Link href={menuItem.to} style={{ width: "100%" }}>
              <ListItemButton>
                <ListItemIcon>{<menuItem.icon />}</ListItemIcon>
                <ListItemText primary={menuItem.title} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default DrawerContent;
