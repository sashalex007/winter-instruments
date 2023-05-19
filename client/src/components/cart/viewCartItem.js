import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import Delete from '@mui/icons-material/DeleteForeverOutlined';
import Minus from '@mui/icons-material/RemoveCircle';
import Plus from '@mui/icons-material/AddCircle';



export default function ViewCartItem(props) {
    const item = props.item;
    const cartFunctions = props.cartFunctions;

    return (
        <ListItem divider={true} style={{ cursor: 'default' }}>
            <ListItemText>
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

                    {item.name} - ${item.unit_amount}.00
                </Stack>
            </ListItemText>


            <Delete style={{ cursor: 'pointer' }} onClick={() => {
                cartFunctions.deleteCartItem(item.price);
            }}></Delete>
            <Typography variant="body2" color="text.secondary">
                ${item.unit_amount * item.quantity}.00
            </Typography>
        </ListItem>
    )
}