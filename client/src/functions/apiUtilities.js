export const apiUtilities = {

    mergeProductsAndPrices: (prices, products) => {
        const priceObject = {}
        prices.forEach(price => {
            priceObject[price.id] = price.unit_amount;
        })
        let productCategoryMap = {}
        const productCategoryList = []
        products.forEach(product => {
            product.unit_amount = priceObject[product.default_price];
            const category = product.metadata.category;
            if (productCategoryMap[category] === undefined) {
                productCategoryList.push({ name: category, link: category.toLowerCase().replace(/ /g, '-') })
                productCategoryMap[category] = [product]
            }
            else {
                productCategoryMap[category].push(product)
            }
        })

        productCategoryMap = apiUtilities.bucketProductsByVariant(productCategoryList, productCategoryMap);
        return { productCategoryList, productCategoryMap };
    },
    
    bucketProductsByVariant: (productCategoryList, productCategoryMap) => {
        const bucketedProductCategoryMap = {}
        productCategoryList.forEach(category => {
            const productList = productCategoryMap[category.name]
            const bucketedProductMap = {}
            const bucketedProductKeys = []

            productList.forEach(product => {
                const metadata = product.metadata.name_variant.split('_')
                const bucket = metadata[0]
                if (metadata.length > 1) {
                    product.variant = metadata[1]
                }
                if (bucketedProductMap[bucket] === undefined) {
                    bucketedProductKeys.push(bucket)
                    bucketedProductMap[bucket] = [product]
                } else {
                    bucketedProductMap[bucket].push(product)
                }
            })
            bucketedProductCategoryMap[category.name] = { bucketedProductKeys, bucketedProductMap }
        })
        return bucketedProductCategoryMap;
    }
}
