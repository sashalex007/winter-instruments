import React from 'react';
//ui
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {product.name} has been added to your cart.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Continue shopping</Button>
                <Button component={Link} to={'/cart'} onClick={handleClose} autoFocus>
                    Go to cart
                </Button>
            </DialogActions>
        </Dialog>
    );

}

