import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';
import { useState, useEffect } from 'react';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';


const steps = ['Shipping address', 'Payment details'];


const Checkout = ({ cart, onCaptureCheckout, order, error }) => {

  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [isFinished, setIsFinished] = useState(false)
  const navigate = useNavigate();
  const classes = useStyles();


  const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const backStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1);


  useEffect(() => {
    // when user enter this component for checkout process... 
    // we generate a checkout token for that user...
    if (cart.id) {
      const generateToken = async () => {
        try {
          // by using commerce Object ==> api calling...
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
          setCheckoutToken(token);
        } catch {
          if (activeStep !== steps.length) navigate('/');
        }
      };

      generateToken();
    }
  }, [cart]);


  const test = (data) => {
    setShippingData(data);
    nextStep();
  };

  const timeOut = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000)
  }


  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} to='/' variant="outlined" type="button">Back to home</Button>
    </>
  ) : isFinished
    ? (
      <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
    )
    : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div >
    ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} to='/' variant="outlined" type="button" >
          Back to home
        </Button>
      </>
    );
  }


  const Form = () => (activeStep === 0
    ? <AddressForm
      setShippingData={setShippingData}
      checkoutToken={checkoutToken}
      nextStep={nextStep}
      test={test}
    />
    : <PaymentForm
      onCaptureCheckout={onCaptureCheckout}
      checkoutToken={checkoutToken}
      shippingData={shippingData}
      nextStep={nextStep}
      backStep={backStep}
      timeOut={timeOut}
    />
  );





  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>

          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}

        </Paper>
      </main>
    </>
  );
};

export default Checkout;
