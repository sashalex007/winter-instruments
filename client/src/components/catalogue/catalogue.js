import * as React from 'react';
import Typography from '@mui/material/Typography';
import CatalogueTemplate from './catalogueTemplate';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import getCatalogueData from '../../staticData/catalogueData'

export default function Catalogue() {

    let catalogueData = getCatalogueData()

    return (

        <Container>

            <Typography gutterBottom variant="h4" component="div">
                Catalogue
            </Typography>

            <br></br>
            <Grid container spacing={3}>
                {catalogueData.map(block => CatalogueTemplate(block))}
            </Grid>
            <br></br>
        </Container>
    );
}