import * as React from 'react';
import { useState } from "react";
import './signin.css';
import swal from 'sweetalert';
import { Box, Container, color} from '@mui/system';
import {Typography , TextField, FormControlLabel, Button, Grid , Link, Avatar} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { CenterFocusStrong } from '@mui/icons-material';
import config from './config.json';
import image from './assets/logo.jpg';

async function loginUser(credentials) {
  return fetch(config.ServerApi+"/AuthUserLDAP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "*/*",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function SignIn() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username === config.userAdmin && password === config.passwAdmin){
      localStorage.setItem("accessToken", Math.random().toString());
      localStorage.setItem("user", username);
      localStorage.setItem("admin", true);
      navigate("/adminprofile");
    }
    else{
      const response = await loginUser({
        username,
        password,
      });
      if ("accessToken" in response) {
        swal("Success", response.message, "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          localStorage.setItem("accessToken", response["accessToken"]);
          localStorage.setItem("user", username);
          if("admin" in response){
            localStorage.setItem("admin", response["admin"]);
            navigate("/adminprofile");
          }
          else{
            navigate("/profile");
          }
        });
      } else {
        swal("Failed", response.message, "error");
      }
    }
  };

  return (
    <div className='divlogin'>
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,  
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "lightgray"
        }}
      >
        <img src={image} height="40" alt="Logo Universidad" />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  </div>
  );
}