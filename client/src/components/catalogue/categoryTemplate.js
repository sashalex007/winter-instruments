import React from 'react';
//ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
//components
import ProductTemplate from './productTemplate';

export default function CategoryTemplate({ category, productList, cartFunctions }) {
    const bucketedProductMap = productList.bucketedProductMap
    const bucketedProductKeys = productList.bucketedProductKeys

    return (
        <Container>
            <Typography gutterBottom variant="h4" component="div">
                {category.name}
            </Typography>

            <br></br>
            <Grid container spacing={3}>
                {bucketedProductKeys.map(product => <ProductTemplate key={product} productName={product} productData={bucketedProductMap[product]} cartFunctions={cartFunctions} />)}
            </Grid>
            <br></br>
        </Container>
    );
}