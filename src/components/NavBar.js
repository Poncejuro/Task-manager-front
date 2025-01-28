import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import {logout} from '../redux/store'
import { useDispatch } from 'react-redux';  
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {

    const dispatch = useDispatch();  
    const navigate = useNavigate();  
  
    const handleLogout = () => {
      dispatch(logout()); 
      navigate('/'); 
    };


  return (
    <AppBar position="static" color="primary" sx={{ marginBottom: 2 }}>
      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Menu example
        </Typography>

        <Button color="inherit" onClick={handleLogout}>LogOut</Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
