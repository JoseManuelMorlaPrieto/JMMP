import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ mb: 4, backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "'Pacifico', cursive", // Tipografía llamativa
            cursor: 'pointer',
          }}
          onClick={() => navigate('/dashboard')}
        >
          JMMP
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose(null)}
          >
            <MenuItem onClick={() => handleClose('/dashboard')}>Dashboard</MenuItem>
            <MenuItem onClick={() => handleClose('/otra')}>Otra Página</MenuItem>
            {/* Añade más enlaces si los necesitas */}
          </Menu>
        </Box>


      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
