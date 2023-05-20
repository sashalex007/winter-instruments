import { getProducts, createCheckoutSession } from './stripeApi.js';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3001;
const jsonParser = bodyParser.json();
const app = express();

//launch server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
//serve static assets 
app.use(express.static(resolve(__dirname, '../client/build')));

//get products
app.get("/getproducts", (req, res) => {
  getProducts(res);
});
//create checkout session
app.post('/create-checkout-session', jsonParser, (req, res) => {
  createCheckoutSession(res, req.body)
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../client/build', 'index.html'));
});