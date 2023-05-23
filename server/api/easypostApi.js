import EasyPost from '@easypost/api';
const client = new EasyPost('kZCIMwhLY5NDy27ZyzwbVQ')

export const easypostApi = {

    verfifyAddress: async (address) => { 
        try {
            const verifiedAddress = await client.Address.create({
                name: address.name,
                street1: address.line1,
                street2: address.line2,
                city: address.city,
                state: address.state,
                zip: address.postal_code,
                country: address.country,
                verify_strict: true
            });
            return verifiedAddress;
        }
        catch (err) {
            err.message = err.message + ' -verfifyAddress'
            throw err;
        }
    },

    getShippingRates: async (verifiedAddress, verifiedProducts, items) => {
        const weightMap = {}
        let totalWeight = 0;
        verifiedProducts.forEach((product) => { weightMap[product.id] = parseFloat(product.metadata.weight_oz) })
        items.forEach((item) => { totalWeight += weightMap[item.id]*item.quantity })

        const from_address = {
            street1: '83 rue du Glenbow',
            city: 'Gatineau',
            state: 'QC',
            zip: 'J9J 0Z1',
            country: 'CA',
            company: 'Winter Instruments',
            phone: '819-328-4965',
        }

        try {
            const shipment = await client.Shipment.create({
                from_address: from_address,
                to_address: verifiedAddress,
                parcel: {
                    weight: totalWeight,
                },
                customs_info: {
                    customs_certify: true,
                    customs_signer: "Alex Pokhodoun",
                    contents_type: "merchandise",
                    contents_explanation: "",
                    restriction_type: "none",
                    eel_pfc: "NOEEI 30.37(a)",
                    customs_items: [
                        {
                            description: "Ski tools",
                            quantity: "1",
                            weight: "1",
                            value: "1",
                            hs_tariff_number: "123456",
                            origin_country: "CA"
                        }
                    ]
                }
            });
            let shippingRate = shipment.lowestRate();
            if (shippingRate.est_delivery_days === null) shippingRate.est_delivery_days = 7;
            const shippingRateObject = {
                rate: Math.round(parseFloat(shippingRate.rate)*100),
                info: shippingRate.service,
                estimated_days: shippingRate.est_delivery_days,
                weight_oz: totalWeight
            }
            return shippingRateObject;
        }
        catch (err) {
            err.message = err.message + ' -getShippingRates'
            throw err;
        }
    },
        
}