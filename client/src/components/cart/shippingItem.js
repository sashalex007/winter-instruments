import React from 'react';
//ui
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Delete from '@mui/icons-material/DeleteForeverOutlined';

export default function ShippingItem({ shippingData, cartFunctions }) {
    const { shipping, isShipping } = shippingData
    if (isShipping) {
        return (
            <ListItem divider={true} style={{ cursor: 'default' }}>
                <ListItemText>
                    <Stack direction="row" spacing={0}>                        
                        <Typography variant="body2" color="text.secondary">
                        {shipping.name} - {shipping.info} {shipping.weight_oz}oz [{shipping.estimated_days} days]
                        </Typography>
                    </Stack>
                </ListItemText>

                <Delete style={{ cursor: 'pointer' }} onClick={() => {
                    cartFunctions.clearShippingData(shipping.price);
                }}></Delete>
                <Typography variant="body2" color="text.secondary">
                    {(shipping.unit_amount/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </Typography>
            </ListItem>
        )
    }
}