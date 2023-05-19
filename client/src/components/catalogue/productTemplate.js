import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function ProductTemplate({ productData, cartFunctions, cartdata }) {

    const category = productData[0]
    const products = productData[1]
    const [product, setProduct] = useState(products[0])

    return (
        <Grid item xs>
            <Card elevation={5} sx={{ maxWidth: 600, minWidth: 250, height: '100%' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={product.images[0]}
                        alt={category}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {category}
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
                <MenuItem onClick={() => {
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
        const handleClose = () => {
            setOpen(false);
        };

        return (
            <div>
                <Button onClick={() => {
                    cartFunctions.addCartItem({
                        price: product.default_price,
                        unit_amount: product.unit_amount,
                        name: product.name
                    })
                    handleClickOpen();
                }} variant="contained">Add</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Added to Cart!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {product.name} has been added to your cart.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Continue shopping</Button>
                        <Button component={Link} to={'/cart'} onClick={handleClose} autoFocus>
                            Go to cart
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

