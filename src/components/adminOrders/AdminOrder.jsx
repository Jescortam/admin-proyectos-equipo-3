import React, { useState } from 'react';
import { Card, CardContent, Typography, Stack, Box, Button, TextField } from '@mui/material';
import { getDatabase, ref, set } from 'firebase/database';

export default function AdminOrder(props) {
    const [order, setOrder] = useState(props)
    const [minutesToCompletion, setMinutesToCompletion] = useState(null)

    const creationDate = new Date(order.creationDate)
    const realtimeDatabase = getDatabase()

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

    const renderTimeSetter = () => {
        if (!order.isOver && (order.aproxDateOfCompletion === null || order.aproxDateOfCompletion === undefined)) {
            return (
                <TextField id="outlined-basic" label="Minutos para compleción" variant="outlined" type="number" sx={{ mx: 'auto' }}
                    onChange={(e) => { setMinutesToCompletion(e.target.value) }} />
            )
        }
    }

    const renderButton = () => {
        console.log(order)
        if (order.isOver) {
            return <></>
        } if (order.aproxDateOfCompletion != null || order.aproxDateOfCompletion != undefined) {
            return <Button sx={{ mt: 1 }} variant="contained" onClick={markAsOver}>Marcar como completado</Button>
        } else {
            return <Button sx={{ mt: 1 }} variant="contained" onClick={setTimeOfCompletion}>Establecer tiempo</Button>
        }
    }

    const markAsOver = async () => {
        const changedOrder = { ...order }
        changedOrder.isOver = true
        changedOrder.aproxDateOfCompletion = null
        await set(ref(realtimeDatabase, 'orders/' + order.id), changedOrder)
        setOrder(changedOrder)
        window.location.reload();
    }

    const setTimeOfCompletion = async () => {
        if (minutesToCompletion !== null) {
            const changedOrder = { ...order }
            changedOrder.aproxDateOfCompletion = Date.now() + minutesToCompletion * 60000
            await set(ref(realtimeDatabase, 'orders/' + order.id), changedOrder)
            setOrder(changedOrder)
        }
    }

    const getOrderStatus = () => {
        if (order.isOver) {
            return 'Listo'
        } else if (order.aproxDateOfCompletion != null) {
            const timeOfCompletion = new Date(order.aproxDateOfCompletion)
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
                            {renderItemNames(order.items)}
                        </Stack>
                    </Box>
                    <Box sx={{ marginTop: { xs: 4, md: 0 } }}>
                        <Typography variant="h6" fontWeight={400} sx={{ textAlign: { md: 'center' } }}>
                            {!order.isOver && order.aproxDateOfCompletion != null ? 'Hora aproximada de entrega' : 'Estado de la orden'}
                        </Typography>
                        <Typography variant="h5" sx={{ textAlign: { md: 'center' } }} fontWeight={800}>
                            {getOrderStatus()}
                        </Typography>
                        <Box mt={2} display='flex' flexDirection={'column'} sx={{ alignItems: { md: 'center' } }}>
                            <Box>{renderTimeSetter()}</Box>
                            <Box>{renderButton()}</Box>
                        </Box>
                    </Box>
                </Box>
                <Typography variant="body1" mt={2} fontWeight={600}>
                    Total: ${getTotal(order.items)}
                </Typography>
            </CardContent>
        </Card >
    );
}