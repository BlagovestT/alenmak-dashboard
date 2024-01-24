"use client";
import {
  Box,
  Stack,
  Typography,
  alpha,
  lighten,
  useTheme,
} from "@mui/material";

interface PageHeaderProps {
  header: string;
  subheader: string;
  icon?: React.ReactElement<SVGAElement, any>;
  action?: React.ReactElement<any, any>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  header,
  subheader,
  icon,
  action,
}) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{ width: { sm: `calc(100vw - ${240}px)` } }}
      bgcolor="#F5EEE6"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p={4}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
      >
        {icon && (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              bgcolor: theme.palette.primary.dark,
              p: 2,
              borderRadius: "10px",
              boxShadow:
                "0 1px 0 " +
                alpha(lighten(theme.palette.primary.main, 0.8), 0.2) +
                ", 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)",
            }}
          >
            {icon}
          </Stack>
        )}

        <Box>
          <Typography component="h2" variant="h2">
            {header}
          </Typography>
          <Typography component="p" variant="body1">
            {subheader}
          </Typography>
        </Box>
      </Stack>

      {action && action}
    </Stack>
  );
};

export default PageHeader;
