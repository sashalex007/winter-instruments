import { memApi } from './api/inMemoryStore.js';
import { api } from './api/api.js';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import bodyParser from 'body-parser';
import { port } from './api/variables.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonParser = bodyParser.json();
const app = express();

//sync with stripe
memApi.syncWithStripe();

//launch server
app.listen(port, () => {
  console.log(`Winter Instruments launched on ${port}`);
});
//serve static assets 
app.use(express.static(resolve(__dirname, '../client/build')));

//get category list
app.get("/get-category-list", (req, res) => {
  memApi.getCategoryList(res);
});

//get category products
app.post("/get-category-products", jsonParser, (req, res) => {
  memApi.getCategoryProducts(res, req.body.category);
});

//get single product
app.post("/get-single-product", jsonParser, (req, res) => {
  memApi.getSingleProduct(res, req.body.productID);
});

//get shipping rate
app.post('/get-shipping-rate', jsonParser, (req, res) => {
  api.getShippingAndCheckoutURL(res, req.body);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../client/build', 'index.html'));
});