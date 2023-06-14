import React, { useState, useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
//ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import Divider from '@mui/material/Divider';
//components
import ProductTemplate from './productTemplate';
//logic
import { api } from '../../logic/api';
import { ErrorContext } from '../../App';

export default function CategoryTemplate({ category, cartFunctions }) {
    const [productObject, setProductObject] = useState({ bucketedProductKeys: [], bucketedProductMap: {}, bucketedProductIDMap: {} });
    const setError = useContext(ErrorContext);

    function useProductID() {
        const { search } = useLocation();
        const productID = useMemo(() => new URLSearchParams(search), [search]).get('id')

        if (!productID && (productObject.bucketedProductKeys.length === 0 || productObject.flat)) {
            api.getCategoryProducts(setProductObject, category.name, setError)
        }
        else if (productID && !productObject.bucketedProductIDMap[productID]) {
            api.getSingleProduct(setProductObject, productID, setError)
        }
        return productID
    }
    const productID = useProductID();

    return (
        <Container>

            <Typography gutterBottom variant="h5" component="div">
                {!productID && category.name}
            </Typography>

            <Divider />
            <br></br>

            <Grid container spacing={3}>
                {!productID &&
                    productObject.bucketedProductKeys.map(product =>
                        <ProductTemplate key={product}
                            productName={product}
                            productData={productObject.bucketedProductMap[product]}
                            cartFunctions={cartFunctions} />)}

                {(productID && productObject.bucketedProductIDMap[productID])  &&
                    <ProductTemplate key={productObject.bucketedProductIDMap[productID]}
                        productName={productObject.bucketedProductIDMap[productID]}
                        productData={productObject.bucketedProductMap[productObject.bucketedProductIDMap[productID]]}
                        cartFunctions={cartFunctions} />}

            </Grid>
            <br></br>
        </Container>
    );
}