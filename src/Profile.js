import React, { useState } from 'react'; // Imported React and useState
import PropTypes from 'prop-types'; // Imported PropTypes
import LinearProgress from '@mui/material/LinearProgress'; // Imported LinearProgress
import { makeStyles } from '@mui/styles';
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, Card, CardContent } from '@mui/material';
import AppBar from '@mui/material/AppBar'; // Added AppBar import
import Toolbar from '@mui/material/Toolbar'; // Added Toolbar import
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";

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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
          <div>
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
          </div>
        </Toolbar>
      </AppBar>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Avatar src={"https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Image-Transparent.png"} className={classes.large} />
          <Typography variant="h5">
            Welcome Manuel Alberto
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant='h5'>
            Cuota
          </Typography>
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
