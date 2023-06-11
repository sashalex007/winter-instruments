import { dbService } from "./mongoDB.js";
import { dbUtilities } from "./dbUtilities.js";
import { stripeApi } from "./stripeApi.js";

export const dbApi = {

    syncWithStripe: async () => {
        try {
            console.log('Syncing with Stripe...');
            const { products, prices } = await stripeApi.getAllProductData();
            const productObject = dbUtilities.mergeProductsAndPrices(prices, products);
            await dbService.cleanCollection('StripeData', 'sortedProducts');
            await dbService.cleanCollection('StripeData', 'flatProducts');
            await dbService.cleanCollection('StripeData', 'categoryData');
            await dbService.insertMany('StripeData', 'sortedProducts', productObject.productCategoryMap);
            await dbService.insertMany('StripeData', 'flatProducts', productObject.flatProductList);
            await dbService.insert('StripeData', 'categoryData', { list: productObject.productCategoryList });
            console.log('Sync complete');
        }
        catch (err) {
            err.message = err.message + ' -syncWithStripe'
            console.log(err);
        }
    },

    getCategoryList: async (res) => {
        try {
            const result = await dbService.find('StripeData', 'categoryData', {});
            res.json(result[0].list);
        }
        catch (err) {
            err.message = err.message + ' -getCategoryList'
            console.log(err);
            res.json({ error: err.message });
        }
    },

    getCategoryProducts: async (res, category) => {
        const filter = {};
        filter[category] = { $exists: true };
        try {
            const result = await dbService.find('StripeData', 'sortedProducts', filter);
            res.json(result[0][category]);
        }
        catch (err) {
            err.message = err.message + ' -getCategoryProducts'
            console.log(err);
            res.json({ error: err.message });
        }
    },

    getSingleProduct: async (res, productID) => {
        const filter = {};
        filter[productID] = { $exists: true };
        try {
            const result = await dbService.find('StripeData', 'flatProducts', filter);
            res.json(result[0][productID]);
        }
        catch (err) {
            err.message = err.message + ' -getSingleProduct'
            console.log(err);
            res.json({ error: err.message });
        }
    },


}

//dbApi.syncWithStripe();
//dbApi.getCategoryList();
//dbApi.getCategoryProducts('Under-sole canting');
