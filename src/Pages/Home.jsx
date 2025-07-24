import React, { useState, useEffect } from "react";
import {
  ThemeProvider, createTheme, Box, Grid, Typography, Container, Card, CardContent,
  Button, Avatar, Stack, Chip, TextField, InputAdornment, Grow, Fade, Snackbar, Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LockIcon from "@mui/icons-material/Lock";
import StarIcon from "@mui/icons-material/Star";
import GroupsIcon from "@mui/icons-material/Groups";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import SecurityIcon from "@mui/icons-material/Security";
import SendIcon from "@mui/icons-material/Send";

const theme = createTheme({
  palette: {
    primary: { main: "#7e57c2" },
    secondary: { main: "#ffb74d" },
    background: { default: "#f6f9fc" },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h1: { fontWeight: 900, letterSpacing: -2 },
    h4: { fontWeight: 700, letterSpacing: -1 },
    h5: { fontWeight: 700 },
  }
});

const features = [
  {
    icon: <ShoppingCartIcon color="primary" sx={{ fontSize: 50 }} />,
    title: "Wide Range",
    description: "Choose from 10,000+ daily essentials and premium groceries.",
  },
  {
    icon: <BoltIcon color="secondary" sx={{ fontSize: 50 }} />,
    title: "Lightning Fast",
    description: "Same-day delivery. Get your items in 2-4 hours.",
  },
  {
    icon: <AttachMoneyIcon sx={{ color: "#35baf6", fontSize: 50 }} />,
    title: "Best Prices",
    description: "Price match guarantee; exclusive member discounts up to 30%.",
  },
  {
    icon: <LockIcon sx={{ color: "#66bb6a", fontSize: 50 }} />,
    title: "Secure & Safe",
    description: "256-bit SSL encryption and contactless delivery options.",
  },
];

const stats = [
  { label: "Happy Customers", number: "50K+", icon: <GroupsIcon color="primary" /> },
  { label: "Products", number: "10K+", icon: <WarehouseIcon color="secondary" /> },
  { label: "Support", number: "24/7", icon: <HeadsetMicIcon color="primary" /> },
  { label: "Uptime", number: "99.9%", icon: <SecurityIcon color="secondary" /> },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubscribe = () => {
    if (!email.includes('@') || !email.includes('.')) {
      setSnack({ open: true, message: "Please enter a valid email.", severity: 'error' });
      return;
    }
    setSnack({ open: true, message: "Subscribed successfully!", severity: 'success' });
    setEmail('');
    // Add API call logic here if needed
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ background: "linear-gradient(135deg, #4834d4 10%, #6dd5ed 100%)", minHeight: "100vh" }}>
        {/* Hero Section */}
        <Container sx={{ py: 12, textAlign: "center", color: "#fff" }}>
          <Fade in={isVisible} timeout={900}>
            <Box>
              <Chip
                icon={<StarIcon />}
                label="Grand Opening - 20% OFF"
                color="secondary"
                sx={{ mb: 2, fontWeight: "bold", px: 2, py: 1 }}
              />
              <Typography variant="h1">Minimart</Typography>
              <Typography variant="h4" sx={{ opacity: 0.85, mb: 3 }}>
                Your Premium Grocery Experience
              </Typography>
              <Typography sx={{ mb: 5, maxWidth: 600, mx: "auto", opacity: 0.8 }}>
                Discover thousands of premium products, enjoy lightning-fast delivery,
                and experience grocery shopping like never before.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  endIcon={<ShoppingCartIcon />}
                  onClick={() => navigate('/browse')}
                >
                  Shop
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ color: "#fff", borderColor: "#fff" }}
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Container>

        {/* Stats Section */}
        <Container sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {stats.map((stat, i) => (
              <Grow in={isVisible} timeout={600 + i * 300} key={stat.label}>
                <Grid item xs={6} md={3}>
                  <Card elevation={8} sx={{ textAlign: "center", p: 3, borderRadius: 5 }}>
                    <Box>{stat.icon}</Box>
                    <Typography variant="h3">{stat.number}</Typography>
                    <Typography sx={{ opacity: 0.7 }}>{stat.label}</Typography>
                  </Card>
                </Grid>
              </Grow>
            ))}
          </Grid>
        </Container>

        {/* Features Section */}
        <Box sx={{ py: 10, background: "linear-gradient(90deg, #fff 60%, #f6f9fc 100%)" }}>
          <Container>
            <Typography variant="h2" textAlign="center" sx={{ fontWeight: 900, mb: 6, color: "#2d3436" }}>
              Why Choose Minimart?
            </Typography>
            <Grid container spacing={5}>
              {features.map((feature, idx) => (
                <Grow in={isVisible} timeout={1000 + idx * 200} key={feature.title}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={4} sx={{ borderRadius: 5, textAlign: "center", p: 3, height: "100%" }}>
                      <Avatar sx={{ width: 64, height: 64, mb: 2, mx: "auto", bgcolor: "background.paper" }}>
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h5" sx={{ mb: 2, color: "primary.dark" }}>{feature.title}</Typography>
                      <Typography sx={{ color: "#666" }}>{feature.description}</Typography>
                    </Card>
                  </Grid>
                </Grow>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* About Section */}
        <Box sx={{ py: 10, background: "linear-gradient(90deg, #7e57c2 20%, #5c6bc0 100%)", color: "#fff" }}>
          <Container>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h3" sx={{ mb: 2, fontWeight: 900 }}>Who We Are</Typography>
                <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                  Minimart is revolutionizing grocery shopping. We're not just a store— we're your trusted partner in modern living.
                </Typography>
                <Typography sx={{ mb: 3, opacity: 0.8 }}>
                  Founded with a mission to make quality groceries accessible to everyone, we combine cutting-edge technology with traditional values of quality and service.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Chip label="Quality Guaranteed" color="secondary" icon={<StarIcon />} />
                  <Chip label="Premium Service" color="default" icon={<StarIcon />} />
                  <Chip label="Innovation First" color="primary" icon={<BoltIcon />} />
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <Card elevation={8} sx={{ p: 4, borderRadius: 5, textAlign: "center", bgcolor: "#fff", color: "#333" }}>
                  <Avatar sx={{ width: 70, height: 70, bgcolor: "secondary.main", mx: "auto", mb: 2 }}>
                    <ShoppingCartIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Join Our Community</Typography>
                  <Typography sx={{ mb: 3, opacity: 0.8 }}>
                    Be part of thousands of satisfied customers who trust Minimart.
                  </Typography>
                  <Button variant="contained" size="large" color="primary" fullWidth onClick={() => navigate('/register')}>
                    Get Started Today
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Newsletter Section */}
        <Box sx={{ py: 10, background: "linear-gradient(90deg,#ffe082 0%,#ffb74d 100%)" }}>
          <Container>
            <Box textAlign="center">
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#444", mb: 1 }}>
                Stay Updated! 📬
              </Typography>
              <Typography sx={{ fontSize: 18, color: "#713", mb: 4 }}>
                Get exclusive deals, new product alerts, and grocery tips delivered to your inbox.
              </Typography>
              <Box sx={{ maxWidth: 400, mx: "auto" }}>
                <TextField
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  variant="outlined"
                  InputProps={{
                    sx: { bgcolor: "#fff", borderRadius: 3 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button variant="contained" color="secondary" endIcon={<SendIcon />} onClick={handleSubscribe}>
                          Subscribe
                        </Button>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </Box>
          </Container>
        </Box>

        <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
          <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: '100%' }}>
            {snack.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
