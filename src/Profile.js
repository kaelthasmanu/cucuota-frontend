import * as React from 'react';
import { useState } from "react";
import {createStyles, makeStyles} from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, color} from '@mui/system';
import {Typography , TextField, FormControlLabel, Button, Grid , Link} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import {AppBar , Toolbar, Avatar, IconButton, Menu, MenuItem, Card, CardContent} from '@mui/material';

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


export default function Profile() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    //const user = JSON.parse(localStorage.getItem("user"));
    const user = localStorage.getItem("user");
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/";
    };
  
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
              Welcome {user.fname} {user.lname}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }