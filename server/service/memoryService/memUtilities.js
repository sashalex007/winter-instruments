export const memUtilities = {

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

        const {bucketedProductCategoryMap, flatProductList} = memUtilities.bucketProductsByVariant(productCategoryList, productCategoryMap);
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
            const bucketedProductIDMap = {}

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

                bucketedProductIDMap[product.id] = bucket
                if (bucketedProductMap[bucket] === undefined) {
                    bucketedProductKeys.push(bucket)
                    bucketedProductMap[bucket] = [product]

                    flatProductMap[bucket] = flatProductList.length
                    flatProductList.push({
                        bucketedProductKeys: [bucket],
                        bucketedProductMap: { [bucket]: [product] },
                        bucketedProductIDMap: { [product.id]: bucket },
                        flat: true
                    })
                } else {
                    bucketedProductMap[bucket].push(product)
                    flatProductList[flatProductMap[bucket]].bucketedProductMap[bucket].push(product)
                    flatProductList[flatProductMap[bucket]].bucketedProductIDMap[product.id] = bucket
                }
            })
            bucketedProductCategoryMap[category.name] = { bucketedProductKeys, bucketedProductMap, bucketedProductIDMap }
        })


        const expandedFlatProductObject = {}
        for (let productObject of flatProductList) {
            const key = productObject.bucketedProductKeys[0]
            for (let variant of productObject.bucketedProductMap[key]) {
                expandedFlatProductObject[variant.id] = productObject
            }
        }
        return { bucketedProductCategoryMap, flatProductList: expandedFlatProductObject };
    }
}
