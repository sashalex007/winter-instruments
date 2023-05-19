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

import { Api } from './api';
import Catalogue from './components/catalogue/catalogue';
import Contact from './components/contact';
import Cart from './components/cart/viewCart';
import UnderSole from './components/catalogue/category/underSole';
import PaymentSuccess from './components/cart/paymentSuccess';


let testProducts = { "products": [{ "id": "prod_NugMYxcEOi45iY", "object": "product", "active": true, "attributes": [], "created": 1684355444, "default_price": "price_1N8qzhC48L00qx1QPMEmchTT", "description": "Right +0.5 / Left -0.5", "images": ["https://files.stripe.com/links/MDB8YWNjdF8xTjhvMGZDNDhMMDBxeDFRfGZsX3Rlc3RfSVRUZlAzV0h3S28zb01xaEJsU080c1hk001rJUaG2h"], "livemode": false, "metadata": { "category": "Shim set_+0.5" }, "name": "Shim set (+0.5deg)", "package_dimensions": null, "shippable": null, "statement_descriptor": null, "tax_code": null, "type": "service", "unit_label": null, "updated": 1684358178, "url": null }, { "id": "prod_NugGyx8Q9ajZzQ", "object": "product", "active": true, "attributes": [], "created": 1684355093, "default_price": "price_1N8qu2C48L00qx1QWGXIu8Dq", "description": "Right -1deg / Left +1deg. Two pieces.", "images": ["https://files.stripe.com/links/MDB8YWNjdF8xTjhvMGZDNDhMMDBxeDFRfGZsX3Rlc3RfUFdvWjFjbDB5VWhMeXBmcThRNDRubGlh00SckX0ZfM"], "livemode": false, "metadata": { "category": "Shim set_-1" }, "name": "Shim set (-1deg)", "package_dimensions": null, "shippable": null, "statement_descriptor": null, "tax_code": null, "type": "service", "unit_label": null, "updated": 1684358164, "url": null }, { "id": "prod_Nudr1MGBbn9L2J", "object": "product", "active": true, "attributes": [], "created": 1684346170, "default_price": "price_1N8oa6C48L00qx1Qh9dc2Rgp", "description": "Right +1deg / Left -1deg. Two pieces.", "images": ["https://files.stripe.com/links/MDB8YWNjdF8xTjhvMGZDNDhMMDBxeDFRfGZsX3Rlc3Rfd1oxYVJZVWhnZ0x5Q1I5Z05pNm92bFlO002oLlhT8X"], "livemode": false, "metadata": { "category": "Shim set_+1" }, "name": "Shim set (+1deg)", "package_dimensions": null, "shippable": null, "statement_descriptor": null, "tax_code": null, "type": "service", "unit_label": null, "updated": 1684358199, "url": null }, { "id": "prod_NudkKEP5YBQvMN", "object": "product", "active": true, "attributes": [], "created": 1684345717, "default_price": "price_1N8oSoC48L00qx1QzmRWCUFb", "description": "Set of 3mm thick treaded lifters. Four pieces.", "images": ["https://files.stripe.com/links/MDB8YWNjdF8xTjhvMGZDNDhMMDBxeDFRfGZsX3Rlc3RfdnFxb3VDQjJSWWp4WDA4WkpzZkNWcVY500e86sAzNu"], "livemode": false, "metadata": { "category": "Lifter set_3" }, "name": "Lifter set (3mm)", "package_dimensions": null, "shippable": null, "statement_descriptor": null, "tax_code": null, "type": "service", "unit_label": null, "updated": 1684358231, "url": null }], "prices": [{ "id": "price_1N8qzhC48L00qx1QPMEmchTT", "object": "price", "active": true, "billing_scheme": "per_unit", "created": 1684355445, "currency": "usd", "custom_unit_amount": null, "livemode": false, "lookup_key": null, "metadata": {}, "nickname": null, "product": "prod_NugMYxcEOi45iY", "recurring": null, "tax_behavior": "unspecified", "tiers_mode": null, "transform_quantity": null, "type": "one_time", "unit_amount": 2000, "unit_amount_decimal": "2000" }, { "id": "price_1N8qu2C48L00qx1QWGXIu8Dq", "object": "price", "active": true, "billing_scheme": "per_unit", "created": 1684355094, "currency": "usd", "custom_unit_amount": null, "livemode": false, "lookup_key": null, "metadata": {}, "nickname": null, "product": "prod_NugGyx8Q9ajZzQ", "recurring": null, "tax_behavior": "unspecified", "tiers_mode": null, "transform_quantity": null, "type": "one_time", "unit_amount": 2000, "unit_amount_decimal": "2000" }, { "id": "price_1N8oa6C48L00qx1Qh9dc2Rgp", "object": "price", "active": true, "billing_scheme": "per_unit", "created": 1684346170, "currency": "usd", "custom_unit_amount": null, "livemode": false, "lookup_key": null, "metadata": {}, "nickname": null, "product": "prod_Nudr1MGBbn9L2J", "recurring": null, "tax_behavior": "unspecified", "tiers_mode": null, "transform_quantity": null, "type": "one_time", "unit_amount": 2000, "unit_amount_decimal": "2000" }, { "id": "price_1N8oSoC48L00qx1QzmRWCUFb", "object": "price", "active": true, "billing_scheme": "per_unit", "created": 1684345718, "currency": "usd", "custom_unit_amount": null, "livemode": false, "lookup_key": null, "metadata": {}, "nickname": null, "product": "prod_NudkKEP5YBQvMN", "recurring": null, "tax_behavior": "unspecified", "tiers_mode": null, "transform_quantity": null, "type": "one_time", "unit_amount": 3000, "unit_amount_decimal": "3000" }] }

