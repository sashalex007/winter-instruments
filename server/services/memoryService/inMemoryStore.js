import { memUtilities } from "./memUtilities.js";
import { stripeService } from "../externalServices/stripeService.js";

const stripeData = {}
let syncComplete = false;

export const memoryService = {

    syncWithStripe: async () => {
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
        }
        catch (err) {
            err.message = err.message + ' -syncWithStripe'
            console.log(err);
        }
    },

    getCategoryList: (res) => {
        if (!syncComplete) return memoryService.syncInProgress(res);
        res.json(stripeData.categoryData.list);
    },

    getCategoryProducts: (res, category) => {
        if (!syncComplete) return memoryService.syncInProgress(res);
        res.json(stripeData.sortedProducts[category]);
    },

    getSingleProduct: (res, productID) => {
        if (!syncComplete) return memoryService.syncInProgress(res);
        res.json(stripeData.flatProducts[productID]);
    },

    syncInProgress: (res) => {
        res.json({ error: 'Server loading...refresh in a few seconds' });
    }
}

//dbApi.syncWithStripe();
//dbApi.getCategoryList();
//dbApi.getCategoryProducts('Under-sole canting');
