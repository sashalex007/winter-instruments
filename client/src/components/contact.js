import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function ContactCard() {

    return (

        <Container>
            <Typography gutterBottom variant="h4" component="div">
                Contact
            </Typography>
            <br></br>

            <Card elevation={5} >
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        alexpokho@gmail.com
                    </Typography>
                </CardContent>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        Phone
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        +1 (819) 328 4965
                    </Typography>
                </CardContent>
            </Card>
        </Container>

    );
}