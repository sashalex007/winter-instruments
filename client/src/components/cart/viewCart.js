import * as React from 'react';
import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import List from '@mui/material/List';
import ViewCartItem from './viewCartItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { ListItem } from '@mui/material';


export default function viewCart(props) {
    const cartData = props.cartData;
    const cartFunctions = props.cartFunctions;
    return (
        <Container>
            <Typography gutterBottom variant="h4" component="div">
                Cart
            </Typography>
            <br></br>
            <Card elevation={0}  sx={{maxWidth: 600, minWidth: 250, height: '100%' }}>
                <List>
                    {cartData.map(block =>
                        <ViewCartItem
                            key={block.id}
                            item={block}
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
                        <Button variant="contained">Checkout</Button>
                    </ListItem>
                </List>
              </Card>          
        </Container>
    );
}