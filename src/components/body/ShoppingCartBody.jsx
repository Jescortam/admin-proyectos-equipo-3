import * as React from 'react';
import ShoppingCartItems from './ShoppingCartItems';
import { Box, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function ShoppingCartBody(props) {
    return (
        <Box display="flex" flexDirection="column" sx={{ maxWidth: 800 }}>
            <Typography variant="body1" mb={2}>
                <NavLink to="/" >
                    &lt; Regresar
                </NavLink>
            </Typography>
            <Typography variant="h4" fontWeight={800} mb={2}>
                Tu carrito
            </Typography>
            <ShoppingCartItems />
            <Typography variant="h5" alignSelf="end" mx={1} mt={3}>
                <Box display="inline" fontWeight={800}>Total:</Box> $200.00
            </Typography>
            <Button color="secondary" variant="contained" sx={{ my: 2, maxWidth: 200, alignSelf: 'end' }}>
                Realizar orden
            </Button>
        </Box >
    );
}