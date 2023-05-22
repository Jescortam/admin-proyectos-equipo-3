import React, { useContext } from 'react';

import { AuthContext } from "../../Auth";
import { getAuth, signOut } from "firebase/auth";

import { AppBar, Tooltip, MenuItem, Avatar, Box, IconButton, Typography, Container, Menu, Button, Badge, Snackbar, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import CoffeeIcon from '@mui/icons-material/Coffee'
import { ShoppingCart } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router';

const pages = [
  { name: 'MENU', location: '/' },
  { name: 'ORDENES', location: '/orders' }
]

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = () => {
    signOut(auth)
    setOpen(true)
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const renderNavButtons = () => {
    return pages.map((page) => (
      <Button
        key={page.name}
        onClick={() => {
          handleCloseNavMenu()
          navigate(page.location)
        }}
        sx={{ my: 2, color: 'white', display: 'block', fontSize: '1.1rem' }}
      >
        {page.name}
      </Button>
    ))
  }

  const renderNavMenu = () => {
    return pages.map((page) => (
      <MenuItem key={page.name} onClick={() => {
        handleCloseNavMenu()
        navigate(page.location)
      }}>
        <Typography textAlign="center">{page.name}</Typography>
      </MenuItem>
    ))
  }

  const renderAuthButtons = () => {
    if (currentUser) {
      return (
        [
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography
              textAlign="center"
              onClick={handleSignOut}>
              Cerrar sesión
            </Typography>
          </MenuItem>
        ]
      )
    }

    return (
      [
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            textAlign="center"
            component="a"
            href="/signup"
            sx={{ textDecoration: 'none', color: 'black' }}>
            Crear cuenta
          </Typography>
        </MenuItem>,
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            textAlign="center"
            component="a"
            href="/login"
            sx={{ textDecoration: 'none', color: 'black' }}>
            Iniciar sesión
          </Typography>
        </MenuItem>
      ]
    )
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: 1400 }}>
      <Container maxWidth="100%" sx={{ marginLeft: 0, display: "flex", height: "70px", alignItems: "center", justifyContent: "space-between" }}>
        <CoffeeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Georgia',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Mama Poule
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {renderNavMenu()}
          </Menu>
        </Box>
        <CoffeeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'Georgia',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Mama Poule
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {renderNavButtons()}
        </Box>

        <Box sx={{ flexGrow: 0 }} display="flex" justifyContent="center" alignItems="center" >
          <Box component="a" href="/shopping-cart" mr={2}>
            <ShoppingCart fontSize="large" sx={{ color: blue[50] }} />
          </Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="user icon" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {renderAuthButtons()}
          </Menu>
        </Box>
      </Container>
      <Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleCloseAlert} >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Cierre de sesión exitoso.
        </Alert>
      </Snackbar >
    </AppBar>
  );
}
export default Header;