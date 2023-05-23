import React, { useState } from 'react';
//ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddedAlert from '../alerts/addedAlert';


export default function ProductTemplate({ productName, productData, cartFunctions}) {
    const products = productData
    const [ product, setProduct ] = useState(products[0])

    return (
        <Grid item xs>
            <Card elevation={5} sx={{ maxWidth: 600, minWidth: 250, height: '100%' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={product.images[0]}
                        alt={productName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {productName} - {(product.unit_amount/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                
                <CardActions>
                    {CreateVariantSelector(products)}
                    {CreateAddButton(product)}
                </CardActions>
            </Card>
        </Grid>
    );

    function CreateVariantSelector(products) {

        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        if (products.length > 1) return createVariantMenuandButton(products)

        function createVariantMenuandButton(products) {
            return (
                <div>
                    {product.variant_title}:
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        {product.variant}
                    </Button>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >

                        {products.map(block => createVariant(block))}

                    </Menu>
                </div >
            );
        }

        function createVariant(newProduct) {
            return (
                <MenuItem key={newProduct.default_price} onClick={() => {
                    handleClose();
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
            <div>
                <Button onClick={() => {
                    cartFunctions.addCartItem({
                        id: product.id,
                        price: product.default_price,
                        unit_amount: product.unit_amount,
                        name: product.name,
                        img: product.images[0]
                    })
                    handleClickOpen();
                }} variant="contained">Add to cart</Button>
                <AddedAlert open={open} setOpen={setOpen} product={product} />
            </div>
        );
    }
}

