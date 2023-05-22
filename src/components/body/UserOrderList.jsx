import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Auth"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useNavigate } from "react-router"
import { db } from "../../firebase"
import Order from "./Order"

export default function UserOrderList() {
    const [orders, setOrders] = useState([])

    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const getOrders = async () => {
            if (currentUser === null) {
                navigate('/')
            }

            const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid))
            const querySnapshot = await getDocs(q)

            const newOrders = []
            querySnapshot.forEach(doc => {
                newOrders.push(doc.data())
            })

            newOrders.sort((a, b) => b.creationDate - a.creationDate)

            setOrders(newOrders)
        }

        getOrders()
    }, [])

    const renderRecentOrders = () => {
        const recentOrders = orders.filter(order => (Date.now() - order.creationDate.seconds * 1000) < 86400000)

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
        const pastOrders = orders.filter(order => (Date.now() - order.creationDate.seconds * 1000) > 86400000)

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