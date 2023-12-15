import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import LinearProgress from '@mui/material/LinearProgress'; 
import { makeStyles } from '@mui/styles';
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, Card, CardContent, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AppBar from '@mui/material/AppBar'; 
import Toolbar from '@mui/material/Toolbar'; 
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { UseFetch } from './utils/CuotaData';
import UserList from './components/UserList'; 
import QuotaManagement from './components/QuotaManagement'; 
import './css/ProfileAdmin.css'
import config from './config.json'
import ApiCallComponent from './components/TotalQuota';
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
  // Nuevo estado para gestionar qué componente mostrar
  const [showUserList, setShowUserList] = useState(false);
  const [showQuotaManagement, setShowQuotaManagement] = useState(false);

  const { data ,pendiente } = UseFetch(config.ServerApi+"/Cuota");
  const dataTotalQuota = UseFetch(config.ServerApi+"/QuotaTotal");
  const [openC, setOpen] = useState(false);

  if (pendiente) {
    return(<p>Cargando...</p>)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const handleOpenC = () => {
    setOpen(true);
  };

  const handleCloseC = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/");
  };

  const results2 = Object.values(dataTotalQuota.data).map((object, j) => ({
    ...object,
    id: j + 1,
    name:object.name,
    totalQuota:object.totalQuota,
  }));

  const results = Object.values(data).map((obj, i) => ({
    ...obj,
    id: i + 1,
    name:obj.name,
    trafficD:obj.trafficD,
  }));

  const combinedResults = results.map((user) => {
    const matchingTotalQuota = results2.find((totalQuota) => totalQuota.name === user.name);
    return {
      ...user,
      totalQuota: matchingTotalQuota?.totalQuota || 0,
    };
  });
  
  const username = user.split('@')[0];
  const filteredResults = combinedResults.filter((result) => result.name === username);
  const megasAvailable = filteredResults[0]?.totalQuota * 1024 - filteredResults[0]?.trafficD;
  const percentageAvailable = filteredResults[0]?.totalQuota
  ? (filteredResults[0]?.trafficD / (filteredResults[0]?.totalQuota * 1024)) * 100
  : 0;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <img src={image} height="40" alt="Logo Universidad" />
          <Typography variant="h6">
            Profile
          </Typography>
          <div className='buttons-topbar'>
          <Button 
            variant="contained"
            onClick={() => {
              if(showUserList === false){
                setShowUserList(true);
                setShowQuotaManagement(false);
              }
              else{
                setShowUserList(false);
                setShowQuotaManagement(false);
              }
            }}
          >
            Agregar Admin
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if(showQuotaManagement === false){
                setShowUserList(false);
                setShowQuotaManagement(true);
              }
              else{
                setShowUserList(false);
                setShowQuotaManagement(false);
              }
            }}
          >
            Cambiar Cuota
          </Button>
          <Button variant="contained" onClick={handleOpenC}>
            Total Cuota
          </Button>
          </div>
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
      {showUserList && <UserList />}
      {showQuotaManagement && <QuotaManagement />}
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
            <Dialog open={openC} onClose={handleCloseC} maxWidth="md" fullWidth>
              <DialogTitle>Datos de la API</DialogTitle>
                <DialogContent>
              <ApiCallComponent />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card> 
    </div>
  );
}