import { memUtilities } from "./memUtilities.js";
import { stripeService } from "../externalServices/stripeService.js";

const stripeData = {}
let syncComplete = false;

export const memoryService = {

    syncWithStripe: async (res = null) => {
        syncComplete = false;
        try {
            console.log('Syncing with Stripe...');
            const { products, prices } = await stripeService.getAllProductData();
            const productObject = memUtilities.mergeProductsAndPrices(prices, products);

            stripeData.sortedProducts = productObject.productCategoryMap;
            stripeData.flatProducts = productObject.flatProductList;
            stripeData.categoryData = { list: productObject.productCategoryList }
            syncComplete = true;
            console.log('Sync complete');
            if (res) res.json({ success: 'Sync complete' });  
        }
        catch (err) {
            err.message = err.message + ' -syncWithStripe'
            console.log(err);
            if (res) res.json({ error: err.message });
        }
    },

    getCategoryList: (res) => {
        if (!syncComplete) return memoryService.syncInProgress(res);
        res.json(stripeData.categoryData.list);
    },

    getCategoryProducts: (res, category) => {
        if (!syncComplete) return memoryService.syncInProgress(res);
        if (!stripeData.sortedProducts[category]) return res.json({ error: 'Category not found' })
        res.json(stripeData.sortedProducts[category]);
    },

    getSingleProduct: (res, productID) => {
        if (!syncComplete) return memoryService.syncInProgress(res);
        if (!stripeData.flatProducts[productID]) return res.json({ error: 'Product not found' })
        res.json(stripeData.flatProducts[productID]);
    },

    getStripeData: (res) => {
        if (!syncComplete) return memoryService.syncInProgress(res);
        res.json(stripeData);
    },

    syncInProgress: (res) => {
        res.json({ error: 'Server loading...refresh in a few seconds' });
    }
}

//dbApi.syncWithStripe();
//dbApi.getCategoryList();
//dbApi.getCategoryProducts('Under-sole canting');
