import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
//ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
//logic
import { imageMap } from '../../static/img/imageMap';

export default function CatalogueItem({ category }) {
    const [imageLoading, setImageLoading] = useState(true)
    const image = imageMap[category.link]

    return (
        <Grid item xs>
            <Card elevation={5} sx={{ maxWidth: 600, minWidth: 250, height: '100%' }}>
                <CardActionArea component={Link} to={category.link}>

                    {imageLoading && (
                        <Skeleton animation="wave" height={140} variant="rectangular" />
                    )}

                    <CardMedia
                        style={{ display: imageLoading ? "none" : "block" }}
                        component="img"
                        height="140"
                        image={image}
                        onLoad={() => { setImageLoading(false) }}
                        alt={category.name}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {imageLoading ? <Skeleton /> : category.name}
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

