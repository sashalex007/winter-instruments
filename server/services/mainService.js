import { stripeService } from './externalServices/stripeService.js';
import { easypostService } from './externalServices/easypostService.js';

export const mainService = {

    getShippingAndCheckoutURL: async (res, { address, items }) => {
        try {
            const verifiedProducts = await stripeService.verifyProducts(items)
            const verifiedAddress = await easypostService.verfifyAddress(address);
            const shippingRate = await easypostService.getShippingRates(verifiedAddress, verifiedProducts, items);
            const checkoutSessionURL = await stripeService.createCheckoutSession(items, verifiedAddress, shippingRate.rate);

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
            console.log(err);
            res.json({ error: err.message });
        }
    }
}