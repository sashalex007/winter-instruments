import React from 'react';
import { useContext } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AddressElement } from '@stripe/react-stripe-js';
//logic
import { api } from '../../../functions/api';
import { ErrorContext } from '../../../App';
//ui
import Button from '@mui/material/Button';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripe = loadStripe('pk_test_51N8o0fC48L00qx1Q0j0al75mo9VWVfYJxC2R7XFveKILBnykArws6yVIlAmxrX20EfsfvymzBZWtAKpByMKuqTYt00WVpLBnCY');

export default function AddressForm({ shippingData, cartData, cartFunctions }) {
  const isShipping = shippingData.isShipping
  const cartSize = cartFunctions.getCartSize()

  const testAddress = {
    name: 'Jane Doe',
    address: {
      line1: '354 Oyster Point Blvd',
      line2: '',
      city: 'South San Francisco',
      state: 'CA',
      postal_code: '94080',
      country: 'US',
    }
  }

  let address = testAddress.address
  const options = {
    appearance: {/*...*/ },
  };

  const setError = useContext(ErrorContext);
  function getShippingRate() {
    api.getShippingRate(cartFunctions.setShippingData, address, cartData, setError)
  }

  if (!isShipping && cartSize > 0) {
    return (
      <div show>
        <Elements stripe={stripe} options={options}>
          <form>
            <h3>Shipping</h3>
            <AddressElement options={{
              defaultValues: testAddress,
              mode: 'shipping',
              allowedCountries: ['US', 'CA', 'GB', 'FR', 'DE', 'AU', 'JP', 'NZ', 'SG'],
              blockPoBox: true,
              fields: {
                phone: 'never',
              }
            }} onChange={(event) => {
              if (event.complete) {
                // Extract potentially complete address
                address = event.value.address;
              }
            }} />
          </form>
        </Elements>
        <br></br>
        <Button onClick={getShippingRate} variant="contained">Get shipping rate</Button>

      </div>
    );
  }
};
