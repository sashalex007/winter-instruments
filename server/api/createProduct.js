import { stripeApi } from './stripeApi.js';

createProduct()

async function createProduct() {
    try {
        const product = await stripeApi.createProduct({
            name: 'Shim set (-3 deg)',
            description: '1x heel piece, 1x toe piece',
            default_price_data: {
                currency: 'CAD',
                unit_amount: 2000,
            },
            metadata: {
                category: 'Under-sole canting',
                name_variant: 'Shim set_Angle_-3',
                weight_oz: '3.5',
                description: '1x heel piece, 1x toe piece. All shims are stack height normalized to 2.3mm at centre-line. Use 0 degree shim where no canting is required. Angle values are relative to right boot. E.g. to cant right & left boot OUT by 1 degree select 1 and -1',
            },
            shippable: true,
        })
        console.log(product);
    }
    catch (err) {
        console.log(err);
    }
}
