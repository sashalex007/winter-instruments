import { testService } from './test/testService'
const test = true

const cache = { categoryProducts: {}, singleProducts: {} }

export const api = {

    getCategoryList: async (setCategoryList, setError) => {
        if (test) return setCategoryList(testService.getCategoryList())

        try {
            const data = await fetch('/get-category-list');
            const dataJson = await data.json();
            if (dataJson.error) throw new Error(dataJson.error);
            setCategoryList(dataJson);
        }
        catch (err) {
            api.handleError(err, setError);
        }
    },

    getCategoryProducts: async (setProductObject, category, setError) => {
        if (test) return setProductObject(testService.getCategoryProducts(category))

        if (cache.categoryProducts[category]) return setProductObject(cache.categoryProducts[category])
        try {
            const data = await fetch('/get-category-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category: category })
            });
            const dataJson = await data.json();
            if (dataJson.error) throw new Error(dataJson.error);
            cache.categoryProducts[category] = dataJson;
            setProductObject(dataJson);
        }
        catch (err) {
            api.handleError(err, setError);
        }
    },

    getSingleProduct: async (setProductObject, productID, setError) => {
        if (test) return setProductObject(testService.getSingleProduct(productID))

        if (cache.singleProducts[productID]) return setProductObject(cache.singleProducts[productID])
        try {
            const data = await fetch('/get-single-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productID: productID })
            });
            const dataJson = await data.json();
            if (dataJson.error) throw new Error(dataJson.error);
            cache.singleProducts[productID] = dataJson;
            setProductObject(dataJson);
        }
        catch (err) {
            api.handleError(err, setError);
        }
    },

    getShippingRate: async (setShippingData, address, cartData, setError, setLoading, setSuccess) => {
        if (test) testService.getTestShippingRate(setShippingData, address, setLoading, setSuccess)

        const shippingRateObject = { address: address, items: cartData }
        try {
            const data = await fetch('/get-shipping-rate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shippingRateObject)
            });
            const dataJson = await data.json();
            if (dataJson.error) throw new Error(dataJson.error);
            setShippingData(dataJson);
            setLoading(false);
            setSuccess(true);
        }
        catch (err) {
            setLoading(false);
            api.handleError(err, setError);
        }
    },

    handleError: (err, setError) => {
        console.log(err.message)
        setError({ open: true, message: err.message });
    }

}





