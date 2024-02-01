import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

interface FinanceWidgetProps {
  icon?: React.JSX.Element;
  type: string;
  title: string;
  amount: number;
  date?: string;
  currency?: boolean;
}

const FinanceWidget: React.FC<FinanceWidgetProps> = ({
  icon,
  type,
  title,
  amount,
  date,
  currency,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "350px",
        display: "inline-block",
        height: "200px",
        backgroundColor:
          type === "income"
            ? theme.palette.primary.light
            : theme.palette.secondary.light,
        padding: "15px",
        borderRadius: "5px",
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
        mb={1.5}
      >
        {icon ? (
          icon
        ) : (
          <CurrencyExchangeIcon sx={{ color: theme.palette.common.white }} />
        )}
        <Typography
          component="h4"
          variant="h3"
          sx={{ color: theme.palette.common.white }}
        >
          {title}
        </Typography>
      </Stack>

      <Divider />

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        {!icon && (
          <PaymentsOutlinedIcon
            sx={{ fontSize: "3rem", color: theme.palette.common.white }}
          />
        )}

        <Typography
          component="h4"
          variant="h1"
          sx={{
            margin: "30px 0 30px 0",
            color: theme.palette.common.white,
            textAlign: "center",
          }}
        >
          {amount}
        </Typography>

        <Typography
          component="span"
          variant="h3"
          sx={{
            margin: "30px 0 30px 0",
            color: theme.palette.common.white,
            textAlign: "center",
            mt: 5,
          }}
        >
          {currency && "ЛВ"}
        </Typography>
      </Stack>

      {date && (
        <Typography
          component="h4"
          variant="h3"
          sx={{ color: theme.palette.common.white, textAlign: "center" }}
        >
          {date}
        </Typography>
      )}
    </Box>
  );
};

export default FinanceWidget;
