import React from 'react';
import { Link } from 'react-router-dom';
//ui
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Delete from '@mui/icons-material/DeleteForeverOutlined';
import Avatar from '@mui/material/Avatar';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

export default function PopupCartItem({ item, cartSize, cartFunctions, closeCart }) {

    return (
        <MenuItem onClick={closeCart} component={Link} to={'/' + item.id} divider={true} disableRipple style={{ cursor: 'default' }}>

            <Avatar variant='rounded' alt="img" src={item.img}>
                <BrokenImageIcon />
            </Avatar>
            <span>&nbsp;&nbsp;</span>

            <ListItemText>{item.quantity}x {item.name}</ListItemText>

            <Delete style={{ cursor: 'pointer' }} onClick={() => {
                cartFunctions.deleteCartItem(item.price);
                if (cartSize - item.quantity === 0 || cartSize === 0) closeCart();
            }} />

            <Typography variant="body2" color="text.secondary">
                {((item.unit_amount * item.quantity) / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </Typography>
        </MenuItem>
    )
}