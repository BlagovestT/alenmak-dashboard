import { Drawer as MUIDrawer } from "@mui/material";
import DrawerContent from "./DrawerContent";

const styles = {
  drawer: {
    display: { xs: "none", sm: "block" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: "240px",
    },
  },
  mobileDrawer: {
    display: { xs: "block", sm: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: "240px",
    },
  },
};

interface DrawerProps {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
}

const Drawer: React.FC<DrawerProps> = ({
  mobileOpen,
  setMobileOpen,
  setIsClosing,
}) => {
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <MUIDrawer
      sx={mobileOpen ? styles.mobileDrawer : styles.drawer}
      variant={mobileOpen ? "temporary" : "permanent"}
      open={mobileOpen ? mobileOpen : true}
      onTransitionEnd={mobileOpen ? handleDrawerTransitionEnd : undefined}
      onClose={mobileOpen ? handleDrawerClose : undefined}
      ModalProps={{
        keepMounted: mobileOpen ? true : false,
      }}
    >
      <DrawerContent />
    </MUIDrawer>
  );
};

export default Drawer;
