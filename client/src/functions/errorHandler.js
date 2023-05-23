import { useState } from 'react';
import ErrorAlert from '../components/alerts/errorAlert';

export default function ErrorHandler(recievedError) {
    const [error, setError] = useState(recievedError)
    console.log(error.message)
    ReactDOM.render(
        <ErrorAlert open={error.open} errorMessage={error.message} setError={setError}></ErrorAlert>,
    )
}
