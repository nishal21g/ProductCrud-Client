import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import InsertProduct from './Pages/Insertproduct';
import Product from './Pages/Product';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import UpdateProduct from './Pages/UpdateProduct';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import axios from 'axios';
import BrowseProducts from './Pages/BrowseProducts';
import ProductDetails from './Pages/ProductDetails';
import Profile from './Pages/profile';
import About from './Pages/about';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // 🌗 Toggle state
  const token = localStorage.getItem('authToken') || null;

  const getuserprofile = () => {
    axios
      .get('https://productcrud-server-ex42.onrender.com/user/getprofile', {
        headers: { 'auth-token': token },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      getuserprofile();
    }
  }, [token]);

  // 🌈 Create dynamic MUI theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Router>
          <Navbar user={user} setUser={setUser} token={token} darkMode={darkMode} setDarkMode={setDarkMode} />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/insert" element={<InsertProduct setProducts={setProducts} token={token} />} />
              <Route path="/products" element={<Product products={products} token={token} />} />
              <Route path="/browse" element={<BrowseProducts products={products} token={token} />} />
              <Route path="/update-product/:id" element={<UpdateProduct token={token} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage setUser={setUser} />} />
              <Route path="/view/:id" element={<ProductDetails token={token} />} />
              <Route path="/profile" element={<Profile setUser={setUser} user={user} token={token} />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </Router>
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
