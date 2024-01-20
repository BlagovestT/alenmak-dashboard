import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import Logo from "../Logo/Logo";
import { SIDEBAR_MENU } from "../Routes/SidebarMenu";
import Link from "next/link";

const DrawerContent = () => {
  return (
    <Stack>
      <Logo />
      <Divider />
      <List>
        {SIDEBAR_MENU.map((menuItem) => (
          <ListItem key={menuItem.title} disablePadding>
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
