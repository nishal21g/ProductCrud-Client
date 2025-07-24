import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import axios from 'axios';
import  { toast } from 'react-toastify';

export default function UpdateProduct({token}) {
  const { id } = useParams();
  // console.log(id);

  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    picture: null,
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    axios
      .get(`http://localhost:7000/product/view/${id}`,{headers:{"auth-token" : token}})
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);


  useEffect(() => {
    axios
      .get('https://dummyjson.com/products/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Failed to fetch categories:', err));
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };


  const validate = () => {
    let tempErrors = {};
    if (!product.name.trim()) tempErrors.name = 'Product name is required';
    if (!product.price.trim()) tempErrors.price = 'Price is required';
    if (!product.category) tempErrors.category = 'Please select a category';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleSubmit = () => {
    if (!validate()) return;
   const productData =  new FormData();
   productData.append("name", product?.name);
   productData.append("price", product?.price);
   productData.append("category", product?.category);
   productData.append("description", product?.description);
   if (product?.picture) {
    productData.append("picture", product?.picture);
   }
    axios
      .put(`http://localhost:7000/product/update/${id}`, productData,{headers:{"auth-token" : token}})
      .then((res) => {
        if (res.data.success) {
           toast.success(res.data.message);
          navigate('/products');
        } else {
          toast.error(res.data.message);
          console.error('Error updating product:', res.data.message);
        }
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Product
      </Typography>

      <TextField
        label="Name"
        fullWidth
        margin="dense"
        name="name"
        value={product.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        label="Price"
        fullWidth
        margin="dense"
        name="price"
        value={product.price}
        onChange={handleInputChange}
        error={!!errors.price}
        helperText={errors.price}
      />
         <TextField
                  fullWidth
                  label="Product picture"
                  type='file'
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    setProduct({ ...product, picture: e.target.files[0] });
                  }}
                  // error={!!errors.price}
                  // helperText={errors.price}
                  sx={{ mb: 2 }}
                />
     <FormControl fullWidth margin="dense" error={!!errors.category}> 
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={product.category}
          onChange={handleInputChange}
          label="Category"
        >
          <MenuItem value="">
            <em>Select Category</em>
          </MenuItem>
          {categories.map((cat, index) => (
            typeof cat === 'string' ? (
              <MenuItem key={index} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ) : (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </MenuItem>
            )
          ))}
        </Select>
        <FormHelperText>{errors.category}</FormHelperText>
      </FormControl> 
     

      <TextField
        label="Description"
        fullWidth
        margin="dense"
        name="description"
        value={product.description}
        onChange={handleInputChange}
        multiline
        rows={3}
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Update
      </Button>
    </Container>
  );
}
