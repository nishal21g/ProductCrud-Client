import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText,
  Paper,
  Container,
  Grid,
  Fade,
  Slide,
  IconButton,
  Divider,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import {
  ProductionQuantityLimits,
  AttachMoney,
  Category,
  Description,
  CloudUpload,
  Refresh,
  Save,
  AddCircleOutline,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';

// Styled components for enhanced visual appeal
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(3),
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5),
    transition: 'all 0.3s ease',
    backgroundColor: '#fafbff',
    '&:hover': {
      backgroundColor: '#f0f4ff',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.25)',
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    color: '#5a67d8',
  },
}));

const StyledSelect = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5),
    transition: 'all 0.3s ease',
    backgroundColor: '#fafbff',
    '&:hover': {
      backgroundColor: '#f0f4ff',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.25)',
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    color: '#5a67d8',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
  },
}));

const SubmitButton = styled(ActionButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
  },
}));

const ResetButton = styled(ActionButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
  color: '#2d3436',
  border: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 35px rgba(255, 234, 167, 0.4)',
  },
}));

export default function InsertProduct({ setProducts, token }) {
  const [form, setForm] = useState({ name: '', price: '', picture: null, category: '', description: '' });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Product name is required";
    if (!form.price.trim()) tempErrors.price = "Price is required";
    if (!form.category) tempErrors.category = "Please select a category";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    const data = new FormData();
    data.append('name', form.name);
    data.append('price', form.price);
    data.append('picture', form.picture);
    data.append('category', form.category);
    data.append('description', form.description);
    
    try {
      const res = await axios.post('http://localhost:7000/product/insert', data, {
        headers: { "auth-token": token }
      });
      
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while submitting the form");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', price: '', picture: null, category: '', description: '' });
    setErrors({});
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={800}>
        <StyledPaper elevation={0}>
          <Slide direction="up" in timeout={600}>
            <FormContainer elevation={0}>
              {/* Header Section */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'inline-flex',
                    }}
                  >
                    <AddCircleOutline sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 1,
                  }}
                >
                  Add New Product
                </Typography>
                <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1.1rem' }}>
                  Fill in the details below to add a new product to your inventory
                </Typography>
              </Box>

              <Divider sx={{ mb: 4, bgcolor: '#e2e8f0' }} />

              {/* Form Section */}
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      fullWidth
                      label="Product Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ProductionQuantityLimits sx={{ color: '#667eea' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      fullWidth
                      label="Price"
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      error={!!errors.price}
                      helperText={errors.price}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoney sx={{ color: '#667eea' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CloudUpload sx={{ color: '#667eea', mr: 1 }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#5a67d8' }}>
                            Product Image
                          </Typography>
                        </Box>
                        <StyledTextField
                          fullWidth
                          type="file"
                          InputLabelProps={{ shrink: true }}
                          onChange={(e) => {
                            setForm({ ...form, picture: e.target.files[0] });
                          }}
                          inputProps={{ accept: "image/*" }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <StyledSelect fullWidth error={!!errors.category}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        label="Category"
                        startAdornment={
                          <InputAdornment position="start">
                            <Category sx={{ color: '#667eea', ml: 1 }} />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="">
                          <em style={{ color: '#94a3b8' }}>Select Category</em>
                        </MenuItem>
                        {categories.map((cat) => (
                          <MenuItem key={cat.slug || cat.name} value={cat.name || cat}>
                            {typeof cat === 'string' 
                              ? cat.charAt(0).toUpperCase() + cat.slice(1)
                              : cat.name?.charAt(0).toUpperCase() + cat.name?.slice(1)
                            }
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.category}</FormHelperText>
                    </StyledSelect>
                  </Grid>

                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Description (optional)"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                            <Description sx={{ color: '#667eea' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Action Buttons */}
                <Box sx={{ mt: 4, display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <SubmitButton
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    startIcon={<Save />}
                    sx={{ minWidth: 180 }}
                  >
                    {isLoading ? 'Adding Product...' : 'Add Product'}
                  </SubmitButton>
                  
                  <ResetButton
                    type="button"
                    variant="outlined"
                    size="large"
                    onClick={handleReset}
                    startIcon={<Refresh />}
                    sx={{ minWidth: 140 }}
                  >
                    Reset Form
                  </ResetButton>
                </Box>
              </form>
            </FormContainer>
          </Slide>
        </StyledPaper>
      </Fade>
    </Container>
  );
}