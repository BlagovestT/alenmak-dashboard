import { Box, Divider, Typography, useTheme } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

interface FinanceWidgetProps {
    entry: any;
}

const FinanceWidget: React.FC<FinanceWidgetProps> = ({entry}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'inline-block',
        height: '200px',
        width: '300px',
        backgroundColor:
          entry.type === 'Приход'
            ? theme.palette.primary.light
            : theme.palette.secondary.light,
        margin: '5px',
        padding: '15px',
        borderRadius: '5px',
      }}
    >
      <Typography
        component='h4'
        variant='h3'
        sx={{ marginBottom: '15px', color: theme.palette.common.white }}
      >
        <CurrencyExchangeIcon sx={{ color: theme.palette.common.white }} />{' '}
        {entry.reason}
      </Typography>
      <Divider />
      <Typography
        component='h4'
        variant='h1'
        sx={{ margin: '30px 0 30px 0', color: theme.palette.common.white }}
      >
        {entry.amount} BGN
      </Typography>
      <Typography
        component='h4'
        variant='h4'
        sx={{ color: theme.palette.common.white }}
      >
        {entry.date}
      </Typography>
    </Box>
  );
};

export default FinanceWidget;
