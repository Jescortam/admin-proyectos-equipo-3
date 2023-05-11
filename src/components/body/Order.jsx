import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Stack, Paper, Box } from '@mui/material';

export default function Order(props) {
    let { creationDate, items } = props
    creationDate = new Date(creationDate.seconds * 1000)

    const renderItemNames = (items) => {
        console.log(items)
        return (items.map(item => {
            return <Box>
                <Typography variant="body1" ml={2}>
                    • {item.quantity} {item.name}
                </Typography>
            </Box>
        }))
    }

    return (
        <Card sx={{ minWidth: 300, p: 2 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {creationDate.toLocaleTimeString()}
                </Typography>
                <Typography variant="h5" component="div" fontWeight={800} mb={2}>
                    Orden: {creationDate.toLocaleDateString('es-MX')}
                </Typography>
                <Typography variant="body1" mb={1}>
                    Productos ordenados:
                </Typography>
                <Stack>
                    {renderItemNames(items)}
                </Stack>
            </CardContent>
        </Card>
    );
}