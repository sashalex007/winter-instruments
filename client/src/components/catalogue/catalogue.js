import React from 'react';
import { Link } from 'react-router-dom';
//ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import Divider from '@mui/material/Divider';
//components
import CatalogueItem from './catalogueItem';


export default function Catalogue({productCategoryList}) {
    return (
        <Container>
            <Typography gutterBottom variant="h4" component="div">
                Catalogue
            </Typography>
            <Divider />
            <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                All parts are fully or partially 3D printed from carbon-fiber reinforced polycarbonate or high density PETG, colour may vary. &nbsp;
                <Typography variant="body2" color="text.secondary" component={Link} to={'/contact'}>Contact me for custom part requests!</Typography>
 
            </Typography>
            <br></br>
            <Grid container spacing={3}>
                {productCategoryList.map(category => <CatalogueItem key={category.link} category={category}/>)}
            </Grid>
            <br></br>
        </Container>
    );
}