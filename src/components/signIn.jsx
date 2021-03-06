import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import loginImg from "../img/logoUteam.jpg";
import { deepOrange } from "@mui/material/colors";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert } from "@mui/material";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";

const theme = createTheme({
  palette: {
    primary: deepOrange,
    secondary: {
      main: deepOrange[900],
    },
  },
});

export default function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isLogged } = useUser();
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  if (location.state !== null || "") {
    console.log(location.state.message);
  }

  useEffect(() => {
    if (isLogged) navigate("/loged", { replace: false });
  }, [isLogged, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ nombre, password });
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main", width: 100, height: 100 }}
            src={loginImg}
          ></Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesi??n
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {location.state !== null || "" ? (
              <Alert severity="error">{location.state.message}</Alert>
            ) : (
              <></>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contrase??a"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar contrase??a"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvid?? la contrase??a
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Registrarme"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
