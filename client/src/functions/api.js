import { apiUtilities } from "./apiUtilities";

const test = false

export const api = {

    getTestProducts: (setProductObject) => {
        let testProducts = { "products": [{ "id": "prod_NvPzTtf3dl6xIU", "object": "product", "active": true, "attributes": [], "created": 1684525169, "default_price": "price_1N9Z9CC48L00qx1QeHE7xlhc", "description": "Fischer cuff insert (3mm offset). Four pieces. ", "images": [], "livemode": false, "metadata": { "category": "Cuff canting", "name_variant": "Fischer cuff insert set_3mm" }, "name": "Fischer cuff insert set (3mm offset)", "package_dimensions": null, "shippable": null, "statement_descriptor": null, "tax_code": null, "type": "service", "unit_label": null, "updated": 1684525170, "url": null }, { "id": "prod_NugMYxcEOi45iY", "object": "product", "active": true, "attributes": [], "created": 1684355444, "default_price": "price_1N8qzhC48L00qx1QPMEmchTT", "description": "Right +0.5 / Left -0.5", "images": ["https://files.stripe.com/links/MDB8YWNjdF8xTjhvMGZDNDhMMDBxeDFRfGZsX3Rlc3RfSVRUZlAzV0h3S28zb01xaEJsU080c1hk001rJUaG2h"], "livemode": false, "metadata": { "category": "Under-sole canting", "name_variant": "Shim set_+0.5" }, "name": "Shim set (+0.5deg)", "package_dimensions": null, "shippable": null, "statement_descriptor": null, "tax_code": null, "type": "service", "unit_label": null, "updated": 1684524504, "url": null }, { "id": "prod_NugGyx8Q9ajZzQ", "object": "product", "active": true, "attributes": [], "created": 1684355093, "default_price": "price_1N8qu2C48L00qx1QWGXIu8Dq", "description": "Right -1deg / Left +1deg. Two pieces.", "images": ["https://files.stripe.com/links/MDB8YWNjdF8xTjhvMGZDNDhMMDBxeDFRfGZsX3Rlc3RfUFdvWjFjbDB5VWhMeXBmcThRNDRubGlh00SckX0ZfM"], "livemode": false, "metadata": { "category": "Under-sole canting", "name_variant": "Shim set_-1" }, "name": "Shim set (-1deg)", "package_dimensions": null, "shippable": null, "statement_descriptor": null, "tax_code": null, "type": "service", "unit_label": null, "updated": 1684524544, "url": null }, { "id": "prod_Nudr1MGBbn9L2J", "object": "product", "active": true, "attributes": [], "created": 1684346170, "default_price": "price_1N8oa6C48L00qx1Qh9dc2Rgp", "description": "Right +1deg / Left -1deg. Two pieces.", "images": ["https://files.stripe.com/links/MDB8YWNjdF8xTjhvMGZDNDhMMDBxeDFRfGZsX3Rlc3Rfd1oxYVJZVWhnZ0x5Q1I5Z05pNm92bFlO002oLlhT8X"], "livemode": false, "metadata": { "category": "Under-sole canting", "name_variant": "Shim set_+1" }, "name": "Shim set (+1deg)", "package_dimensions": null, "shippable": null, "statement_descriptor": null, "tax_code": null, "type": "service", "unit_label": null, "updated": 1684524589, "url": null }, { "id": "prod_NudkKEP5YBQvMN", "object": "product", "active": true, "attributes": [], "created": 1684345717, "default_price": "price_1N8oSoC48L00qx1QzmRWCUFb", "description": "Set of 3mm thick treaded lifters. Four pieces.", "images": ["https://files.stripe.com/links/MDB8YWNjdF8xTjhvMGZDNDhMMDBxeDFRfGZsX3Rlc3RfdnFxb3VDQjJSWWp4WDA4WkpzZkNWcVY500e86sAzNu"], "livemode": false, "metadata": { "category": "Under-sole canting", "name_variant": "Lifter set_3" }, "name": "Lifter set (3mm)", "package_dimensions": null, "shippable": null, "statement_descriptor": null, "tax_code": null, "type": "service", "unit_label": null, "updated": 1684524619, "url": null }], "prices": [{ "id": "price_1N9Z9CC48L00qx1QeHE7xlhc", "object": "price", "active": true, "billing_scheme": "per_unit", "created": 1684525170, "currency": "usd", "custom_unit_amount": null, "livemode": false, "lookup_key": null, "metadata": {}, "nickname": null, "product": "prod_NvPzTtf3dl6xIU", "recurring": null, "tax_behavior": "unspecified", "tiers_mode": null, "transform_quantity": null, "type": "one_time", "unit_amount": 1000, "unit_amount_decimal": "1000" }, { "id": "price_1N8qzhC48L00qx1QPMEmchTT", "object": "price", "active": true, "billing_scheme": "per_unit", "created": 1684355445, "currency": "usd", "custom_unit_amount": null, "livemode": false, "lookup_key": null, "metadata": {}, "nickname": null, "product": "prod_NugMYxcEOi45iY", "recurring": null, "tax_behavior": "unspecified", "tiers_mode": null, "transform_quantity": null, "type": "one_time", "unit_amount": 2000, "unit_amount_decimal": "2000" }, { "id": "price_1N8qu2C48L00qx1QWGXIu8Dq", "object": "price", "active": true, "billing_scheme": "per_unit", "created": 1684355094, "currency": "usd", "custom_unit_amount": null, "livemode": false, "lookup_key": null, "metadata": {}, "nickname": null, "product": "prod_NugGyx8Q9ajZzQ", "recurring": null, "tax_behavior": "unspecified", "tiers_mode": null, "transform_quantity": null, "type": "one_time", "unit_amount": 2000, "unit_amount_decimal": "2000" }, { "id": "price_1N8oa6C48L00qx1Qh9dc2Rgp", "object": "price", "active": true, "billing_scheme": "per_unit", "created": 1684346170, "currency": "usd", "custom_unit_amount": null, "livemode": false, "lookup_key": null, "metadata": {}, "nickname": null, "product": "prod_Nudr1MGBbn9L2J", "recurring": null, "tax_behavior": "unspecified", "tiers_mode": null, "transform_quantity": null, "type": "one_time", "unit_amount": 2000, "unit_amount_decimal": "2000" }, { "id": "price_1N8oSoC48L00qx1QzmRWCUFb", "object": "price", "active": true, "billing_scheme": "per_unit", "created": 1684345718, "currency": "usd", "custom_unit_amount": null, "livemode": false, "lookup_key": null, "metadata": {}, "nickname": null, "product": "prod_NudkKEP5YBQvMN", "recurring": null, "tax_behavior": "unspecified", "tiers_mode": null, "transform_quantity": null, "type": "one_time", "unit_amount": 3000, "unit_amount_decimal": "3000" }] }
        setProductObject(apiUtilities.mergeProductsAndPrices(testProducts.prices, testProducts.products));
    },

    getProducts: async (setProductObject, setError) => {
        if (test) return api.getTestProducts(setProductObject);
        try {
            const data = await fetch('/get-products');
            const dataJson = await data.json();
            if (dataJson.error) throw new Error(dataJson.error);
            const prices = dataJson.prices;
            const products = dataJson.products;
            setProductObject(apiUtilities.mergeProductsAndPrices(prices, products));
        }
        catch (err) {
            console.log(err.message)
            setError({ open: true, message: err.message });
        }
    },

    getTestShippingRate: async (setShippingData, address) => {
        const shippingData = {
            shipping: {
                name: 'Shipping',
                price: 'shipping',
                unit_amount: 14.45,
                quantity: 1,
                address: address
            },
            isShipping: true
        }
        setShippingData(shippingData);
    },

    getShippingRate: async (setShippingData, address, cartData, setError) => {
        if (test) return api.getTestShippingRate(setShippingData, address);

        const shippingRateObject = {
            address: address,
            items: cartData
        }

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
        }
        catch (err) {
            console.log(err.message)
            setError({ open: true, message: err.message });
        }
    },

}





