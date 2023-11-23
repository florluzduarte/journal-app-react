import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { startCreatingUserWithEmailAndPassword } from "../../store/auth/thunks";

const formData = {
  displayName: "",
  email: "",
  password: "",
};

const formValidations = {
  displayName: [
    (value) => value.length >= 2,
    "El nombre debe contener 2 o más caracteres",
  ],
  email: [(value) => value.includes("@"), "El email debe contener @"],
  password: [
    (value) => value.length >= 6,
    "La contraseña debe tener al menos 6 caracteres",
  ],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const {
    formState,
    handleFormChange,
    email,
    password,
    displayName,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailAndPassword(formState));
  };

  return (
    <AuthLayout title="Crear una cuenta">
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={handleFormChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={handleFormChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} display={errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
