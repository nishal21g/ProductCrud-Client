import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ProductDetails({ token }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://productcrud-server-ex42.onrender.com/product/view-product-details/${id}`, {
        headers: {
          'auth-token': token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to fetch product');
        setLoading(false);
      });
  }, [id, token]);

  useEffect(() => {
    if (product?.category) {
      axios
        .get(`https://productcrud-server-ex42.onrender.com/product/similar/${product.category}?excludeId=${product._id}`, {
          headers: { 'auth-token': token },
        })
        .then((res) => {
          if (res.data.success) {
            setSimilarProducts(res.data.products);
          }
        })
        .catch((err) => {
          console.error("Error fetching similar products", err);
        });
    }
  }, [product?.category, product?._id, token]);

  // Scroll to top after product is loaded
  useEffect(() => {
    if (product) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        Product not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        p: 3,
        boxSizing: 'border-box',
        ml: { xs: 0, md: 5 }
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={`https://productcrud-server-ex42.onrender.com/uploads/product/${product.picture}`}
              alt={product.name}
              sx={{
                width: '100%',
                height: 350,
                objectFit: 'contain',
                backgroundColor: '#f8f8f8',
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>{product.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Category: {product.category}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              ₹{product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Posted {moment(product.createdAt).fromNow()}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Seller Info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2,
                p: 2,
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: '#fff',
                maxWidth: { xs: '100%', sm: 400 }
              }}
            >
              {/* Avatar + Name */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  alt={product?.userId?.name}
                  src={`https://productcrud-server-ex42.onrender.com/uploads/product/${product?.userId?.profile}`}
                  sx={{ width: 50, height: 50, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {product?.userId?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Seller
                  </Typography>
                </Box>
              </Box>

              {/* Call Button */}
              <Box
                component="a"
                href={`tel:${product?.userId?.phone}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  textDecoration: 'none',
                  ml: 3,
                  transition: 'background 0.3s',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                <PhoneIcon sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {product?.userId?.phone}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>{similarProducts.length > 0 && (
          <Box sx={{ mt: 6, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Similar Products
            </Typography>
            <Grid container spacing={3}>
              {similarProducts.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item._id}>
                  <Link
                    to={`/view/${item._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 1,
                        backgroundColor: '#fafafa',
                        height: '100%',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.03)',
                          boxShadow: 3,
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={`https://productcrud-server-ex42.onrender.com/uploads/product/${item.picture}`}
                        alt={item.name}
                        sx={{ width: '100%', height: 150, objectFit: 'contain' }}
                      />
                      <Typography variant="subtitle1" fontWeight={600} mt={1}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{item.price}
                      </Typography>
                    </Box>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

      </Box>
    </Box>
  );
}
