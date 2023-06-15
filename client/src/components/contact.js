import React from 'react';
//ui
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';


export default function ContactCard() {
    const [widgetLoading, setWidgetLoadeding] = React.useState(true);
    const widgetHeight = 250

    return (

        <Container>
            <Typography gutterBottom variant="h4" component="div">
                Contact
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                Please join the discord server!
            </Typography>
            <br></br>

            {widgetLoading &&
                <Skeleton animation="wave" variant="rounded" width={350} height={widgetHeight} />
            }

            <Box sx={{ display: widgetLoading ? 'none' : 'block' }}>
                <iframe
                    title='Discord'
                    src="https://discord.com/widget?id=1118553098353385535&theme=dark"
                    onLoad={() => setWidgetLoadeding(false)}
                    width="350"
                    height={widgetHeight}
                    allowtransparency="true"
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" />
            </Box>
        </Container>

    );
}