import React, { useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ShoppingCartItems from './ShoppingCartItems';
import { Alert, Box, Button, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../Auth';

export default function ShoppingCartBody() {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0.)

    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);

    const getItems = async () => {
        if (currentUser === null) {
            navigate("/signup")
        }

        const user = currentUser
        const userRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userRef)

        const shoppingCart = userDoc.data().shoppingCart
        setItems(shoppingCart)

        setTotal(shoppingCart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ))
    }

    const createOrder = async () => {
        await setDoc(doc(db, "orders", uuidv4()), {
            userId: currentUser.uid,
            items
        })
        navigate("/")
    }

    const renderShoppingCartContents = () => {
        if (items.length > 0) {
            return <>
                <ShoppingCartItems shoppingCart={items} />
                <Typography variant="h5" alignSelf="end" mx={1} mt={3}>
                    <Box display="inline" fontWeight={800}>Total:</Box> ${total}
                </Typography>
                <Button color="secondary" variant="contained" sx={{ my: 2, maxWidth: 200, alignSelf: 'end' }} onClick={createOrder}>
                    Realizar orden
                </Button>
            </>
        } else {
            return <Alert severity="info">Tu carrito está vacio! Para agregar productos, haz clic en "Añadir al</Alert>
        }
    }

    return (
        <Box display="flex" flexDirection="column" sx={{ maxWidth: 800 }}>
            <Button onClick={getItems}>GET_ITEMS</Button>
            <Typography variant="body1" mb={2}>
                <NavLink to="/" >
                    &lt; Regresar
                </NavLink>
            </Typography>
            <Typography variant="h4" fontWeight={800} mb={2}>
                Tu carrito
            </Typography>
            {renderShoppingCartContents()}
        </Box >
    );
}