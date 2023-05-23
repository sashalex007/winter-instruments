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
//components
import ErrorAlert from './components/alerts/errorAlert';
import NavBar from './components/navbar';
import Catalogue from './components/catalogue/catalogue';
import Contact from './components/contact';
import MainCart from './components/cart/mainCart/mainCart';
import PaymentSuccess from './components/cart/paymentSuccess';
import CategoryTemplate from './components/catalogue/categoryTemplate';

export const ErrorContext = React.createContext();

export default function App() {
  const cartObject = CartObject();
  const [error, setError] = useState({ open: false, message: '' });
  const [productObject, setProductObject] = useState({ productCategoryList: [], productCategoryMap: {} });

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

              <ErrorContext.Provider value={setError}>
                <Router>
                  <NavBar cartObject={cartObject}></NavBar>
                  <Routes>
                    <Route exact path='/' element={< Catalogue productCategoryList={productObject.productCategoryList} />}></Route>
                    <Route exact path='/contact' element={< Contact />}></Route>
                    <Route exact path='/cart' element={< MainCart cartObject={cartObject} />}></Route>
                    <Route exact path='/payment-success' element={< PaymentSuccess cartFunctions={cartObject.cartFunctions} />}></Route>
                    {productObject.productCategoryList.map(category => createCategoryRoute(category, cartObject.cartFunctions))}
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
