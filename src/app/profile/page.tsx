import { Container, Divider, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@/components/MUIComponents/TextField";

const ProfilePage = () => {
  return (
    <Container>
      <Stack justifyContent="center" alignItems="center" gap={1} mb={5}>
        <Typography component="h2" variant="h2" mb={2}>
          Вашият Профил
        </Typography>

        <AccountCircleIcon sx={{ fontSize: "12rem" }} />
        <Typography component="h2" variant="h3">
          Име Фамилия
        </Typography>
        <Typography component="h2" variant="h3">
          Имейл адрес
        </Typography>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      <Typography component="h2" variant="h2" mb={4}>
        Детайли на профила
      </Typography>

      <Stack gap={2}>
        <Typography component="h2" variant="h3">
          Име на профил
        </Typography>
        <TextField label="Име" disabled />

        <Typography component="h2" variant="h3">
          Имейл адрес
        </Typography>
        <TextField label="Имейл" disabled />

        <Typography component="h2" variant="h3">
          Роля
        </Typography>
        <TextField label="Роля" disabled />
      </Stack>
    </Container>
  );
};

export default ProfilePage;
