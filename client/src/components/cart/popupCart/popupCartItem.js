import React from 'react';
import { Link } from 'react-router-dom';
//ui
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Delete from '@mui/icons-material/DeleteForeverOutlined';
import Avatar from '@mui/material/Avatar';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';


export default function PopupCartItem({ item, cartSize, cartFunctions, closeCart }) {

    return (
        <ListItem  divider={true} style={{ cursor: 'default' }}>

            <ListItemAvatar>
                <Avatar onClick={closeCart} component={Link} to={'/' + item.id} variant='rounded' alt="img" src={item.img}>
                    <BrokenImageIcon />
                </Avatar>
            </ListItemAvatar>


            <ListItemText>
                <Link onClick={closeCart} to={'/' + item.id} style={{ color: 'inherit', textDecoration: 'inherit' }} >
                    {item.quantity}x {item.name}
                </Link>
            </ListItemText>


            <Delete style={{ cursor: 'pointer' }} onClick={() => {
                cartFunctions.deleteCartItem(item.price);
            }}></Delete>

            <Typography variant="body2" color="text.secondary">
                {((item.unit_amount * item.quantity) / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </Typography>
        </ListItem>
    )
}