import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth";

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { email, password, handleFormChange } = useForm({
    email: "flor@gmail.com",
    password: "123456",
  });

  // const {status} = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(checkingAuthentication());
  };

  const handleGoogleSignIn = () => {
    console.log("handleGoogleSignIn");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={handleFormChange}
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contaseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={handleFormChange}
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={handleGoogleSignIn}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography variant="button" sx={{ ml: 1 }}>
                  Google
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
