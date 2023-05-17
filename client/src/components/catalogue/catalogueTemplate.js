import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';


export default function CatalogueTemplate(data) {

    return (
        <Grid item xs>
            <Card elevation={5}  sx={{maxWidth: 600, minWidth: 250, height: '100%' }}>
                    <CardActionArea component={Link} to={data.link}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={data.img}
                        alt={data.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.name}
                        </Typography>
                    </CardContent>
                    </CardActionArea>
            </Card>
        </Grid>
    );
}

