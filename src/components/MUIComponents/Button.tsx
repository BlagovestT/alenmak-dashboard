import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
  message: string;
  variant?: "text" | "contained" | "outlined";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  message,
  variant = "contained",
  onClick,
}) => {
  return (
    <MUIButton variant={variant} onClick={onClick}>
      {message}
    </MUIButton>
  );
};

export default Button;
