
export const Api = {
    getProducts: async (setProductList) => {
        const data = await fetch('/getproducts');
        const dataJson = await data.json();
        const prices = dataJson.prices;
        let products = dataJson.products;
        let priceObject = {}
        prices.forEach(price => {
            priceObject[price.id] = price.unit_amount / 100;
        })
        products.forEach(product => {
            product.unit_amount = priceObject[product.default_price];
        })
        setProductList(products);
    },

    createCheckoutSession: async (cartData) => {
        const data = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData)
        });
        const dataJson = await data.json();
        window.location.href = dataJson.securePaymentLink;
    }

} 
