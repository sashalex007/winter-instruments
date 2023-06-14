import React from 'react';
//ui
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';


export default function ContactCard() {

    return (

        <Container>
            <Typography gutterBottom variant="h4" component="div">
                Contact
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                Please join the discord server!
            </Typography>
            <br></br>
            <iframe title='Discord' src="https://discord.com/widget?id=1118553098353385535&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </Container>

    );
}