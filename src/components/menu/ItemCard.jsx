import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, Box, Button, Card, CardContent, CardMedia, Snackbar, Typography } from '@mui/material';
import { db, storage } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import AspectRatio from '@mui/joy/AspectRatio';
import { AuthContext } from '../../Auth';

export default function ItemCard(props) {
  const { id, name, description, price } = props;

  const [image, setImage] = useState(props.image)
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);

  const handleSuccess = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const addToShoppingCart = async () => {
    if (currentUser === null) {
      navigate("/signup")
    }

    const user = currentUser
    const userRef = doc(db, "users", user.uid)
    const userDoc = await getDoc(userRef)

    const shoppingCart = userDoc.data().shoppingCart
    let index
    shoppingCart.forEach((item, i) => {
      if (item.id === id) {
        index = i;
        return
      }
    })

    let quantity = 1
    if (index !== undefined) {
      shoppingCart[index].quantity++
    } else {
      shoppingCart.push({ id, name, price, quantity })
    }

    await updateDoc(userRef, { shoppingCart })

    handleSuccess()
  }

  useEffect(() => {
    const getImage = async () => {
      setImage(await getDownloadURL(ref(storage, `images/${image}`)))
      console.log(name)
    }

    getImage()
  })

  return (
    <Card
      sx={{ margin: { xs: 1.5, sm: 3 }, marginTop: 2, width: { xs: '100%', sm: '80%', md: '40%', lg: '27.5%', xl: '20%' } }}>
      <Box>
        <AspectRatio variant="outlined" ratio="1" objectFit="cover">
          <CardMedia
            component="img"
            image={image}
            alt={name}
          />
        </AspectRatio>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {price} MXN
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ height: 100 }}>
            {id}
            {description}
          </Typography>
        </CardContent>
        <Box display="flex" justifyContent="end" pb={2} pr={2} height="100%">
          <Button onClick={addToShoppingCart} variant="contained" sx={{ width: "200px" }}>Añadir al carrito</Button>
        </Box>
      </Box>
      <Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Producto agregado de manera exitosa.
        </Alert>
      </Snackbar >
    </Card>
  );
}