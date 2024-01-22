"use client";
import { useEffect, useState } from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@/components/MUIComponents/TextField";
import { USERNAME, USER_EMAIL } from "@/helpers/helpers";

const ProfilePage = () => {
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
      <Stack justifyContent="center" alignItems="center" gap={1} mb={5}>
        <Typography component="h2" variant="h2" mb={2}>
          Вашият Профил
        </Typography>

        <AccountCircleIcon sx={{ fontSize: "12rem" }} />
        <Typography component="h2" variant="h3">
          {user.username ? user.username : "Име Фамилия"}
        </Typography>
        <Typography component="h2" variant="h3">
          {user.email ? user.email : "Имейл Адрес"}
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
        <TextField
          label={user.username ? user.username : "Име Фамилия"}
          disabled
        />

        <Typography component="h2" variant="h3">
          Имейл адрес
        </Typography>
        <TextField label={user.email ? user.email : "Имейл Адрес"} disabled />

        <Typography component="h2" variant="h3">
          Роля
        </Typography>
        <TextField label="Роля" disabled />
      </Stack>
    </Container>
  );
};

export default ProfilePage;
