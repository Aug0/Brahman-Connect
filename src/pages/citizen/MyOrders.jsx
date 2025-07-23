import React from 'react';
import {
    Box,
    Typography,
    Button,
    Divider,
    Avatar,
    CssBaseline,
    Container,
} from '@mui/material';

const StatusPill = ({ status }) => {
    const statusMap = {
        'In Process': { bg: '#D1FAE5', color: '#065F46' },
        Delivered: { bg: '#DBEAFE', color: '#1E40AF' },
        Cancelled: { bg: '#FECACA', color: '#991B1B' },
    };
    const style = statusMap[status] || {};
    return (
        <Box
            component="span"
            sx={{
                backgroundColor: style.bg,
                color: style.color,
                px: 1.2,
                py: 0.3,
                borderRadius: '6px',
                fontSize: 12,
                ml: 1,
            }}
        >
            {status}
        </Box>
    );
};

const OrderCard = ({ order }) => (
    <Box
        sx={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            backgroundColor: '#fff',
            p: { xs: 2, sm: 3 },
            mb: 3,
        }}
    >
        {/* Order Header */}
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                    Order #{order.id}
                    <StatusPill status={order.status} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {order.date}
                </Typography>
            </Box>
            <Box textAlign={{ xs: 'left', sm: 'right' }} mt={{ xs: 1, sm: 0 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Total ₹{order.total.toFixed(2)} INR
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {order.units} units
                </Typography>
            </Box>
        </Box>

        {/* Items */}
      {order.items.map((item, index) => (
  <Box key={index} mt={2}>
    <Box
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }}
      gap={2}
      alignItems="flex-start"
    >
      {/* Image (always on top in mobile) */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          variant="rounded"
          src={item.image || '/assets/Laddu.jpg'}
          sx={{ width: 56, height: 56 }}
        />

        {/* Price (below image on all views) */}
        <Typography fontSize={14} mt={0.5}>
          ₹{item.price.toFixed(2)} INR
        </Typography>

        {/* Qty for mobile – just below price */}
        <Typography
          fontSize={14}
          sx={{
            display: { xs: 'block', sm: 'none' },
            mt: 0.5,
          }}
        >
          Qty: {item.qty}
        </Typography>
      </Box>

      {/* Item Info */}
      <Box flex={1}>
        {/* Name */}
        <Typography
          fontSize={14}
          fontWeight={500}
          sx={{ mt: { xs: 1, sm: 0 } }}
        >
          {item.name}
        </Typography>

        {/* Description */}
        <Typography variant="caption" color="text.secondary">
          Description
        </Typography>

        {/* Qty for desktop – aligned to the right */}
        <Typography
          fontSize={14}
          sx={{
            display: { xs: 'none', sm: 'block' },
            mt: 1.5,
            ml: 24,
          }}
        >
          Qty: {item.qty}
        </Typography>
      </Box>
    </Box>

    {index !== order.items.length - 1 && <Divider sx={{ mt: 2 }} />}
  </Box>
))}


        {/* Cancel Order */}
        <Box mt={2}>
            <Button
                variant="contained"
                sx={{
                    bgcolor: order.status === 'Cancelled' ? '#ccc' : '#f59e0b',
                    color: '#000',
                    textTransform: 'none',
                    fontWeight: '600',
                    '&:hover': {
                        bgcolor: order.status === 'Cancelled' ? '#bbb' : '#d97706',
                    },
                }}
                disabled={order.status === 'Cancelled'}
            >
                Cancel Order
            </Button>
        </Box>
    </Box>
);



const MyOrders = () => {
    const orders = [
        {
            id: 349,
            status: 'In Process',
            date: '15 Jul 2025, 08:28 PM',
            total: 620,
            units: 3,
            items: [
                { name: 'Diwali Diya Set of 6', price: 220, qty: 1, image: '/assets/diya1.jpg' },
                { name: 'Diya Special - Big', price: 260, qty: 1, image: '/assets/diya2.jpg' },
                { name: 'Diya Set of 2 - Medium', price: 140, qty: 1, image: '/assets/diya3.jpg' },
            ],
        },
        {
            id: 341,
            status: 'Delivered',
            date: '05 Feb 2025, 04:25 PM',
            total: 440,
            units: 2,
            items: [
                { name: 'Diwali Special Diya Set of 6', price: 220, qty: 1, image: '/assets/diya4.jpg' },
                { name: 'Diya Set of 1', price: 220, qty: 1, image: '/assets/diya5.jpg' },
            ],
        },
        {
            id: 287,
            status: 'Cancelled',
            date: '10 Jan 2025, 02:00 PM',
            total: 660,
            units: 3,
            items: [
                { name: 'Diya Gold Edition', price: 330, qty: 2, image: '/assets/diya6.jpg' },
                { name: 'Festive Diya Combo', price: 0, qty: 1, image: '/assets/diya7.jpg' },
            ],
        },
    ];

    return (
        <>
            <CssBaseline />
            <Box sx={{ bgcolor: '#f8f5ee', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="md">
                    <Typography variant="h5" fontWeight="bold" mb={3}>
                        My Orders
                    </Typography>
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </Container>
            </Box>
        </>
    );
};

export default MyOrders;