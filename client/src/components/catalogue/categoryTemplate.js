import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
//ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import Divider from '@mui/material/Divider';
//components
import ProductTemplate from './productTemplate';
import ProductsLoading from '../alerts/productsLoading';
//logic
import { api } from '../../logic/api';
import { ErrorContext } from '../../App';

export default function CategoryTemplate({ category, cartFunctions }) {
    const [productObject, setProductObject] = useState({ bucketedProductKeys: [], bucketedProductMap: {}, bucketedProductIDMap: {} });
    const setError = useContext(ErrorContext);

    function useQuery() {
        const { search } = useLocation();
        const param = useMemo(() => new URLSearchParams(search), [search]).get('id')

        if (!param && (productObject.bucketedProductKeys.length === 0 || productObject.flat)) {
            if (productObject.flat) setProductObject({ bucketedProductKeys: [], bucketedProductMap: {}, bucketedProductIDMap: {} })
            api.getCategoryProducts(setProductObject, category.name, setError)
        }
        else if (param && !productObject.bucketedProductIDMap[param]) {
            api.getSingleProduct(setProductObject, param, setError)
        }
        return param
    }
    const productQuery = useQuery();

    return (
        <Container>

            <Typography gutterBottom variant="h5" component="div">
                {!productQuery && category.name}
            </Typography>

            <Divider />
            <br></br>

            <Grid container spacing={3}>
                {!productQuery &&
                    productObject.bucketedProductKeys.map(product =>
                        <ProductTemplate key={product}
                            productName={product}
                            productData={productObject.bucketedProductMap[product]}
                            cartFunctions={cartFunctions} />)}

                {(productQuery && productObject.bucketedProductIDMap[productQuery])  &&
                    <ProductTemplate key={productObject.bucketedProductIDMap[productQuery]}
                        productName={productObject.bucketedProductIDMap[productQuery]}
                        productData={productObject.bucketedProductMap[productObject.bucketedProductIDMap[productQuery]]}
                        cartFunctions={cartFunctions} />}

            </Grid>
            <br></br>
        </Container>
    );
}