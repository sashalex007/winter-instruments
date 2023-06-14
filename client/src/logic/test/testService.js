import { stripeData } from './testData.js'

export const testService = {
    getCategoryList: () => {
        return stripeData.categoryData.list
    },

    getCategoryProducts: (category) => {
        return stripeData.sortedProducts[category]
    },

    getSingleProduct: (productID) => {
        return stripeData.flatProducts[productID]
    },

    getTestShippingRate: (setShippingData, address, setLoading, setSuccess) => {
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