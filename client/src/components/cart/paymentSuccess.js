import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { useEffect } from 'react';

export default function PaymentSuccess({cartFunctions}) {
    useEffect(() => {
        cartFunctions.deleteCartData();
      }, []);
    return (
        <Container>
            <Typography gutterBottom variant="h4" component="div">
                Order created!
            </Typography>
            <br></br>
            Please check email for details.           
        </Container>
    );
}