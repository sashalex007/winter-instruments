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
                        cartFunctions.editQty(item.id, item.qty - 1);
                        if (item.qty === 0) cartFunctions.deleteCartItem(item.id);
                    }} />
                    <span>&nbsp;&nbsp;</span>
                    {item.qty}
                    <span>&nbsp;&nbsp;</span>
                    <Plus onClick={() => {
                        cartFunctions.editQty(item.id, item.qty + 1);
                    }} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    {item.name} - ${item.price}.00
                </Stack>
            </ListItemText>


            <Delete style={{ cursor: 'pointer' }} onClick={() => {
                cartFunctions.deleteCartItem(item.id);
            }}></Delete>
            <Typography variant="body2" color="text.secondary">
                ${item.price * item.qty}.00
            </Typography>
        </ListItem>
    )
}