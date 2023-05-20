import React from 'react';
//ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
//components
import CatalogueItemTemplate from './catalogueItemTemplate';


export default function Catalogue({productCategoryList}) {
    return (
        <Container>
            <Typography gutterBottom variant="h4" component="div">
                Catalogue
            </Typography>
            <br></br>
            <Grid container spacing={3}>
                {productCategoryList.map(category => <CatalogueItemTemplate key={category.link} category={category}/>)}
            </Grid>
            <br></br>
        </Container>
    );
}