import React from 'react';
import { useContext, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AddressElement } from '@stripe/react-stripe-js';
//logic
import { api } from '../../../functions/api';
import { ErrorContext } from '../../../App';
//ui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';


const stripe = loadStripe('pk_test_51N8o0fC48L00qx1Q0j0al75mo9VWVfYJxC2R7XFveKILBnykArws6yVIlAmxrX20EfsfvymzBZWtAKpByMKuqTYt00WVpLBnCY');

export default function AddressForm({ shippingData, cartData, cartFunctions }) {

  const testAddress = {
    name: 'Jane Doe',
    address: {
      line1: '354 Oyster Point Blvd',
      line2: '',
      city: 'South San Francisco',
      state: 'CA',
      postal_code: '94080',
      country: 'US',
      name: 'Jane Doe',
    }
  }

  const [address, setAddress] = useState(testAddress)
  const [addressComplete, setAddressComplete] = useState(false)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const isShipping = shippingData.isShipping
  const cartSize = cartFunctions.getCartSize()

  const options = {
    appearance: {/*...*/ },
  };

  const setError = useContext(ErrorContext);
  function getShippingRate() {
    setLoading(true);
    api.getShippingRate(cartFunctions.setShippingData, address, cartData, setError, setLoading, setSuccess)
  }
  function closeSnackbar() {
    setSuccess(false);
  }

  if (cartSize > 0) {
    return (
      <div>
        <Collapse in={!isShipping}>
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
                setAddressComplete(false);
                const newAddress = event.value.address;
                newAddress.name = event.value.name;
                setAddress(newAddress);
                if (event.complete) {
                  setAddressComplete(true);
                }
              }} />
            </form>
          </Elements>
          <br></br>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Button
                variant="contained"
                disabled={loading || !addressComplete}
                onClick={getShippingRate}
              >
                Get shipping rate
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </Box>
        </Collapse>

        <Snackbar open={success} autoHideDuration={6000} onClose={closeSnackbar}>
          <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
            Shipping added
          </Alert>
        </Snackbar>
      </div>
    );
  }
};
