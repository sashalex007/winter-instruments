import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import ProductTemplate from '../productTemplate';

export default function UnderSole(props) {
    const productList = props.productList
    const categories = {}

    productList.forEach(product => {
        let metadata = product.metadata.category.split('_')
        let category = metadata[0]
        if (metadata.length > 1) {
            product.variant = metadata[1]
        }
        if (categories[category] === undefined) {
            categories[category] = [product]
        } else { 
            categories[category].push(product)
        }
    })

    const categoriesKeys = Object.keys(categories)
    const categoriesList = []
    for (let key of categoriesKeys) {
        categoriesList.push([key ,categories[key]])
    }
    
    return (

        <Container>
            <Typography gutterBottom variant="h4" component="div">
                Under-sole canting
            </Typography>

            <br></br>
            <Grid container spacing={3}>
                {categoriesList.map(block => ProductTemplate(block))}
            </Grid>
            <br></br>
        </Container>
    );
}