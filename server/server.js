const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const stripe = require('stripe')('sk_test_51N8o0fC48L00qx1Q9wI1tdRtvFQA3iiERKleCAhYaDVhviObSZkfkjKnu5vRXQl4AbC69Xw1ihZo7he3qjLw381Z00qERUorgu');

async function getProducts() {
  const products = await stripe.products.list({});
  const prices = await stripe.prices.list({});
  return {
    products: products.data,
    prices: prices.data
  };
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/getproducts", (req, res) => {
  getProducts().then((products) => {
    res.json(products);
  })
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});