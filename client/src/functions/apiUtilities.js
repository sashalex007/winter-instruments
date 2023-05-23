export const apiUtilities = {

    mergeProductsAndPrices: (prices, products) => {
        const priceObject = {}
        prices.forEach(price => {
            priceObject[price.id] = price.unit_amount;
        })
        const productCategoryMap = {}
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

        const {bucketedProductCategoryMap, flatProductList} = apiUtilities.bucketProductsByVariant(productCategoryList, productCategoryMap);
        return { productCategoryList, productCategoryMap: bucketedProductCategoryMap, flatProductList };
    },
    
    bucketProductsByVariant: (productCategoryList, productCategoryMap) => {
        const flatProductList = []
        const flatProductMap = {}  
        const bucketedProductCategoryMap = {}
        productCategoryList.forEach(category => {
            const productList = productCategoryMap[category.name]
            const bucketedProductMap = {}
            const bucketedProductKeys = []

            productList.forEach(product => {
                let bucket = ''
                if (product.metadata.name_variant === undefined) {
                    bucket = product.name
                } else {
                    const metadata = product.metadata.name_variant.split('_')
                    bucket = metadata[0]
                    product.variant_title = metadata[1]
                    product.variant = metadata[2]
                }

                if (bucketedProductMap[bucket] === undefined) {
                    bucketedProductKeys.push(bucket)
                    bucketedProductMap[bucket] = [product]

                    flatProductMap[bucket] = flatProductList.length
                    flatProductList.push([product])
                } else {
                    bucketedProductMap[bucket].push(product)
                    flatProductList[flatProductMap[bucket]].push(product)
                }
            })
            bucketedProductCategoryMap[category.name] = { bucketedProductKeys, bucketedProductMap }
        })
        return {bucketedProductCategoryMap, flatProductList};
    }
}
