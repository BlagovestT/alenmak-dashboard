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
import { SIDEBAR_MENU } from "../Routes/SidebarMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DrawerContent = () => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Stack>
      <Logo />
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {SIDEBAR_MENU.map((menuItem) => (
          <ListItem
            key={menuItem.title}
            sx={{
              bgcolor: pathname === menuItem.to ? theme.palette.grey[900] : "",
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
