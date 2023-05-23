import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function ShoppingCartItems(props) {
    const { shoppingCart } = props

    const tableRowStyles = {
        '& td, & th': { border: 0 },
        border: '1px solid #ddd',
        height: 20,
    }

    const renderItems = (items) => {
        return items.map((item) => (
            <TableRow key={item.name} sx={tableRowStyles}>
                <TableCell scope="row">
                    <TableCell align="right" sx={{ fontSize: '1.1rem' }}>{item.name}</TableCell>
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '1.1rem' }}>${item.price}</TableCell>
                <TableCell align="center" sx={{ fontSize: '1.1rem' }}>{item.quantity}</TableCell>
            </TableRow>
        ))
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
                            Producto
                        </TableCell>
                        <TableCell sx={{ fontWeight: 800, width: 180, fontSize: '1.1rem' }} align="center">
                            Precio Unitario
                        </TableCell>
                        <TableCell sx={{ fontWeight: 800, width: 180, fontSize: '1.1rem' }} align="center">
                            Cantidad
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderItems(shoppingCart)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}