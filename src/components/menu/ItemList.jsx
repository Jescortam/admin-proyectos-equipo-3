import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ItemCard from './ItemCard';

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from '../../firebase'
import { Button } from '@mui/material';

const categoriesKeys = [
    "Sándwich",
    "Sopas y cremas",
    "Ensaladas",
    "Open sándwich",
    "Desayunos",
    "Beetle Coffee frías",
    "Beetle Coffee calientes",
    "Bebidas probióticas",
    "Postres"
]

export default function ItemList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const productsCollectionRef = collection(db, "products");
        const getProducts = async () => {
            // const data = await getDocs(query(productsCollectionRef, where("category", "==", "Postres")));
            const data = await getDocs(query(productsCollectionRef));
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getProducts();
    }, [])

    const renderCategories = products => {
        if (products.length === 0) {
            return <></>
        }

        const categories = {}
        products.forEach(product => {
            if (categories[product.category]) {
                categories[product.category].push(product)
            } else {
                categories[product.category] = [product,]
            }
        })
        const renderedCategories = []

        categoriesKeys.forEach((categoryKey) => {
            renderedCategories.push(
                <Box id={categoryKey} sx={{ marginBottom: 5 }}>
                    <Typography variant="h4" fontWeight={800} gutterBottom>
                        {categoryKey}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {renderItems(categories[categoryKey])}
                    </Box>
                </Box>
            )
        })

        return renderedCategories
    }

    const renderItems = items => (
        items.map(item => <ItemCard key={item.uid} {...item} />)
    )

    return (<Box>{renderCategories(products)}</Box>)
}