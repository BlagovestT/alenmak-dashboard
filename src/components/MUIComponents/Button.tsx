import { Button as MUIButton, SxProps, Theme } from "@mui/material";

interface ButtonProps {
  icon?: React.ReactElement<any, any>;
  message: string;
  variant?: "text" | "contained" | "outlined";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  message,
  variant = "contained",
  color = "primary",
  sx,
  onClick,
}) => {
  return (
    <MUIButton variant={variant} color={color} onClick={onClick} sx={sx}>
      {icon && <>{icon} </>}
      {message}
    </MUIButton>
  );
};

export default Button;
