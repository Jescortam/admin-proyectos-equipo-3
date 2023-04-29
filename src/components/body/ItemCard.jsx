import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { db, storage } from '../../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import AspectRatio from '@mui/joy/AspectRatio';

export default function ItemCard(props) {
  const { id, name, description, price } = props;
  console.log(props.image)

  const [image, setImage] = useState(props.image)

  const navigate = useNavigate()

  const addToShoppingCart = async () => {
    const auth = getAuth();
    if (auth.currentUser === null) {
      navigate("/signup")
    }

    const user = auth.currentUser
    const userRef = doc(db, "users", user.uid)
    await updateDoc(userRef, { shoppingCart: arrayUnion(id) })
  }

  const getImage = async () => {
    setImage(await getDownloadURL(ref(storage, `images/${image}`)))
  }

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
            {description}
            {/* {id} */}
          </Typography>
        </CardContent>
        <Box display="flex" justifyContent="end" pb={2} pr={2} height="100%">
          <Button onClick={getImage}>GET_IMAGE</Button>
          <Button onClick={addToShoppingCart} variant="contained" sx={{ width: "200px" }}>Añadir al carrito</Button>
        </Box>
      </Box>
    </Card>
  );
}