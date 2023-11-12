import React, { useState } from 'react'; // Imported React and useState
import PropTypes from 'prop-types'; // Imported PropTypes
import LinearProgress from '@mui/material/LinearProgress'; // Imported LinearProgress
import { makeStyles } from '@mui/styles';
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, Card, CardContent } from '@mui/material';
import AppBar from '@mui/material/AppBar'; // Added AppBar import
import Toolbar from '@mui/material/Toolbar'; // Added Toolbar import
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { UseFetch } from './utils/CuotaData';

async function getCuota() {
  return fetch("http://10.34.0.100:5173/Cuota", {
    method: "GET",
    headers: {
      "accept": "text/plain",
    },
  }).then((data) => data.json());
}


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

  const { data ,pendiente } = UseFetch("http://10.34.0.100:5173/Cuota");
  const dataTotalQuota = UseFetch("http://10.34.0.100:5173/QuotaTotal");

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
    //totalQuota:obj.totalQuota,
  }));

  if (pendiente) {
    return(<p>Cargando...</p>)
  }

  const combinedResults = results.map((user) => {
    const matchingTotalQuota = results2.find((totalQuota) => totalQuota.name === user.name);
    return {
      ...user,
      totalQuota: matchingTotalQuota ? matchingTotalQuota.totalQuota : 0,
    };
  });
  const filteredResults = combinedResults.filter((result) => result.name === user);
  console.log(filteredResults)

  /*React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);*/

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
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
      <Typography variant="h5">
            Welcome Manuel Alberto 
      </Typography>
      {
       results.length===0 ? "No hay datos"
       :
      results.map((user) => {
        const megasAvailable = user.totalQuota - user.trafficD;      
        const percentageAvailable = user.totalQuota ? megasAvailable / user.totalQuota * 100 : 0;
        return(
        <Card key={user.name} className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5">{user.name}</Typography>
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
                  <Item>{user.trafficD} MB</Item>
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
                  <Item>{user.totalQuota} MB</Item>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}
    )}
    </div>
  );
}