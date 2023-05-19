const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const PORT = process.env.PORT || 3001;
const app = express();
const stripe = require('stripe')('sk_test_51N8o0fC48L00qx1Q9wI1tdRtvFQA3iiERKleCAhYaDVhviObSZkfkjKnu5vRXQl4AbC69Xw1ihZo7he3qjLw381Z00qERUorgu');
const YOUR_DOMAIN = 'http://localhost:3001';


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

app.post('/create-checkout-session', jsonParser, async (req, res) => {
  let items = req.body;
  if (!Array.isArray(items)) {
    console.log('Invalid items');
    return
  }

  items.forEach(item => {
    delete item.unit_amount;
    delete item.name;
  });
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/payment-success`,
      cancel_url: `${YOUR_DOMAIN}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      }
    });
    res.json({securePaymentLink: session.url})
  } catch (err) {
    console.log(err); // TypeError: failed to fetch
  }
});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});