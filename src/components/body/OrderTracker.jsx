import { Box, Button } from "@mui/material"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate, useParams } from "react-router"
import { db } from "../../firebase"
import Header from "../header/Header"
import Sidebar from "./Sidebar"
import Body from "./Body"

const drawerWidth = 240;

export default function OrderTracker() {
    const { orderId } = useParams()
    const navigate = useNavigate()

    const getOrder = async () => {
        const orderRef = doc(db, "orders", orderId)
        const orderDoc = await getDoc(orderRef)
        const order = orderDoc.data()

        if (order === undefined) {
            navigate('/')
        }

        console.log(order)
    }

    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }}>
                <Sidebar
                    drawerWidth={drawerWidth}
                />
                <Body drawerWidth={drawerWidth} content={<></>} />
            </Box>
            <Button onClick={getOrder}>GET_ORDER</Button>
        </>
    )
}