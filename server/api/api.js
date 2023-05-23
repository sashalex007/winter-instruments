import { stripeApi } from './stripeApi.js';
import { easypostApi } from './easypostApi.js';

export const api = {
    getShippingAndCheckoutURL: async (res, { address, items }) => {
        try {
            const verifiedProducts = await stripeApi.verifyProducts(items)
            const verifiedAddress = await easypostApi.verfifyAddress(address);
            const shippingRate = await easypostApi.getShippingRates(verifiedAddress, verifiedProducts, items);
            const checkoutSessionURL = await stripeApi.createCheckoutSession(items, verifiedAddress, shippingRate.rate);

            const checkoutData = {
                shipping: {
                    name: 'Shipping',
                    price: 'shipping',
                    unit_amount: shippingRate.rate,
                    info: shippingRate.info,
                    estimated_days: shippingRate.estimated_days,
                    weight_oz: shippingRate.weight_oz,
                    quantity: 1,
                },
                isShipping: true,
                checkoutSessionURL: checkoutSessionURL
            }
            res.json(checkoutData);
        }
        catch (err) {
            console.log(err.message);
            res.json({ error: err.message });
        }
    }
}