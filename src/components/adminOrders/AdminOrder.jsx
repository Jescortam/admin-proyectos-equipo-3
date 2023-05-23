import React, { useState } from 'react';
import { Card, CardContent, Typography, Stack, Box, Button } from '@mui/material';
import { getDatabase, ref, set } from 'firebase/database';

export default function AdminOrder(props) {
    const [order, setOrder] = useState(props)

    const creationDate = new Date(order.creationDate)

    const renderItemNames = (items) => {
        return (items.map(item => {
            return <Box>
                <Typography variant="body1" ml={2}>
                    • {item.quantity} {item.name}
                </Typography>
            </Box>
        }))
    }

    const getTotal = (items) => {
        return items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ).toFixed(2)
    }

    const markAsOver = () => {
        const realtimeDatabase = getDatabase()
        const changedOrder = { ...order }
        changedOrder.isOver = true
        set(ref(realtimeDatabase, 'orders/' + order.id), changedOrder)
        setOrder(changedOrder)
    }

    const getOrderStatus = () => {
        if (order.isOver) {
            return 'Listo'
        } else if (order.aproxDateOfCompletion != null) {
            return order.aproxDateOfCompletion.toLocaleTimeString()
        } else {
            return 'Por revisar'
        }
    }

    return (
        <Card sx={{ minWidth: 300, maxWidth: 600, p: 2, my: 2 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {creationDate.toLocaleTimeString()}
                </Typography>
                <Typography variant="h5" component="div" fontWeight={800} mb={2}>
                    Orden: {creationDate.toLocaleDateString('es-MX')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around', marginBottom: 5 }}>
                    <Box>
                        <Typography variant="h6" mb={1} fontWeight={400}>
                            Productos ordenados:
                        </Typography>
                        <Stack>
                            {renderItemNames(order.items)}
                        </Stack>
                    </Box>
                    <Box sx={{ marginTop: { xs: 4, md: 0 } }}>
                        <Typography variant="h6" fontWeight={400} sx={{ textAlign: { md: 'center' } }}>
                            Estado de la orden
                        </Typography>
                        <Typography variant="h5" sx={{ textAlign: { md: 'center' } }} fontWeight={800}>
                            {getOrderStatus()}
                        </Typography>
                        <Button sx={{ my: 1 }} variant="contained" onClick={markAsOver}>Marcar como completado</Button>
                    </Box>
                </Box>
                <Typography variant="body1" mt={2} fontWeight={600}>
                    Total: ${getTotal(order.items)}
                </Typography>
            </CardContent>
        </Card >
    );
}