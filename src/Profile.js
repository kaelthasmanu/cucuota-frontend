import React, { useState } from 'react'; // Imported React and useState
import PropTypes from 'prop-types'; // Imported PropTypes
import LinearProgress from '@mui/material/LinearProgress'; // Imported LinearProgress
import { makeStyles } from '@mui/styles';
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, Card, CardContent } from '@mui/material';
import AppBar from '@mui/material/AppBar'; // Added AppBar import
import Toolbar from '@mui/material/Toolbar'; // Added Toolbar import
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { UseFetch } from './utils/CuotaData';
import image from './assets/logo.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing,
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing,
    height: theme.spacing,
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Profile() {
  const [progress, setProgress] = React.useState(10);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();  

  const { data ,pendiente } = UseFetch("http://10.34.8.66:5173/Cuota");
  const dataTotalQuota = UseFetch("http://10.34.8.66:5173/QuotaTotal");

  if (pendiente) {
    return(<p>Cargando...</p>)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const results2 = Object.values(dataTotalQuota.data).map((object, j) => ({
    ...object,
    id: j + 1,
    name: object.name || "Nan",
    totalQuota: object.totalQuota || 0,
  }));

  const results = Object.values(data).map((obj, i) => ({
    ...obj,
    id: i + 1,
    name: obj.name || "Nan",
    trafficD: obj.trafficD || 0,
  }));

  const combinedResults = results.map((user) => {
    const matchingTotalQuota = results2.find((totalQuota) => totalQuota.name === user.name);
    return {
      ...user,
      totalQuota: matchingTotalQuota?.totalQuota || 0,
    };
  });

  const username = user ? user.split('@')[0] : "Nan";
  const filteredResults = combinedResults.filter((result) => result.name === username);
  const megasAvailable = filteredResults[0]?.totalQuota * 1024 - (filteredResults[0]?.trafficD || 0);
  const percentageAvailable = filteredResults[0]?.totalQuota
    ? (filteredResults[0]?.trafficD / (filteredResults[0]?.totalQuota * 1024)) * 100
    : 0;
  
    if (!filteredResults[0]) {
      // handle the case when filteredResults[0] is undefined
      return(
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          <img src={image} height="40" alt="Logo Universidad" />
            <Typography variant="h6">
              Profile
            </Typography>
              <IconButton onClick={handleMenu} color="inherit">
                <Avatar src={"https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Image-Transparent.png"} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
          </Toolbar>
        </AppBar>
        <Card key={user} className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5">{user}</Typography>
              <Typography variant="h6">Cuota</Typography>
              <Box sx={{ width: "100%" }}>
                <LinearProgressWithLabel  value={0} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid xs={6}>
                    <Item>Cuota Usada</Item>
                  </Grid>
                  <Grid xs={6}>
                    <Item>{0} MB</Item>
                  </Grid>
                  <Grid xs={6}>
                    <Item>Cuota Free</Item>
                  </Grid>
                  <Grid xs={6}>
                    <Item>{0} MB</Item>
                  </Grid>
                  <Grid xs={6}>
                    <Item>Cuota Total</Item>
                  </Grid>
                  <Grid xs={6}>
                    <Item>{0} MB</Item>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card> 
      <p>No data available for the current user.</p>
      </div>
      ) 
    }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <img src={image} height="40" alt="Logo Universidad" />
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={"https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Image-Transparent.png"} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
        <Card key={filteredResults[0].name} className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5">{filteredResults[0].name}</Typography>
            <Typography variant="h6">Cuota</Typography>
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel  value={percentageAvailable} />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={6}>
                  <Item>Cuota Usada</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{filteredResults[0].trafficD} MB</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>Cuota Free</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{megasAvailable} MB</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>Cuota Total</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{filteredResults[0].totalQuota * 1024} MB</Item>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card> 
    </div>
  );
}