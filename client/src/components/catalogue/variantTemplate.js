import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, CardActionArea, CardActions } from '@mui/material';


export default function variantTemplate(props) {
    const product = props.product
    console.log(product)
    return (
        <Grid item xs>
            <Card elevation={5}  sx={{maxWidth: 600, minWidth: 250, height: '100%' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.images[0]}
                    alt={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>

                    some buttons here

                </CardActions>
            </Card>
        </Grid>
    );
}
