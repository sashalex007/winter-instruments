import React, { useState, useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
//ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import Divider from '@mui/material/Divider';
//components
import Product from './product';
//logic
import { api } from '../../logic/api';
import { ErrorContext } from '../../App';

export default function Category({ category, cartFunctions }) {
    const [productObject, setProductObject] = useState({ bucketedProductKeys: [], bucketedProductMap: {}, bucketedProductIDMap: {} });
    const setError = useContext(ErrorContext);

    function useProductID() {
        const { search } = useLocation();
        let productID = useMemo(() => new URLSearchParams(search), [search]).get('id')
        if (productID) productID = productID.substring(0, 19)

        if (!productID && ((productObject.bucketedProductKeys.length === 0 || productObject.flat) && !productObject.notFound)) {
            api.getCategoryProducts(setProductObject, category.name, setError)
        }
        else if (productID && !productObject.bucketedProductIDMap[productID] && !productObject.notFound) {
            api.getSingleProduct(setProductObject, productID, setError)
        }
        return productID
    }
    const productID = useProductID();

    return (
        <Container>
            {!productID &&
                <div>
                    <Typography gutterBottom variant="h5" component="div">
                        {category.name}
                    </Typography>
                    <Divider />
                </div>
            }
            <br></br>

            <Grid container spacing={3}>
                {!productID &&
                    productObject.bucketedProductKeys.map(product =>
                        <Product key={product}
                            isSingleProduct={false}
                            productName={product}
                            productData={productObject.bucketedProductMap[product]}
                            cartFunctions={cartFunctions} />)}

                {(productID && productObject.bucketedProductIDMap[productID]) &&
                    <Product key={productObject.bucketedProductIDMap[productID]}
                        isSingleProduct={true}
                        productName={productObject.bucketedProductIDMap[productID]}
                        productData={productObject.bucketedProductMap[productObject.bucketedProductIDMap[productID]]}
                        cartFunctions={cartFunctions} />}

                {productObject.notFound &&
                    <Typography gutterBottom variant="h5" component="div">
                        Product not found!
                    </Typography>}

            </Grid>
        </Container>
    );
}