import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, quantity, unitPrice) {
    return { name, quantity, unitPrice };
}

const products = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Eclair', 262, 16.0),
    createData('Cupcake', 305, 3.7),
    createData('Gingerbread', 356, 16.0),
];

export default function ShoppingCartItems() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ fontWeight: 800 }}>Producto</TableCell>
                        <TableCell sx={{ fontWeight: 800, width: 150 }} align="center">Precio Unitario</TableCell>
                        <TableCell sx={{ fontWeight: 800, width: 150 }} align="center">Cantidad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product.name}
                            sx={{
                                '& td, & th': { border: 0 },
                                border: '1px solid #ddd',
                                height: 20,
                            }}
                        >
                            <TableCell scope="row">
                                <TableCell align="right">{product.name}</TableCell>
                            </TableCell>
                            <TableCell align="center">{product.quantity}</TableCell>
                            <TableCell align="center">${product.unitPrice}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}