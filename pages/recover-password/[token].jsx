import apiClient from "@/apiClient";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useState } from "react";
import db from "database/models/index";
import { Op } from "sequelize";
import Head from "next/head";

const RecoverPassword = (props) => {
  const { token } = props;
  const [mensaje, setMensaje] = useState(props.message);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mostrar, setMostrar] = useState(props.token ? "form" : "result");
  const [showPwd, setShowPwd] = useState(false)

  const handleChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("Las contraseñas no coinciden");
    } else {
      setPasswordError("");
    }
  };

  const handleRecovery = (e) => {
    e.preventDefault();

    //realizar envío de nueva contraseña
    apiClient.post("/password/change", { password, token })
      .then((response) => {
        console.log(response.data);
        setMostrar("result");
        setMensaje(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        setMostrar("result");
        setMensaje(error.message || "Error al intentar guardar la nueva contraseña.");
      });
  };

  const renderContent = () => {

    if (mostrar === "form") {
      return (
        //Formulario
        <form onSubmit={handleRecovery} noValidate>
          <Grid container spacing={4} sx={{ display: "flex", justifyContent: "center" }} >
            <Grid item xs={12} md={8} sx={{ my: 3 }}>
              <Typography
                color="primary"
                variant="h5"
                mt={6}
                sx={{ fontWeight: "bold" }}
              >
                Ingresa la nueva contraseña
              </Typography>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="password"
                type={showPwd ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleChange}
                error={!!passwordError}
                helperText={passwordError}
              />
              <Typography
                color="primary"
                variant="h5"
                mt={6}
                sx={{ fontWeight: "bold" }}
              >
                Confirmar contraseña
              </Typography>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                value={confirmPassword}
                onChange={handleConfirmChange}
                error={!!passwordError}
                helperText={passwordError}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              sx={{ fontSize: "20px" }}
              fullWidth
              variant="contained"
            >
              Restablecer contraseña
            </Button>
          </Grid>
        </form>
      );
    }

    return (
      <Typography sx={{ marginTop: 8, textAlign: 'center' }} variant="h6">{mensaje}</Typography>
    );
  };

  return (
    //Renderizado
    <Container>
      <Head>
        <title>Recuperar Contraseña.</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
      </Head>=
      <Navbar className="menu" fixed="top">
        <Navbar.Brand id="unidadesTitle">Recuperar Contraseña</Navbar.Brand>
      </Navbar>
      {renderContent()}
    </Container>
  );
};

export async function getServerSideProps({ req, res, params }) {
  // Leer el token
  const { token } = params;
  console.log(token);

  //Buscar el usuario mediante el token de recuperacion
  const user = await db.Usuario.findOne({
    where: {
      passwordResetToken: token,
      passwordResetExpire: { [Op.gt]: new Date() },
    },
  });

  if (!user) {
    return {
      props: {
        token: null,
        message:
          "El link de recuperacion de contraseña no es invalido o ha expirado",
      },
    };
  }

  return {
    props: {
      token,
      message: "Ingresar la nueva contraseña",
    },
  };
}

export default RecoverPassword;
