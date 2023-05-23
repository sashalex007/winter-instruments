import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
//ui
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useMediaQuery } from '@mui/material';
//logic
import { api } from './functions/api';
import CartObject from './functions/cartFunctionsAndData';
import ScrollToTop from './functions/scrollToTop';
//components
import ProductsLoading from './components/alerts/productsLoading';
import ErrorAlert from './components/alerts/errorAlert';
import NavBar from './components/navbar';
import Catalogue from './components/catalogue/catalogue';
import Contact from './components/contact';
import MainCart from './components/cart/mainCart/mainCart';
import PaymentSuccess from './components/cart/paymentSuccess';
import CategoryTemplate from './components/catalogue/categoryTemplate';
import { create } from '@mui/material/styles/createTransitions';

export const ErrorContext = React.createContext();

export default function App() {
  const cartObject = CartObject();
  const [error, setError] = useState({ open: false, message: '' });
  const [productObject, setProductObject] = useState({ productCategoryList: [], productCategoryMap: {}, flatProductList: [] });

  useEffect(() => {
    api.getProducts(setProductObject, setError)
  }, []);

  function createCategoryRoute(category, cartFunctions) {
    const productList = productObject.productCategoryMap[category.name];
    return (
      <Route exact path={category.link} key={category.link} element={
        < CategoryTemplate category={category} cartFunctions={cartFunctions} productList={productList} />
      }></Route>
    );
  }

  function createProductRoute(product, cartFunctions) {
    let productName = product[0].name;
    if ((product[0].metadata.name_variant !== undefined)) {
      productName = product[0].metadata.name_variant.split('_')[0];
    } 
    const productList = {
      bucketedProductMap: {},
      bucketedProductKeys: [productName]
    }
    productList.bucketedProductMap[productName] = product;
    
    function createEach(product, cartFunctions) {
      return (
        <Route exact path={product.id} key={product.id} element={
          < CategoryTemplate category={{name:''}} cartFunctions={cartFunctions} productList={productList} />
        }></Route>
      );
    }

    return (
      product.map(product => createEach(product, cartFunctions))
    );
  }

  const isXs = useMediaQuery("(max-width:600px)");
  const styleXs = { p: 0, mt: 7, mb: 7 };
  const styleSm = { p: 2, mt: 7, mb: 7 };
  return (
    <div className="App">
      <Container maxWidth="xl">
        <Box sx={isXs ? styleXs : styleSm}>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProductsLoading open={productObject.productCategoryList.length === 0} />

              <ErrorContext.Provider value={setError}>
                <Router>
                  <ScrollToTop />
                  <NavBar cartObject={cartObject}></NavBar>
                  <Routes>
                    <Route exact path='/' element={< Catalogue productCategoryList={productObject.productCategoryList} />}></Route>
                    <Route exact path='/contact' element={< Contact />}></Route>
                    <Route exact path='/cart' element={< MainCart cartObject={cartObject} />}></Route>
                    <Route exact path='/payment-success' element={< PaymentSuccess cartFunctions={cartObject.cartFunctions} />}></Route>
                    {productObject.productCategoryList.map(category => createCategoryRoute(category, cartObject.cartFunctions))}
                    {productObject.flatProductList.map(product => createProductRoute(product, cartObject.cartFunctions))}
                  </Routes>
                </Router>
              </ErrorContext.Provider>

              <ErrorAlert error={error} setError={setError}></ErrorAlert>

            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
