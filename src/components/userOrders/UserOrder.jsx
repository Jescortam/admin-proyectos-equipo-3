import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

export default function UserOrder(props) {
    let { creationDate, items, isOver, aproxDateOfCompletion } = props
    creationDate = new Date(creationDate)

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

    const getOrderStatus = () => {
        if (isOver) {
            return 'Listo'
        } else if (aproxDateOfCompletion != null) {
            const timeOfCompletion = new Date(aproxDateOfCompletion)
            let hours = timeOfCompletion.getHours()
            let minutes = timeOfCompletion.getMinutes()
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12
            hours = hours != 0 ? hours : 12
            minutes = minutes < 10 ? '0' + minutes : minutes;
            const timeString = hours + ':' + minutes + ' ' + ampm;
            return timeString
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
                            {renderItemNames(items)}
                        </Stack>
                    </Box>
                    <Box sx={{ marginTop: { xs: 4, md: 0 } }}>
                        <Typography variant="h6" fontWeight={400}>
                            {!isOver && aproxDateOfCompletion != null ? 'Hora aproximada de entrega' : 'Estado de la orden'}
                        </Typography>
                        <Typography variant="h5" sx={{ textAlign: { md: 'center' } }} fontWeight={800}>
                            {getOrderStatus()}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body1" mt={2} fontWeight={600}>
                    Total: ${getTotal(items)}
                </Typography>
            </CardContent>
        </Card >
    );
}