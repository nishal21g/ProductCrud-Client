import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  TextField,
  Button,
  Avatar,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Product({ token }) {
  const [allproducts, setAllProducts] = useState([]);
  const [state, setstate] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get('http://localhost:7000/product/view-all-products', {
        headers: { "auth-token": token }
      })
      .then((res) => {
        if (res.data.success) {
          setAllProducts(res.data.products);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state]);


  const handleDelete = (p) => {
    axios
      .delete(`http://localhost:7000/product/delete/${p?._id}`, { headers: { "auth-token": token } })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setstate(!state);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (productId) => {
    navigate(`/update-product/${productId}`);
  };


  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        My Product
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto', }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', }} colSpan={2}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allproducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No products available
                </TableCell>
              </TableRow>
            ) : (
              allproducts.map((p, index) => (
                <TableRow key={index}>
                  <TableCell><Avatar variant='square' src={`http://localhost:7000/uploads/product/${p?.picture}`} /></TableCell>
                  <TableCell>{p?.name}</TableCell>
                  <TableCell>₹{p?.price}</TableCell>
                  <TableCell>{p?.category}</TableCell>
                  <TableCell>
                    <TextField value={p?.description} fullWidth disabled multiline rows={2} />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 1,
                      }}
                    >
                      <Button
                        onClick={() => handleDelete(p)}
                        color="error"
                        variant="contained"
                        sx={{ mr: 1 }}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => handleUpdate(p?._id)}
                        color="primary"
                        variant="contained"
                      >
                        Update
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
