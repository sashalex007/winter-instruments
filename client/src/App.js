import React, { useEffect } from 'react';
import ResponsiveAppBar from './components/navbar'
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useMediaQuery } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useState } from 'react';

import Catalogue from './components/catalogue/catalogue';
import Contact from './components/contact';
import Cart from './components/cart/viewCart';
import UnderSole from './components/catalogue/category/underSole';

let testCart = [
  {id: 1, qty: 1, name: 'Plate', price: 10},
  {id: 2, qty: 2, name: 'Cuff insert', price: 20},
  {id: 3, qty: 3, name: 'Sidewall cutter', price: 30}
]
export default function App() {
  const [productList, setProductList] = useState();
  useEffect(() => {
    fetch('/getproducts')
      .then((res) => res.json())
      .then((data) => {
        const prices = data.prices;
        let products = data.products;
        let priceObject = {}
        prices.forEach(price => {
          priceObject[price.id] = price.unit_amount/100;
        })
        products.forEach(product => {
          product.unit_amount = priceObject[product.default_price];
        })
        setProductList(products);
      });
  }, []);
  
  const [cartData, setCartData] = useState(testCart);

  const deleteCartItem = (id) => {
    setCartData(cartData.filter(item => item.id !== id));
  }

  const editQty = (id, qty) => {
    setCartData(cartData.map(item => {
      if (item.id === id) {
        item.qty = qty;
      }
      return item;
    }))
  }

  const getCartTotal = () => {
    let total = 0;
    cartData.forEach(item => {
      total += item.price * item.qty;
    })
    return total;
  }

  const getCartSize = () => {
    let total = 0;
    cartData.forEach(item => {
      total += item.qty;
    })
    return total;
  }

  const cartFunctions = {
    deleteCartItem: deleteCartItem,
    editQty: editQty,
    getCartTotal: getCartTotal,
    getCartSize: getCartSize
  }

  const navItems = [
    {
      name: 'Catalogue',
      link: '/'
    },
    {
      name: 'Cart',
      link: '/cart'
    },
    {
      name: 'Contact',
      link: '/contact'
    }
  ]
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

              <Router>
              <ResponsiveAppBar data={navItems} cartData={cartData} cartFunctions={cartFunctions}></ResponsiveAppBar>
                <Routes>
                  <Route exact path='/' element={< Catalogue/>}></Route>
                  <Route exact path='/contact' element={< Contact />}></Route>
                  <Route exact path='/cart' element={< Cart cartData={cartData} cartFunctions={cartFunctions}/>}></Route>
                  <Route exact path='/undersole' element={< UnderSole cartData={cartData} cartFunctions={cartFunctions} productList={productList}/>}></Route>
                </Routes>
              </Router>

            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
