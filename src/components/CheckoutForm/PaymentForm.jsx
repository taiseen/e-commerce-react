import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Typography, Button, Divider } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout, timeOut }) => {


    const handleSubmit = async (e, elements, stripe) => {

        e.preventDefault();

        // Error Handling...
        if (!stripe || !elements) return; // do not any thing... go outside of this function...

        const cardElement = elements.getElement(CardElement);

        // stripe api fro creating a payment method...
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if (error) {
            console.log('[error]', error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                shipping: {
                    name: 'International',
                    street: shippingData.address1 ,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };

            onCaptureCheckout(checkoutToken.id, orderData);
            console.log(orderData)
            timeOut();
            nextStep();
        }
    };

    return (
        <>
            <Review checkoutToken={checkoutToken} />

            <Divider />

            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>

            {/* stripe JSX + stripe Key */}
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (

                        <form onSubmit={e => handleSubmit(e, elements, stripe)}>

                            {/* user input card info here through this <CardElement /> component */}
                            <CardElement />
                            <br /> <br />

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                <Button variant="outlined" onClick={backStep}>Back</Button>

                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>

                            </div>

                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    );
};

export default PaymentForm;
