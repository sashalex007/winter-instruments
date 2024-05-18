import { memUtilities } from "./memUtilities.js";
import { imgService } from "./imgService.js";
import { stripeService } from "../externalServices/stripeService.js";

const stripeData = {}
let syncComplete = false;

export const memoryService = {

    syncWithStripe: async (res = null) => {
        syncComplete = false;
        try {
            console.log('Syncing with Stripe...');
            const { products, prices } = await stripeService.getAllProductData();
            stripeData.images = await imgService.downloadImages(products);

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
        if (!stripeData.sortedProducts[category]) {

        } 
        res.json(stripeData.sortedProducts[category]);
    },

    getSingleProduct: (res, productID) => {
        productID = productID.substring(0, 19)
        console.log(productID)
        if (!syncComplete) return memoryService.syncInProgress(res);
        if (!stripeData.flatProducts[productID]) {
            return res.json({
                bucketedProductKeys: [], 
                bucketedProductMap: {}, 
                bucketedProductIDMap: {},
                notFound: true,
                flat: true
            })
        }
        res.json(stripeData.flatProducts[productID]);
    },

    getImage: (res, productID) => {
        productID = productID.substring(0, 19)
        if (!syncComplete) return memoryService.syncInProgress(res);
        const image = stripeData.images[productID]
        if (image) {
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(image, 'binary');
        } else {
            res.status(404).send('Image not found');
        }
    },

    getStripeData: (res) => {
        if (!syncComplete) return memoryService.syncInProgress(res);
        res.json(stripeData);
    },

    syncInProgress: (res) => {
        res.json({ error: 'Server loading...refresh in a few seconds' });
    }
}

