import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Auth"
import { Box, Divider, Stack, Typography } from "@mui/material"
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

                const newOrders = Object.keys(data).map(key => data[key])
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
                {(recentOrders.length > 0) ? <Typography variant="h4" >Órdenes recientes</Typography> : <></>}
                <Stack>
                    {recentOrders.map(order => <Order {...order} />)}
                </Stack>
            </Box>
        )
    }

    const renderPastOrders = () => {
        const pastOrders = orders.filter(order => (Date.now() - order.creationDate) > 86400000)

        return (
            <Box>
                {(pastOrders.length > 0) ? <Typography variant="h4">Órdenes pasadas</Typography> : <></>}
                <Stack>
                    {pastOrders.map(order => <Order {...order} />)}
                </Stack>
            </Box>
        )
    }

    return (
        <Box>
            {renderRecentOrders()}
            <Divider sx={{ marginY: 5 }} />
            {renderPastOrders()}
        </Box>
    )
}