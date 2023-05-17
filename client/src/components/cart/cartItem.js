import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Delete from '@mui/icons-material/DeleteForeverOutlined';

export default function CartItem(props) {
    const item = props.item;
    const cartSize = props.cartSize;
    const cartFunctions = props.cartFunctions;
    const closeCart = props.closeCart;
    return (
        <MenuItem divider={true} disableRipple style={{ cursor: 'default' }}>
         <ListItemText>{item.qty}x {item.name}</ListItemText>
        
        <Delete style={{ cursor: 'pointer' }} onClick={() => {
            cartFunctions.deleteCartItem(item.id);
            if (cartSize - item.qty === 0 || cartSize === 0) closeCart();
        }}/>

        <Typography variant="body2" color="text.secondary">
            ${item.price*item.qty}.00
          </Typography>
          </MenuItem>
    )
}