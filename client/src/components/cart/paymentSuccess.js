import React, { useEffect } from 'react';
//ui
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';


export default function PaymentSuccess({cartFunctions}) {
    useEffect(() => {
        cartFunctions.deleteCartData();
      }, [cartFunctions]);
      
    return (
        <Container>
            <Typography gutterBottom variant="h4" component="div">
                Order completed!
            </Typography>
            <br></br>
            Please check your email for details.           
        </Container>
    );
}