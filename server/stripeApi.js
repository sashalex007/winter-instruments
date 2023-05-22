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
            res.json({ error: err.message });
        }
    },

    createCheckoutSession: async (res, items) => {
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: items,
                mode: 'payment',
                success_url: `${YOUR_DOMAIN}/payment-success`,
                cancel_url: `${YOUR_DOMAIN}/cart`,
                allow_promotion_codes: true,
                shipping_options: [{
                    shipping_rate_data: {
                        display_name: 'Address here',
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1000,
                            currency: 'USD',
                        }
                    }
                }]
            });
            res.json({ securePaymentLink: session.url });
        }
        catch (err) {
            res.json({ error: err.message });
        }
    }

}


