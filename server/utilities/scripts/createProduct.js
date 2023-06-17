import { stripeService } from '../../services//externalServices/stripeService.js';

createOneProdcut()
function createOneProdcut() {
    const name = 'DIN lug plates'
    const description1 = '2x heel piece, 2x toe peice. 3mm thickness, screw included.'
    const description2 = '2x heel piece, 2x toe peice. 3mm thickness, screw included. Some extra fitting may be required.'
    const unit_amount = 1500
    const weight_oz = 3.5
    const category = 'Under-sole canting'
    createSingleProduct({name, description1, description2, unit_amount, weight_oz, category})
}

//createMultipleVariantProducts()
async function createMultipleVariantProducts() {
    const variantData = ['Right handed', 'Left handed']

    for (let data of variantData) {
        const name = `WC sidewall cutter (${data})`
        const description1 = 'Sidewall cutter with innovative dovetail design. Square blade included.'
        const description2 = 'none'
        const unit_amount = 6500
        const weight_oz = 4.5
        const category = 'Tools'
        const name_variant = `WC sidewall cutter_Orientation_${data}`
        await createVariantProduct({name, description1, description2, unit_amount, weight_oz, name_variant, category})
    }
}

async function createVariantProduct({name, description1, description2, unit_amount, weight_oz, name_variant, category}) {
    try {
        const product = await stripeService.createProduct({
            name: name,
            description: description1, //short description
            default_price_data: {
                currency: 'CAD',
                unit_amount: unit_amount,
            },
            metadata: {
                category: category,
                name_variant: name_variant, //NAME_SELECTOR_VARIANT
                weight_oz: weight_oz, //3.5
                description: description2, //long description or 'none'
            },
            shippable: true,
        })
        console.log('Product created');
    }
    catch (err) {
        console.log(err);
    }
}

async function createSingleProduct({name, description1, description2, unit_amount, weight_oz, category}) {
    try {
        const product = await stripeService.createProduct({
            name: name,
            description: description1, //short description
            default_price_data: {
                currency: 'CAD',
                unit_amount: unit_amount,
            },
            metadata: {
                category: category,
                weight_oz: weight_oz, //3.5
                description: description2, //long description or 'none'
            },
            shippable: true,
        })
        console.log('Product created');
    }
    catch (err) {
        console.log(err);
    }
}