export default function App() {
  // const prices = testProducts.prices;
  // let products = testProducts.products;
  // let priceObject = {}
  // prices.forEach(price => {
  //   priceObject[price.id] = price.unit_amount / 100;
  // })
  // products.forEach(product => {
  //   product.unit_amount = priceObject[product.default_price];
  // })

  const [productList, setProductList] = useState([]);
  useEffect(() => {
    Api.getProducts(setProductList).catch(console.error);
  }, []);

  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const localCartData = JSON.parse(localStorage.getItem('cartData'));
    if (localCartData) {
     setCartData(localCartData);
    }
  }, []);

  const saveCartData = (cartData) => {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }

  const deleteCartData = () => { 
    localStorage.removeItem('cartData');
    setCartData([]);
  }

  const addCartItem = (product) => {
    let newCartData = [...cartData];
    let found = false;
    newCartData.forEach(item => {
      if (item.price === product.price) {
        item.quantity++;
        found = true;
      }
    })
    if (!found) {
      newCartData.push({
        name: product.name,
        price: product.price,
        unit_amount: product.unit_amount,
        quantity: 1
      })
    }

    setCartData(newCartData);
    saveCartData(newCartData);
  }

  const deleteCartItem = (priceID) => {
    const newCartData = cartData.filter(item => item.price !== priceID);
    setCartData(newCartData);
    saveCartData(newCartData);
  }

  const editQty = (priceID, qty) => {
    const newCartData = cartData.map(item => {
      if (item.price === priceID) {
        item.quantity = qty;
      }
      return item;
    })
    setCartData(newCartData);
    saveCartData(newCartData);
  }

  const getCartTotal = () => {
    let total = 0;
    cartData.forEach(item => {
      total += item.unit_amount * item.quantity;
    })
    return total;
  }

  const getCartSize = () => {
    let total = 0;
    cartData.forEach(item => {
      total += item.quantity;
    })
    return total;
  }

  const cartFunctions = {
    deleteCartItem: deleteCartItem,
    addCartItem: addCartItem,
    editQty: editQty,
    getCartTotal: getCartTotal,
    getCartSize: getCartSize,
    deleteCartData: deleteCartData
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
                  <Route exact path='/' element={< Catalogue />}></Route>
                  <Route exact path='/contact' element={< Contact />}></Route>
                  <Route exact path='/cart' element={< Cart cartData={cartData} cartFunctions={cartFunctions} />}></Route>
                  <Route exact path='/undersole' element={< UnderSole cartData={cartData} cartFunctions={cartFunctions} productList={productList} />}></Route>
                  <Route exact path='/payment-success' element={< PaymentSuccess cartFunctions={cartFunctions} />}></Route>
                </Routes>
              </Router>

            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
