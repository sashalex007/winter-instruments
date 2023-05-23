import React from 'react';
import { Link } from 'react-router-dom';
//ui
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Delete from '@mui/icons-material/DeleteForeverOutlined';
import Minus from '@mui/icons-material/RemoveCircle';
import Plus from '@mui/icons-material/AddCircle';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import Box from '@mui/material/Box';

export default function MainCartItem({ item, cartFunctions }) {

    return (
        <ListItem divider={true} style={{ cursor: 'default' }}>

            <Stack direction="row" spacing={0}>
                <Minus onClick={() => {
                    cartFunctions.editQty(item.price, item.quantity - 1);
                    if (item.quantity === 0) cartFunctions.deleteCartItem(item.price);
                }} />
                <span>&nbsp;&nbsp;</span>
                {item.quantity}
                <span>&nbsp;&nbsp;</span>
                <Plus onClick={() => {
                    cartFunctions.editQty(item.price, item.quantity + 1);
                }} />
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </Stack>


            <ListItemAvatar>
                <Avatar component={Link} to={'/' + item.id} variant='rounded' alt="img" src={item.img}>
                    <BrokenImageIcon />
                </Avatar>
            </ListItemAvatar>


            <ListItemText>
                <Link to={'/' + item.id} style={{ color: 'inherit', textDecoration: 'inherit'}} >
                    {item.name} - {(item.unit_amount / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}
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