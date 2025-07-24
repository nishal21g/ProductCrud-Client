// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Container, TextField, Typography, Button, Box, Link, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = ( { setUser }) => {
const [forminfo, setForminfo] = useState({  email:"", password:""})
const handleSubmit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:7000/user/login" , forminfo)
  .then((res) => {
    if(res.data.message) {
     toast.success(res.data.message);
    setUser(res.data.user)
    localStorage.setItem("authToken", res.data.token);
    navigate("/");
    }  else {
  toast.error(res.data.message);
  setUser(null);
  }
  })
  .catch((error) => {
    console.log(error);
  })
  // console.log(forminfo)
}
  const navigate = useNavigate();

  return (
   <Container maxWidth="sm" sx={{ mt: { xs: 4, md: 8 }, px: { xs: 2, md: 0 } }}>
      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
<Typography variant="h4" fontSize={{ xs: '1.5rem', md: '2rem' }}>
          Login to Your Account
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
        onChange={(e) => setForminfo({ ...forminfo, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={(e) => setForminfo({ ...forminfo, password: e.target.value })}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
          onClick={handleSubmit}
        >
          Login
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <Link onClick={() => navigate('/register')} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
            Register here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;
