import React from 'react';
import {
    Box,
    Typography,
    Button,
    Divider,
    Avatar,
    CssBaseline,
    Container,
    IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const initialCartItems = [
    {
        id: 1,
        name: 'Diwali Diya Set of 6',
        price: 220,
        qty: 1,
        image: '/assets/Hand Painted Dyais.png',
    },
    {
        id: 2,
        name: 'Brass Puja Plate',
        price: 499,
        qty: 2,
        image: '/assets/Hand Painted.png',
    },
    {
        id: 3,
        name: 'Laddu Prasadam (Box)',
        price: 299,
        qty: 1,
        image: '/assets/Laddu.jpg',
    },
];

const CartItemCard = ({ item, onRemove, onUpdateQty }) => (
    <Box
        sx={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            backgroundColor: '#fff',
            p: 2,
            mb: 2,
        }}
    >
        <Box display="flex" gap={2} alignItems="flex-start">
            {/* Image + Price */}
            <Box>
                <Avatar
                    variant="rounded"
                    src={item.image}
                    sx={{ width: 56, height: 56 }}
                />
                <Typography fontSize={14} mt={0.5}>
                    ₹{item.price.toFixed(2)} INR
                </Typography>
            </Box>

            {/* Details */}
            <Box flex={1}>
                <Typography fontSize={14} fontWeight={500}>
                    {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Short description
                </Typography>

                {/* Quantity Controls */}
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <IconButton
                        size="small"
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        disabled={item.qty === 1}
                    >
                        <Remove fontSize="small" />
                    </IconButton>
                    <Typography fontSize={14}>{item.qty}</Typography>
                    <IconButton
                        size="small"
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                    >
                        <Add fontSize="small" />
                    </IconButton>
                </Box>

                <Box mt={1}>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => onRemove(item.id)}
                    >
                        Remove
                    </Button>
                </Box>
            </Box>
        </Box>
    </Box>
);

const MyCart = () => {
    const [cart, setCart] = React.useState(initialCartItems);

    const handleRemove = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const handleUpdateQty = (id, newQty) => {
        if (newQty < 1) return;
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, qty: newQty } : item
            )
        );
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <>
            <CssBaseline />
            <Box sx={{ bgcolor: '#f8f5ee', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="md">
                    <Typography variant="h5" fontWeight="bold" mb={3}>
                        My Cart
                    </Typography>

                    {cart.length > 0 ? (
                        <>
                            {cart.map((item) => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onRemove={handleRemove}
                                    onUpdateQty={handleUpdateQty}
                                />
                            ))}

                            <Divider sx={{ my: 2 }} />

                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography fontWeight="bold" fontSize={16}>
                                    Total: ₹{totalAmount.toFixed(2)} INR
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#10b981',
                                        color: '#fff',
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: '#059669' },
                                    }}
                                >
                                    Proceed to Checkout
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Typography color="text.secondary">Your cart is empty.</Typography>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default MyCart;