const cache = {categoryProducts: {}, singleProducts: {}}

export const api = {

    getCategoryList: async (setCategoryList, setError) => {
        try {
            const data = await fetch('/get-category-list');
            const dataJson = await data.json();
            if (dataJson.error) throw new Error(dataJson.error);
            setCategoryList(dataJson);
        }
        catch (err) {
            console.log(err.message)
            setError({ open: true, message: err.message });
        }
    },

    getCategoryProducts: async (setProductObject, category, setError) => {
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
            console.log(err.message)
            setError({ open: true, message: err.message });
        }
    },

    getSingleProduct: async (setProductObject, productID, setError) => {
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
            console.log(err.message)
            setError({ open: true, message: err.message });
        }
    },

    getShippingRate: async (setShippingData, address, cartData, setError, setLoading, setSuccess) => {
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
            console.log(err.message)
            setLoading(false);
            setError({ open: true, message: err.message });
        }
    },

    getTestShippingRate: async (setShippingData, address, setLoading, setSuccess) => {
        const shippingData = {
            shipping: {
                name: 'Shipping',
                price: 'shipping',
                info: 'test',
                unit_amount: 1445,
                quantity: 1,
                address: address
            },
            isShipping: true
        }
        setShippingData(shippingData);
        setLoading(false);
        setSuccess(true);
    },
}





