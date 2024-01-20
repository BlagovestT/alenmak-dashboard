import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

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
    title: "Пациенти",
    icon: Groups2OutlinedIcon,
    to: "/patients",
  },
  {
    title: "Доктори",
    icon: LocalHospitalOutlinedIcon,
    to: "/doctors",
  },
];
