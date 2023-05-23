import Stripe from 'stripe';
const stripe = Stripe('sk_test_51N8o0fC48L00qx1Q9wI1tdRtvFQA3iiERKleCAhYaDVhviObSZkfkjKnu5vRXQl4AbC69Xw1ihZo7he3qjLw381Z00qERUorgu');
const YOUR_DOMAIN = 'http://localhost:3001';

export const stripeApi = {

    getProducts: async (res) => {
        try {
            const products = await stripe.products.list({});
            const prices = await stripe.prices.list({});
            if (products.length === 0 || prices.length === 0) //stripe sends empty product or prices if request fails
                throw new Error('Failed to get products - stripe api error');
            res.json({ products: products.data, prices: prices.data });
        }
        catch (err) {
            console.log(err.message);
            res.json({ error: err.message });
        }
    },

    verifyProducts: async (items) => {
        const productIdList = items.map(item => item.id);
        try {
            const products = await stripe.products.list({
                ids: productIdList
            });
            if (products.data.length === 0) //stripe sends empty product or prices if request fails
                throw new Error('Failed to get products - stripe api error');
            const verifiedProducts = products.data
            if (verifiedProducts.length !== items.length) throw new Error('Product verification failed')
            return verifiedProducts
        }
        catch (err) {
            throw err;
        }
    },

    createCheckoutSession: async (items, verifiedAddress, shippingRate) => {
        const shippingDescription = (
            verifiedAddress.street1 + ' ' +
            verifiedAddress.street2 + ' ' +
            verifiedAddress.city + ' ' +
            verifiedAddress.state + ' ' +
            verifiedAddress.country + ' ' +
            verifiedAddress.zip + '- ' +
            verifiedAddress.name
        ).substring(0, 100);

        const cleanedItems = []
        items.forEach(item => {
            cleanedItems.push({
                price: item.price,
                quantity: item.quantity
            })
        });
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: cleanedItems,
                mode: 'payment',
                success_url: `${YOUR_DOMAIN}/payment-success`,
                cancel_url: `${YOUR_DOMAIN}/cart`,
                allow_promotion_codes: true,
                metadata: {
                    city: verifiedAddress.city,
                    country: verifiedAddress.country,
                    line1: verifiedAddress.street1,
                    line2: verifiedAddress.street2,
                    postal_code: verifiedAddress.zip,
                    state: verifiedAddress.state,
                },
                shipping_options: [{
                    shipping_rate_data: {
                        display_name: shippingDescription,
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: shippingRate * 100,
                            currency: 'USD',
                        }
                    }
                }]
            });
            return session.url;
        }
        catch (err) {
            throw err
        }
    }

}


