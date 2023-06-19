import { stripeService } from '../../services//externalServices/stripeService.js';

//createOneProdcut()
function createOneProdcut() {
    const name = 'Dalbello cuff cam'
    const description1 = '4x peices, Replacement cuff cam for Dalbello boots.'
    const description2 = '4x peices, Replacement cuff cam for Dalbello boots. Extends range over stock cams by 3mm'
    const unit_amount = 1500
    const weight_oz = 3.5
    const category = 'Cuff canting' //full name not link
    createSingleProduct({name, description1, description2, unit_amount, weight_oz, category})
}

//createMultipleVariantProducts()
async function createMultipleVariantProducts() {
    const variantData = ['0.5mm', '1mm', '2mm']

    for (let data of variantData) {
        const name = `R22 heel lifter (${data})`
        const description1 = '2x peices. Heel lifters for R22 style bindings.'
        const description2 = 'none'
        const unit_amount = 1000
        const weight_oz = 4.5
        const category = 'Binding specific'
        const name_variant = `R22 heel lifter_Thickness_${data}`
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
