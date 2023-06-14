import React from 'react';
import { Link } from 'react-router-dom';
//ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
//logic
import { imageMap } from '../../static/img/imageMap';

export default function CatalogueItemTemplate({category}) {
    let image = null
    if (imageMap[category.link]) {
        image = imageMap[category.link]
    }

    return (
        <Grid item xs>
            <Card elevation={5}  sx={{maxWidth: 600, minWidth: 250, height: '100%' }}>
                    <CardActionArea component={Link} to={category.link}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt={category.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {category.name}
                        </Typography>
                    </CardContent>
                    </CardActionArea>
            </Card>
        </Grid>
    );
}

