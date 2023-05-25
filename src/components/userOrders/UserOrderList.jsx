import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Auth"
import { Alert, Box, Divider, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router"
import Order from "./UserOrder"
import { getDatabase, onValue, ref } from "firebase/database"

export default function UserOrderList() {
    const [orders, setOrders] = useState([])

    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const getOrders = async () => {
            if (currentUser === null) {
                navigate('/')
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

    const renderRecentOrders = () => {
        const recentOrders = orders.filter(order => (Date.now() - order.creationDate) < 86400000)

        return (
            <Box>
                <Stack>
                    {recentOrders.length === 0 ? <Alert severity="info" sx={{ mt: 2 }}>No existen órdenes recientes en este momento.</Alert> : <></>}
                    {recentOrders.map(order => <Order {...order} />)}
                </Stack>
            </Box>
        )
    }

    const renderPastOrders = () => {
        const pastOrders = orders.filter(order => (Date.now() - order.creationDate) > 86400000)

        return (
            <Box>
                <Stack>
                    {pastOrders.length === 0 ? <Alert severity="info" sx={{ mt: 2 }}>No existen órdenes pasadas en este momento.</Alert> : <></>}
                    {pastOrders.map(order => <Order {...order} />)}
                </Stack>
            </Box>
        )
    }

    return (
        <Box>
            <Typography variant="h4" >Órdenes recientes</Typography>
            {renderRecentOrders()}
            <Divider sx={{ marginY: 5 }} />
            <Typography variant="h4">Órdenes pasadas</Typography>
            {renderPastOrders()}
        </Box>
    )
}