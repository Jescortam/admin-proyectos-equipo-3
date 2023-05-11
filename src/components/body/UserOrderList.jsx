import { useContext, useState } from "react"
import { AuthContext } from "../../Auth"
import { Box, Button, Stack } from "@mui/material"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useNavigate } from "react-router"
import { db } from "../../firebase"
import Order from "./Order"

export default function UserOrderList() {
    const [orders, setOrders] = useState([])

    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);

    const getOrders = async () => {
        if (currentUser === null) {
            navigate('/')
        }

        const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid))
        const querySnapshot = await getDocs(q)

        console.log(querySnapshot)

        const newOrders = []
        querySnapshot.forEach(doc => {
            newOrders.push(doc.data())
        })

        console.log(newOrders)

        setOrders(newOrders)

        // setOrders(querySnapshot.map(order => order.data()))
    }

    const renderOrders = (orders) => {
        console.log(orders)
        return orders.map(order => <Order {...order} />)
    }

    return (
        <>
            <Button onClick={getOrders}>GET_ORDER</Button>
            <Stack>
                {renderOrders(orders)}
            </Stack>
        </>
    )
}