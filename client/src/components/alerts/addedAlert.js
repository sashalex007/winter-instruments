import React from 'react';
//ui
import { Link } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';


export default function AddedAlert({ open, setOpen, product }) {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Added to Cart!
            </DialogTitle>

            <ListItem style={{ cursor: 'default' }}>
                <ListItemAvatar >
                    <Avatar variant='rounded' alt="img" src={product.images[0]}>
                        <BrokenImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText>
                    {product.name} has been added to your cart.
                </ListItemText>
            </ListItem>

            <DialogActions>
                <Stack direction="row" spacing={1}>
                    <Button onClick={handleClose}>Continue shopping</Button>
                    <Button variant='outlined' component={Link} to={'/cart'} onClick={handleClose} autoFocus>
                        Go to cart
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );

}

