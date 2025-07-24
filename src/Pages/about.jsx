import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

export default function About() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: 'linear-gradient(-45deg, #00c6ff, #0072ff, #f7971e, #ffd200)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
        minHeight: '100vh',
        overflowX: 'hidden'

      }}
    >
      {/* Hero Section with Gradient Overlay */}
      <Box
        sx={{
          height: '60vh',
          width: '100%',
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.1)), url("https://images.unsplash.com/photo-1606788075761-1b9c3ecb2179?auto=format&fit=crop&w=1470&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          p: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Discover Minimart
          </Typography>
          <Typography variant="h6">
            Convenience, Quality, and Speed — All in One Place
          </Typography>
        </motion.div>
      </Box>

      {/* Main Content */}
      <Container sx={{ py: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom color="white">
            Who We Are
          </Typography>
          <Typography variant="body1" align="center" color="#f0f0f0" maxWidth={800} mx="auto">
            Minimart is your modern grocery companion. We help busy people shop smarter by offering a wide selection of daily needs at unbeatable prices, delivered straight to their doorstep with love and care.
          </Typography>
        </motion.div>

        {/* Features */}
        <Grid container spacing={4} sx={{ mt: 6 }}>
          {[
            {
              icon: '🛍️',
              title: 'Everything You Need',
              desc: 'A full catalog of groceries, household essentials, and more.',
            },
            {
              icon: '⚡',
              title: 'Lightning Fast Delivery',
              desc: 'Get your orders within hours, not days.',
            },
            {
              icon: '💸',
              title: 'Unbeatable Prices',
              desc: 'Everyday savings on the best products.',
            },
            {
              icon: '🔐',
              title: 'Safe & Secure',
              desc: 'Encrypted payments and data protection guaranteed.',
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                }}
              >
                <Typography variant="h3" mb={1}>{item.icon}</Typography>
                <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                <Typography color="text.secondary">{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
            Ready to experience hassle-free shopping?
          </Typography>
          <Typography variant="body1" color="#e0e0e0" mb={3}>
            Join thousands of happy customers who’ve switched to smarter grocery shopping.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1,
              background: 'linear-gradient(to right, #ff6e7f, #bfe9ff)',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
              },
            }}
            href="/browse"
          >
            Shop Now
          </Button>
        </Box>
      </Container>

      {/* Gradient Animation Keyframes */}
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
}
