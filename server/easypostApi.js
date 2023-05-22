import EasyPost from '@easypost/api';
const client = new EasyPost('kZCIMwhLY5NDy27ZyzwbVQ')


export const easypostApi = {

    getShippingRates: async (res, address) => {
        const shippingData = {
            shipping: {
                name: 'Shipping',
                price: 'shipping',
                unit_amount: 20,
                quantity: 1,
                address: address
            },
            isShipping: true
        }
        res.json(shippingData);
    },

    easypostTest: async (res, { address, items }) => {
        try {

            console.log(items);

            const verifiedAddress = await client.Address.create({
                street1: address.line1,
                street2: address.line2,
                city: address.city,
                state: address.state,
                zip: address.postal_code,
                country: address.country,
                verify_strict: true
            });

            const shipment = await client.Shipment.create({
                from_address: {
                    street1: '83 rue du Glenbow',
                    city: 'Gatineau',
                    state: 'QC',
                    zip: 'J9J 0Z1',
                    country: 'CA',
                    company: 'Winter Instruments',
                    phone: '819-328-4965',
                },
                to_address: verifiedAddress,
                parcel: {
                    weight: 10,
                },
                customs_info: {
                    customs_certify: true,
                    customs_signer: "Steve Brule",
                    contents_type: "merchandise",
                    contents_explanation: "",
                    restriction_type: "none",
                    eel_pfc: "NOEEI 30.37(a)",
                    customs_items: [
                        {
                            description: "T-shirt",
                            quantity: "1",
                            weight: "5",
                            value: "10",
                            hs_tariff_number: "123456",
                            origin_country: "CA"
                        }
                    ]
                }
            });

            const rate = parseFloat(shipment.lowestRate().rate);
            const shippingData = {
                shipping: {
                    name: 'Shipping',
                    price: 'shipping',
                    unit_amount: rate,
                    quantity: 1,
                    address: address
                },
                isShipping: true
            }

            res.json(shippingData);
        }
        catch (err) {
            console.log(err);
            res.json({ error: err.message });
        }
    }

}