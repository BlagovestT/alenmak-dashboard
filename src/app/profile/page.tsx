"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Divider,
  Stack,
  Typography,
  Paper,
  Avatar,
  useTheme,
} from "@mui/material";
import TextField from "@/components/MUIComponents/TextField";
import { USERNAME, USER_EMAIL } from "@/helpers/helpers";

const ProfilePage = () => {
  const theme = useTheme();
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (USERNAME && USER_EMAIL)
      setUser({ username: USERNAME, email: USER_EMAIL });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Stack
          justifyContent="center"
          alignItems="center"
          gap={2}
          mt={2}
          mb={2}
        >
          <Typography component="h2" variant="h2">
            Вашият Профил
          </Typography>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              backgroundColor: theme.palette.grey[900],
            }}
          >
            <Typography sx={{ fontSize: "2rem" }}>
              {user.username ? user.username[0].toUpperCase() : ""}
            </Typography>
          </Avatar>
          <Typography component="h4" variant="h4" mb={2}>
            {user.username ? user.username : "Име Фамилия"}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        <Typography component="h4" variant="h4" mb={4}>
          Детайли на профила
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Име на профил"
            value={user.username ? user.username : "Име Фамилия"}
            disabled
          />

          <TextField
            label="Имейл адрес"
            value={user.email ? user.email : "Имейл Адрес"}
            disabled
          />

          <TextField label="Роля" value="Потребител" disabled />
        </Stack>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
