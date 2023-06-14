import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
//ui
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
//logic
import { api } from './logic/api';
import CartService from './logic/cartService';
import ScrollToTop from './logic/scrollToTop';
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
  const cartService = CartService();
  const [error, setError] = useState({ open: false, message: '' });
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    api.getCategoryList(setCategoryList, setError)
  }, []);

  function createCategoryRoute(category, cartFunctions) {
    return (
      <Route exact path={category.link} key={category.link} element={
        < CategoryTemplate category={category} cartFunctions={cartFunctions} />
      }></Route>
    );
  }

  function BackButton() {
    const navigate = useNavigate();
    const location = useLocation()
    function goBack() {
      navigate(-1, { replace: true });
    }
    if (location.pathname === '/' || location.key === 'default') {
      return (<br></br>)
    }
    return (
      <Container>
        <Stack direction="row" spacing={2} onClick={goBack}>
          <Button variant="text" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Stack>
      </Container>
    )
  }

  const isXs = useMediaQuery("(max-width:600px)");
  const styleXs = { p: 0, mt: 8, mb: 7 };
  const styleSm = { p: 2, mt: 8, mb: 7 };
  return (
    <div className="App">
      <Container maxWidth="xl">
        <Box sx={isXs ? styleXs : styleSm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
          
              <ErrorContext.Provider value={setError}>
                <Router>
                  <ScrollToTop />
                  <NavBar cartObject={cartService}></NavBar>
                  <BackButton />
                  <Routes>
                    <Route exact path='/' element={< Catalogue productCategoryList={categoryList} />}></Route>
                    <Route exact path='/contact' element={< Contact />}></Route>
                    <Route exact path='/cart' element={< MainCart cartObject={cartService} />}></Route>
                    <Route exact path='/payment-success' element={< PaymentSuccess cartFunctions={cartService.cartFunctions} />}></Route>
                    {categoryList.map(category => createCategoryRoute(category, cartService.cartFunctions))}
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
