import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    IconButton,
    Paper,
    Container,
    Grid,
    Card,
    InputAdornment,
    Fade,
    CircularProgress,
    Divider,
    Chip
} from '@mui/material';
import {
    PhotoCamera,
    Person,
    Email,
    Phone,
    Save,
    Edit,
    AccountCircle,
    Cancel
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Profile({ user, token, setUser }) {
    const [userinfo, setUserinfo] = useState({
        name: '',
        email: '',
        phone: '',
        profile: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUserinfo(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            }));

            if (user.profile) {
                setPreviewImage(`http://localhost:7000/uploads/product/${user.profile}`);
            } else {
                setPreviewImage(null);
            }
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserinfo(prev => ({ ...prev, profile: file }));

            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        setUserinfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const userData = new FormData();
        userData.append("name", userinfo.name);
        userData.append("email", userinfo.email);
        userData.append("phone", userinfo.phone);
        if (userinfo.profile) {
            userData.append("profile", userinfo.profile);
        }

        try {
            const res = await axios.put(
                "http://localhost:7000/user/updateprofile",
                userData,
                { headers: { "auth-token": token } }
            );

            if (res.data.success) {
                setUser(res.data.user);
                toast.success(res.data.message);
                navigate("/");
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Fade in timeout={1000}>
                <Box>
                    {/* Header */}
                    <Card
                        elevation={0}
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            borderRadius: '20px 20px 0 0',
                            textAlign: 'center',
                            py: 4
                        }}
                    >
                        <Edit sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Edit Profile
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            Keep your information up to date
                        </Typography>
                    </Card>

                    {/* Main Content */}
                    <Paper
                        elevation={8}
                        sx={{
                            borderRadius: '0 0 20px 20px',
                            p: 4,
                            mt: -1,
                            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)'
                        }}
                    >
                        {/* Profile Picture */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 4,
                            mt: -6
                        }}>
                            <Box sx={{ position: 'relative', mb: 2 }}>
                                <Avatar
                                    src={previewImage}
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        border: '4px solid white',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                        background: 'linear-gradient(135deg, #667eea, #764ba2)'
                                    }}
                                >
                                    {!previewImage && <AccountCircle sx={{ fontSize: 80, color: '#fff' }} />}
                                </Avatar>

                                <input
                                    accept="image/*"
                                    id="profile-upload"
                                    type="file"
                                    hidden
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="profile-upload">
                                    <IconButton
                                        component="span"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            backgroundColor: 'white',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            border: '3px solid white',
                                            width: 40,
                                            height: 40,
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                transform: 'scale(1.1)',
                                            },
                                            transition: 'all 0.2s ease-in-out'
                                        }}
                                    >
                                        <PhotoCamera fontSize="small" />
                                    </IconButton>
                                </label>
                            </Box>

                            <Chip
                                label="Upload new photo"
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderColor: 'primary.main',
                                    color: 'primary.main'
                                }}
                            />
                        </Box>

                        <Divider sx={{ mb: 4 }}>
                            <Chip label="Personal Information" size="small" />
                        </Divider>

                        {/* Form Fields */}
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    value={userinfo.name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            backgroundColor: 'rgba(255,255,255,0.8)',
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                                borderWidth: 2,
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'primary.main',
                                                borderWidth: 2,
                                            }
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={userinfo.email}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            backgroundColor: 'rgba(255,255,255,0.8)',
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                                borderWidth: 2,
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'primary.main',
                                                borderWidth: 2,
                                            }
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    value={userinfo.phone}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Phone color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            backgroundColor: 'rgba(255,255,255,0.8)',
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                                borderWidth: 2,
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'primary.main',
                                                borderWidth: 2,
                                            }
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Action Buttons */}
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    gap: 2,
                                    flexDirection: { xs: 'column', sm: 'row' }
                                }}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => navigate("/")}
                                        startIcon={<Cancel />}
                                        sx={{
                                            borderRadius: 3,
                                            py: 1.5,
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            borderWidth: 2,
                                            '&:hover': {
                                                borderWidth: 2,
                                                backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                            }
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                                        sx={{
                                            borderRadius: 3,
                                            py: 1.5,
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                                boxShadow: '0 12px 28px rgba(102, 126, 234, 0.5)',
                                                transform: 'translateY(-2px)',
                                            },
                                            '&:disabled': {
                                                background: 'linear-gradient(135deg, #ccc 0%, #999 100%)',
                                            },
                                            transition: 'all 0.3s ease-in-out'
                                        }}
                                    >
                                        {loading ? 'Updating Profile...' : 'Update Profile'}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Fade>
        </Container>
    );
}
