import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
//ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, CardActionArea, CardActions } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import AddedAlert from '../alerts/addedAlert';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FormControl from '@mui/material/FormControl';

export default function ProductTemplate({ productName, productData, cartFunctions }) {
    const products = productData
    const [product, setProduct] = useState(products[0])
    const [isProductPage, setIsProductPage] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/' + product.id) {
            console.log('works')
            setIsProductPage(true)
        } else {
            setIsProductPage(false)
        }
    }, [location.pathname, product.id])


    return (
        <Grid item xs>
            <Card elevation={5} sx={{ maxWidth: 600, minWidth: 270, height: '100%' }}>
                <CardActionArea disabled={isProductPage} component={Link} to={'/' + product.id} >
                    <CardMedia
                        component="img"
                        height="140"
                        image={product.images[0]}
                        alt={productName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {productName} - {(product.unit_amount / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    {CreateVariantSelector(products)}
                    &nbsp;&nbsp;
                    {CreateAddButton(product)}
                </CardActions>
            </Card>
        </Grid>
    );

    function CreateVariantSelector(products) {

        if (products.length > 1) return createVariantMenuandButton(products)

        function createVariantMenuandButton(products) {
            return (
                <FormControl >
                    <InputLabel id="demo-simple-select-label">{product.variant_title}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product.variant}
                        label={product.variant_title}
                    >
                        {products.map(block => createVariant(block))}
                    </Select>
                </FormControl>

            );
        }

        function createVariant(newProduct) {
            return (
                <MenuItem key={newProduct.default_price} value={newProduct.variant} onClick={() => {
                    setProduct(newProduct)
                }}>{newProduct.variant}</MenuItem>
            );
        }
    }

    function CreateAddButton(product) {
        const [open, setOpen] = useState(false);
        const handleClickOpen = () => {
            setOpen(true);
        };
        return (
            <Stack>
                <Button size='large' startIcon={<AddShoppingCartIcon />} onClick={() => {
                    cartFunctions.addCartItem({
                        id: product.id,
                        price: product.default_price,
                        unit_amount: product.unit_amount,
                        name: product.name,
                        img: product.images[0]
                    })

                    handleClickOpen();
                }} variant="contained" disableElevation>Add to cart</Button>
                <AddedAlert open={open} setOpen={setOpen} product={product} />
            </Stack>
        );
    }
}

