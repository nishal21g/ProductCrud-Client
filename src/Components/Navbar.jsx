import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Chip,
  Fade,
  Slide,
  alpha,
  useScrollTrigger,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Add,
  Store,
  Inventory,
  Info,
  Person,
  Logout,
  Login,
  ShoppingCart,
  Close,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Brightness4, Brightness7 } from '@mui/icons-material';


// Scroll-triggered app bar elevation
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 8 : 2,
  });
}

export default function Navbar({ user, setUser, token, darkMode, setDarkMode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    toast.success("Successfully logged out", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/login");
    handleMenuClose();
  };

  const authuser = () => {
    if (pathname !== "/login" && pathname !== "/register" && pathname !== "/") {
      if (!token || !user) {
        toast.error("Please login to continue");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    authuser();
  }, [pathname, token]);

  if (pathname === "/login" || pathname === "/register") return null;

  const navLinks = [
    { label: 'Home', to: '/', icon: <Home /> },
    { label: 'Insert Product', to: '/insert', icon: <Add /> },
    { label: 'Products', to: '/browse', icon: <Store /> },
    { label: 'My Products', to: '/products', icon: <Inventory /> },
    { label: 'About Us', to: '/about', icon: <Info /> },
  ];

  return (
    <>
      <ElevationScroll>
        <AppBar
          position="sticky"
          sx={{
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #121212 0%, #1c1c1c 100%)'  // dark gradient
             : 'linear-gradient(135deg, #2196f3 0%, #1e88e5 100%)', // light/orange gradient
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
            transition: 'all 0.3s ease-in-out',
          }}
        >


          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              minHeight: { xs: 64, sm: 70 },
              px: { xs: 2, sm: 3 },
            }}
          >
            {/* Left: Enhanced Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => navigate('/')}
            >
              <Box
                sx={{
                  width: 45,
                  height: 45,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, 
                    ${alpha(theme.palette.common.white, 0.2)}, 
                    ${alpha(theme.palette.common.white, 0.1)})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                }}
              >
                <ShoppingCart sx={{ color: 'white', fontSize: 24 }} />
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    background: `linear-gradient(45deg, 
                      ${theme.palette.common.white}, 
                      ${alpha(theme.palette.common.white, 0.8)})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    letterSpacing: '-0.02em',
                  }}
                >
                  MiniMart
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: alpha(theme.palette.common.white, 0.7),
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Your Digital Store
                </Typography>
              </Box>
            </Box>

            {/* Right: Navigation */}
            {isMobile ? (
              <>
                {user && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>

                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        border: `2px solid ${alpha(theme.palette.common.white, 0.3)}`,
                      }}
                      src={user.profile ? `https://productcrud-server-ex42.onrender.com/uploads/product/${user.profile}` : undefined}
                    >
                      {user.name?.[0]?.toUpperCase()}
                    </Avatar>
                  </Box>
                )}

                <IconButton
                  color="inherit"
                  onClick={() => setDrawerOpen(true)}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(90deg)',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>

                {/* Enhanced Mobile Drawer */}
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                  PaperProps={{
                    sx: {
                      width: 280,
                      background: `linear-gradient(135deg, 
                        ${theme.palette.background.paper} 0%, 
                        ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                      backdropFilter: 'blur(10px)',
                    },
                  }}
                >
                  <Box sx={{ width: 280 }} role="presentation">
                    {/* Drawer Header */}
                    <Box
                      sx={{
                        p: 3,
                        background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main}, 
                          ${theme.palette.primary.dark})`,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ShoppingCart sx={{ mr: 2 }} />
                        <Typography variant="h6" fontWeight="bold">
                          MiniMart
                        </Typography>
                      </Box>

                      <IconButton
                        color="inherit"
                        onClick={() => setDrawerOpen(false)}
                        size="small"
                      >
                        <Close />
                      </IconButton>
                    </Box>

                    {/* User Info Section */}
                    {user && (
                      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            sx={{
                              width: 50,
                              height: 50,
                              mr: 2,
                              border: `2px solid ${theme.palette.primary.main}`,
                            }}
                            src={user.profile ? `https://productcrud-server-ex42.onrender.com/uploads/product/${user.profile}` : undefined}
                          >
                            {user.name?.[0]?.toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="600">
                              {user.name}
                            </Typography>
                            <Chip
                              label="Active User"
                              size="small"
                              color="success"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}

                    {/* Navigation Links */}
                    <List sx={{ pt: 2 }}>
                      {navLinks.map((link) => (
                        <ListItem
                          key={link.label}
                          component={Link}
                          to={link.to}
                          onClick={() => setDrawerOpen(false)}
                          sx={{
                            borderRadius: '8px',
                            mx: 1,
                            mb: 0.5,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.08),
                              transform: 'translateX(8px)',
                            },
                            ...(pathname === link.to && {
                              backgroundColor: alpha(theme.palette.primary.main, 0.12),
                              color: theme.palette.primary.main,
                            }),
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                            {link.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={link.label}
                            primaryTypographyProps={{ fontWeight: 500 }}
                          />
                        </ListItem>
                      ))}

                      {user ? (
                        <>
                          <ListItem
                            onClick={() => { setDrawerOpen(false); navigate("/profile"); }}
                            sx={{
                              borderRadius: '8px',
                              mx: 1,
                              mb: 0.5,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                transform: 'translateX(8px)',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <Person />
                            </ListItemIcon>
                            <ListItemText primary="Profile" primaryTypographyProps={{ fontWeight: 500 }} />
                          </ListItem>

                          <ListItem
                            onClick={handleLogout}
                            sx={{
                              borderRadius: '8px',
                              mx: 1,
                              mb: 0.5,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.error.main, 0.08),
                                color: theme.palette.error.main,
                                transform: 'translateX(8px)',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                              <Logout />
                            </ListItemIcon>
                            <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500 }} />
                          </ListItem>
                        </>
                      ) : (
                        <ListItem
                          component={Link}
                          to="/login"
                          onClick={() => setDrawerOpen(false)}
                          sx={{
                            borderRadius: '8px',
                            mx: 1,
                            mb: 0.5,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.08),
                              transform: 'translateX(8px)',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Login />
                          </ListItemIcon>
                          <ListItemText primary="Login" primaryTypographyProps={{ fontWeight: 500 }} />
                        </ListItem>
                      )}
                    </List>
                    {/* Dark Mode Toggle */}
                    <Box sx={{ px: 2, pt: 2 }}>
                      <Button
                        fullWidth
                        onClick={() => setDarkMode((prev) => !prev)}
                        startIcon={darkMode ? <Brightness7 /> : <Brightness4 />}
                        variant="outlined"
                        sx={{
                          borderRadius: '12px',
                          fontWeight: 600,
                          textTransform: 'none',
                          borderColor: alpha(theme.palette.text.primary, 0.3),
                          color: theme.palette.text.primary,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          },
                        }}
                      >
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                      </Button>
                    </Box>

                  </Box>
                </Drawer>
              </>
            ) : (
              // Desktop Navigation
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <Button
                    key={link.label}
                    color="inherit"
                    component={Link}
                    to={link.to}
                    startIcon={link.icon}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: '12px',
                      fontWeight: 500,
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.common.white, 0.1),
                        transform: 'translateY(-2px)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                      ...(pathname === link.to && {
                        backgroundColor: alpha(theme.palette.common.white, 0.15),
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '60%',
                          height: '2px',
                          backgroundColor: theme.palette.common.white,
                          borderRadius: '2px',
                        },
                      }),
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
                <Button
                  onClick={() => setDarkMode((prev) => !prev)}
                  color="inherit"
                  startIcon={darkMode ? <Brightness7 /> : <Brightness4 />}
                  sx={{
                    borderRadius: '8px',
                    fontWeight: 500,
                    textTransform: 'none',
                    ml: 2,
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: (theme) => theme.palette.divider,
                    '&:hover': {
                      backgroundColor: (theme) =>
                        darkMode ? theme.palette.grey[800] : theme.palette.grey[200],
                    },
                  }}
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>

                {user ? (
                  <>

                    {/* User Menu */}
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                      <Fade in timeout={500}>
                        <Chip
                          label={`Hi, ${user.name}`}
                          onClick={handleMenuOpen}
                          avatar={
                            <Avatar
                              src={user.profile ? `https://productcrud-server-ex42.onrender.com/uploads/product/${user.profile}` : undefined}
                              sx={{ width: 28, height: 28 }}
                            >
                              {user.name?.[0]?.toUpperCase()}
                            </Avatar>
                          }
                          sx={{
                            backgroundColor: alpha(theme.palette.common.white, 0.15),
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.common.white, 0.25),
                              transform: 'scale(1.05)',
                            },
                          }}
                        />
                      </Fade>

                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                          sx: {
                            mt: 1,
                            borderRadius: '12px',
                            minWidth: 200,
                            boxShadow: theme.shadows[8],
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem
                          onClick={() => { handleMenuClose(); navigate("/profile"); }}
                          sx={{
                            py: 1.5,
                            px: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            },
                          }}
                        >
                          <Person sx={{ mr: 2, color: 'text.secondary' }} />
                          Profile
                        </MenuItem>
                        <MenuItem
                          onClick={handleLogout}
                          sx={{
                            py: 1.5,
                            px: 2,
                            color: 'error.main',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.error.main, 0.08),
                            },
                          }}
                        >
                          <Logout sx={{ mr: 2 }} />
                          Logout
                        </MenuItem>
                      </Menu>
                    </Box>
                  </>
                ) : (
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    startIcon={<Login />}
                    variant="outlined"
                    sx={{
                      ml: 2,
                      borderColor: alpha(theme.palette.common.white, 0.5),
                      borderRadius: '12px',
                      fontWeight: 600,
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: theme.palette.common.white,
                        backgroundColor: alpha(theme.palette.common.white, 0.1),
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
}