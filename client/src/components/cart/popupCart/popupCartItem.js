import React from 'react';
//ui
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Delete from '@mui/icons-material/DeleteForeverOutlined';

export default function PopupCartItem({item, cartSize, cartFunctions, closeCart}) {

    return (
        <MenuItem divider={true} disableRipple style={{ cursor: 'default' }}>
         <ListItemText>{item.quantity}x {item.name}</ListItemText>
        
        <Delete style={{ cursor: 'pointer' }} onClick={() => {
            cartFunctions.deleteCartItem(item.price);
            if (cartSize - item.quantity === 0 || cartSize === 0) closeCart();
        }}/>

        <Typography variant="body2" color="text.secondary">
            ${(item.unit_amount*item.quantity).toFixed(2)}
          </Typography>
          </MenuItem>
    )
}