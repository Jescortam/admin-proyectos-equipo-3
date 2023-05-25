import { useContext, useEffect, useState } from "react"
import { Alert, Box, Divider, Stack, Typography } from "@mui/material"
import AdminOrder from "./AdminOrder"
import { AuthContext } from "../../Auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { Navigate } from "react-router";

export default function AdminOrderList() {
    const [orders, setOrders] = useState([])

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const getOrders = async () => {
            if (currentUser === null) {
                Navigate('/')
            }

            const realtimeDatabase = getDatabase()
            const ordersRef = ref(realtimeDatabase, 'orders/')

            onValue(ordersRef, snapshot => {
                const data = snapshot.val()

                const newOrders = Object.keys(data).map(key => ({ id: key, ...data[key] }))
                newOrders.sort((a, b) => b.creationDate - a.creationDate)

                setOrders(newOrders)
            })
        }

        getOrders()
    }, [])

    const renderPendingOrders = () => {
        const pendingOrders = orders.filter(order => !order.isOver)

        return (
            <Box>
                <Stack>
                    {pendingOrders.length === 0 ? <Alert severity="info" sx={{ mt: 2 }}>No existen órdenes pendientes en este momento.</Alert> : <></>}
                    {pendingOrders.map(order => <AdminOrder {...order} />)}
                </Stack>
            </Box>
        )
    }

    const renderCompletedOrders = () => {
        const completedOrders = orders.filter(order => order.isOver)

        return (
            <Box>
                <Stack>
                    {completedOrders.length === 0 ? <Alert severity="info" sx={{ mt: 2 }}>No existen órdenes completadas en este momento.</Alert> : <></>}
                    {completedOrders.map(order => <AdminOrder {...order} />)}
                </Stack>
            </Box>
        )
    }

    return (
        <Box>
            <Typography variant="h4">Órdenes pendientes</Typography>
            {renderPendingOrders()}
            <Divider sx={{ marginY: 5 }} />
            <Typography variant="h4">Órdenes completadas</Typography>
            {renderCompletedOrders()}
        </Box>
    )
}