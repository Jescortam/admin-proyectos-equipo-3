import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../../Auth";
import { getAuth, signOut } from "firebase/auth";

import { AppBar, Tooltip, MenuItem, Avatar, Box, Toolbar, IconButton, Typography, Container, Menu, Button, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import CoffeeIcon from '@mui/icons-material/Coffee'
import { ShoppingCart } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

function Header(props) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { handleDrawerToggle } = props;

  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const renderAuthButtons = () => {
    if (currentUser) {
      return (
        [
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography
              textAlign="center"
              onClick={() => { signOut(auth) }}>
              Sign out
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
            href="/signup">
            Sign up
          </Typography>
        </MenuItem>,
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            textAlign="center"
            component="a"
            href="/login">
            Log in
          </Typography>
        </MenuItem>
      ]
    )
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: 1400 }}>
      <Container maxWidth="100%" sx={{ marginLeft: 0, display: "flex", height: "70px", alignItems: "center", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
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
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
        </Box>

        <Box sx={{ flexGrow: 0 }} display="flex" justifyContent="center" alignItems="center" >
          <Box component="a" href="/shopping-cart" mr={2}>
            <Badge badgeContent={1} color="secondary">
              <ShoppingCart fontSize="large" sx={{ color: blue[50] }} />
            </Badge>
          </Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
    </AppBar>
  );
}
export default Header;