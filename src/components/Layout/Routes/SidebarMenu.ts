import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

type SidebarMenuProps = {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  to: string;
};

export const SIDEBAR_MENU: SidebarMenuProps[] = [
  {
    title: "Начало",
    icon: HomeOutlinedIcon,
    to: "/",
  },
  {
    title: "График",
    icon: CalendarMonthOutlinedIcon,
    to: "/schedule",
  },
  {
    title: "Персонал",
    icon: PeopleOutlineOutlinedIcon,
    to: "/patients",
  },
  {
    title: "Пациенти",
    icon: Groups2OutlinedIcon,
    to: "/patients",
  },
  {
    title: "Финансов Отчет",
    icon: PaymentOutlinedIcon,
    to: "/patients",
  },
];
