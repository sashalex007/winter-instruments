import React from 'react';
//ui
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { ListItem } from '@mui/material';
//logic
import { api } from '../../functions/api';
//components
import CartItem from './cartItem';


export default function Cart({cartObject}) {
    const { cartData, cartFunctions } = cartObject

    function checkout() {
        api.createCheckoutSession(cartData);
    }

    return (
        <Container>
            <Typography gutterBottom variant="h4" component="div">
                Cart
            </Typography>
            <br></br>
            <Card elevation={0}  sx={{maxWidth: 600, minWidth: 250, height: '100%' }}>
                <List>
                    {cartData.map(item =>
                        <CartItem
                            key={item.price}
                            item={item}
                            cartFunctions={cartFunctions}
                        />)}

                    <ListItem style={{ cursor: 'default' }}>
                        <ListItemText><b>Total</b></ListItemText>
                        <span>&nbsp;&nbsp;</span>
                        <Typography color="text.primary">
                            ${cartFunctions.getCartTotal()}.00
                        </Typography>
                    </ListItem>

                    <ListItem style={{ cursor: 'default' }}>
                        <Button onClick={checkout} variant="contained">Checkout</Button>
                    </ListItem>
                </List>
              </Card>          
        </Container>
    );
}