import { useEffect, useState } from 'react';

export default function CartFunctions() {

    //create cart data from local storage
    const [cartData, setCartData] = useState([]);
    const [shippingData, setShippingData] = useState({shipping: {}, isShipping: false, checkoutSessionURL: '' });
    
    useEffect(() => {
        const localCartData = JSON.parse(localStorage.getItem('cartData'));
        if (localCartData) {
            setCartData(localCartData);
        }
    }, []);

    //save cart data to local storage
    function saveCartData(cartData) {
        localStorage.setItem('cartData', JSON.stringify(cartData));
    }

    //cart functions
    const cartFunctions = {
        deleteCartData: () => {
            localStorage.removeItem('cartData');
            setCartData([]);
        },
    
        addCartItem: (product) => {
            cartFunctions.clearShippingData();
            let newCartData = [...cartData];
            let found = false;
            newCartData.forEach(item => {
                if (item.price === product.price) {
                    item.quantity++;
                    found = true;
                }
            })
            if (!found) {
                newCartData.push({
                    id : product.id,
                    name: product.name,
                    price: product.price,
                    unit_amount: product.unit_amount,
                    quantity: 1
                })
            }
    
            setCartData(newCartData);
            saveCartData(newCartData);
        },
    
        deleteCartItem: (priceID) => {
            cartFunctions.clearShippingData();
            const newCartData = cartData.filter(item => item.price !== priceID);
            setCartData(newCartData);
            saveCartData(newCartData);
        },
    
        editQty: (priceID, qty) => {
            cartFunctions.clearShippingData();
            let newCartData = cartData.map(item => {
                if (item.price === priceID) {
                    item.quantity = qty;
                }
                return item
            })
            setCartData(newCartData);
            saveCartData(newCartData);
        },
    
        getCartTotal: () => {
            let total = 0;
            cartData.forEach(item => {
                total += item.unit_amount * item.quantity;
            })
            if (shippingData.isShipping) {
                total += shippingData.shipping.unit_amount;
            }
            return total.toFixed(2);
        },
    
        getCartSize: () => {
            let total = 0;
            cartData.forEach(item => {
                total += item.quantity;
            })
            return total;
        },

        setShippingData: (data) => {
            setShippingData(data)
        },

        clearShippingData: () => {
            setShippingData({shipping: {}, isShipping: false})
        }

    } 
    return { cartData, shippingData, cartFunctions }
}

