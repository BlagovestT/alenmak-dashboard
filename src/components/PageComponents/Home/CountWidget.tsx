import { Card, CardContent, Typography, Link, Stack } from '@mui/material';
import Groups2Icon from '@mui/icons-material/Groups2';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@/components/MUIComponents/Button';

interface CountWidgetProps {
  staffCount: number;
  patientCount: number;
}

const CountWidget: React.FC<CountWidgetProps> = ({ staffCount, patientCount }) => {
  return (
    <Stack direction="column" spacing={5} alignItems="center" justifyContent="center">
      {/* Staff Count Card */}
      <Card elevation={3} sx={{ borderRadius: 5}}>
        <CardContent sx={{display: 'flex', alignItems:'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h4" component="h4" gutterBottom>
            Staff Count
          </Typography>
          <GroupIcon fontSize='large' />
          <Typography variant="h3" component="div" gutterBottom>
            {staffCount}
          </Typography>
        </CardContent>
        <CardContent>
          <Link href="#" underline="none">
            <Button variant="outlined" color="primary"message='Виж повече'/>
          </Link>
        </CardContent>
      </Card>

      {/* Patient Count Card */}
      <Card elevation={3} sx={{ borderRadius: 5 }}>
        <CardContent sx={{display: 'flex', alignItems:'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h4" component="h4" gutterBottom>
            Patient Count
          </Typography>
          <Groups2Icon fontSize='large' />
          <Typography variant="h3" component="div" gutterBottom>
            {patientCount}
          </Typography>
        </CardContent>
        <CardContent>
          <Link href="#" underline="none">
            <Button variant="outlined" color="primary" message='Виж повече'/>
          </Link>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CountWidget;