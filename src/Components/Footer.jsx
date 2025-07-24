import React from 'react';
import { Box, Typography, Grid, Link as MuiLink } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const { pathname } = useLocation();

  // Hide footer on login and register pages
  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(to right, #1976d2, #0d47a1)',
        color: 'white',
        mt: 4,
        py: 4,
        px: { xs: 2, md: 6 },
      }}
    >
      <Grid container spacing={4}>
        {/* Logo & About */}
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" mb={1}>
            <img
              src="https://img.icons8.com/color/96/000000/grocery-store.png"
              alt="logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            <Typography variant="h6" fontWeight="bold">
              MiniMart
            </Typography>
          </Box>
          <Typography variant="body2">
            Your one-stop shop for daily needs. We bring quality and convenience to your doorstep.
          </Typography>
        </Grid>

        {/* Navigation Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Quick Links
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <MuiLink href="/" color="inherit" underline="hover">Home</MuiLink>
            <MuiLink href="/browse" color="inherit" underline="hover">Browse Products</MuiLink>
            <MuiLink href="/products" color="inherit" underline="hover">My Products</MuiLink>
            <MuiLink href="/about" color="inherit" underline="hover">About</MuiLink>
          </Box>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Contact Us
          </Typography>
          <Typography variant="body2">Email: support@minimart.com</Typography>
          <Typography variant="body2">Phone: +91 98765 43210</Typography>
          <Typography variant="body2">Location: Bengaluru, India</Typography>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="white">
          &copy; {new Date().getFullYear()} MiniMart. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
