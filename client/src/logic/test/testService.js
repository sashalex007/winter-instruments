import {stripeData} from './testData.js'

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
}