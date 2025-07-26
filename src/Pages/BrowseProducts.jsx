import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CardActionArea,
  Container,
  Chip,
  Fade,
  Paper,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import { Search, ShoppingBag, AccessTime } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";

export default function BrowseProducts({ token }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://productcrud-server-ex42.onrender.com/product/view-others-product", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to load products");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const LoadingSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card sx={{ height: 320, borderRadius: 3 }}>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={28} width="80%" />
              <Skeleton variant="text" height={20} width="60%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Fade in timeout={800}>
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: 4,
              p: 4,
              mb: 4,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <ShoppingBag
                sx={{
                  fontSize: 40,
                  color: "primary.main",
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.02em",
                }}
              >
                Browse Products
              </Typography>
            </Box>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              Discover amazing products from our community
            </Typography>
          </Paper>
        </Fade>

        {/* Search Section */}
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              p: 3,
              mb: 4,
            }}
          >
            <TextField
              fullWidth
              type="search"
              label="Search products"
              placeholder="What are you looking for?"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                },
              }}
            />
            {searchTerm && (
              <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Showing results for:
                </Typography>
                <Chip
                  label={searchTerm}
                  size="small"
                  onDelete={() => setSearchTerm("")}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            )}
          </Paper>
        </Fade>

        {/* Products Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <Fade in timeout={1200}>
            <Grid container spacing={3}>
              {filteredProducts.length === 0 ? (
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 3,
                      p: 6,
                      textAlign: "center",
                    }}
                  >
                    <ShoppingBag
                      sx={{
                        fontSize: 80,
                        color: "text.disabled",
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      sx={{ fontWeight: 500, mb: 1 }}
                    >
                      No products found
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {searchTerm
                        ? `No results for "${searchTerm}". Try a different search term.`
                        : "No products available at the moment."}
                    </Typography>
                  </Paper>
                </Grid>
              ) : (
                filteredProducts.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                    <Fade in timeout={1400 + index * 100}>
                      <Card
                        component={Link}
                        to={`/view/${product?._id}`}
                        elevation={0}
                        sx={{
                          height: 320,
                          borderRadius: 3,
                          textDecoration: "none",
                          color: "inherit",
                          background: "rgba(255, 255, 255, 0.95)",
                          backdropFilter: "blur(10px)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          position: "relative",
                          overflow: "hidden",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                            "& .product-image": {
                              transform: "scale(1.05)",
                            },
                          },
                          "&:before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "4px",
                            background: "linear-gradient(90deg, #667eea, #764ba2)",
                            transform: "scaleX(0)",
                            transformOrigin: "left",
                            transition: "transform 0.3s ease",
                          },
                          "&:hover:before": {
                            transform: "scaleX(1)",
                          },
                        }}
                      >
                        <CardActionArea sx={{ height: "100%", p: 0 }}>
                          <Box
                            sx={{
                              position: "relative",
                              overflow: "hidden",
                              height: 200,
                              backgroundColor: "#fafafa",
                            }}
                          >
                            <Box
                              component="img"
                              className="product-image"
                              src={`https://productcrud-server-ex42.onrender.com/uploads/product/${product?.picture}`}
                              alt={product.name}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.3s ease",
                              }}
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentNode.style.backgroundColor = "#f5f5f5";
                                e.target.parentNode.style.display = "flex";
                                e.target.parentNode.style.alignItems = "center";
                                e.target.parentNode.style.justifyContent = "center";
                                const fallback = document.createElement("div");
                                fallback.innerHTML = `
                                  <div style="text-align: center; color: #999;">
                                    <div style="font-size: 48px; margin-bottom: 8px;">📦</div>
                                    <div>No Image</div>
                                  </div>
                                `;
                                e.target.parentNode.appendChild(fallback);
                              }}
                            />
                          </Box>
                          
                          <CardContent sx={{ p: 2.5 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                mb: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                color: "text.primary",
                              }}
                            >
                              {product.name}
                            </Typography>
                            
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                color: "text.secondary",
                              }}
                            >
                              <AccessTime sx={{ fontSize: 16 }} />
                              <Typography
                                variant="caption"
                                sx={{
                                  fontSize: "0.875rem",
                                  fontWeight: 500,
                                }}
                              >
                                {moment(product?.createdAt).fromNow()}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Fade>
                  </Grid>
                ))
              )}
            </Grid>
          </Fade>
        )}

        {/* Results Summary */}
        {!loading && filteredProducts.length > 0 && (
          <Fade in timeout={1600}>
            <Box
              sx={{
                mt: 4,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 500,
                }}
              >
                Showing {filteredProducts.length} of {products.length} products
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
}