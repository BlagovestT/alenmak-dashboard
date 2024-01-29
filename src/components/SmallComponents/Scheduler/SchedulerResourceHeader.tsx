import { DefaultRecourse } from "@aldabil/react-scheduler/types";
import { Stack, Typography, useTheme } from "@mui/material";

interface SchedulerResourceHeaderProps {
  resource: DefaultRecourse;
}

const SchedulerResourceHeader: React.FC<SchedulerResourceHeaderProps> = ({
  resource,
}) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={1}
      textTransform="capitalize"
      px={2}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        width="2rem"
        height="2rem"
        bgcolor={resource.color}
        color={theme.palette.common.white}
        p={2.5}
        borderRadius="50%"
      >
        <Typography component="p" variant="body1">
          {resource.avatar}
        </Typography>
      </Stack>

      <Stack justifyContent="center" alignItems="flex-start">
        <Typography
          component="p"
          variant="body1"
          color={theme.palette.common.black}
        >
          {resource.title}
        </Typography>
        <Typography
          component="p"
          variant="body2"
          color={theme.palette.common.black}
        >
          {resource.role}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SchedulerResourceHeader;
