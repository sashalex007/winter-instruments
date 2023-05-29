import React from 'react';
//ui
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { ListItem } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
//components
import MainCartItem from './mainCartItem';
import ShippingItem from '../shippingItem';
import AddressForm from './addressForm';


export default function MainCart({ cartObject }) {
    const { cartData, shippingData, cartFunctions } = cartObject
    function checkout() {
        window.location.href = shippingData.checkoutSessionURL
    }
    
    return (
        <Container>
            <Typography gutterBottom variant="h4" component="div">
                Cart
            </Typography>
            <Card elevation={0} sx={{ maxWidth: 600, minWidth: 250, height: '100%' }}>
                <List>
                    {cartData.map(item =>
                        <MainCartItem
                            key={item.price}
                            item={item}
                            cartFunctions={cartFunctions}
                        />)}

                    <ShippingItem
                        key={shippingData.price}
                        shippingData={shippingData}
                        cartFunctions={cartFunctions}
                    />

                    <ListItem>
                        <ListItemText><b>Total</b></ListItemText>
                        <span>&nbsp;&nbsp;</span>
                        <Typography color="text.primary">
                            {(cartFunctions.getCartTotal()/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </Typography>
                    </ListItem>


                    <AddressForm shippingData={shippingData} cartData={cartData} cartFunctions={cartFunctions} />

                    {shippingData.isShipping && (
                        <ListItem>
                            <Button startIcon={<ShoppingCartCheckoutIcon/>} onClick={checkout} variant="contained" size='large'>Checkout</Button>
                        </ListItem>
                    )}

                </List>
            </Card>
        </Container>
    );
}