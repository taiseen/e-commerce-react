import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
import useStyles from './styles';


const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {

    const classes = useStyles();
    const userShoppingBag = cart.line_items;


    // very important...
    // undefine ERROR checking in here...
    // if its do not fetch any item from backend... display just loading... message
    // so just display 'Loading....' until its fetch data from backend... then no error happen
    if (!userShoppingBag) {
        return (
            <Typography variant="h3" color='primary'>Loading....</Typography>
        )
    }



    // function ==> 1 ||| return some JSX
    // for display Empty card info...
    const EmptyCart = () => (
        <Typography variant="h4">
            You have no items in your shopping cart,
            <Link to='/' className={classes.link}> go back to ⬅ start adding some!</Link>
        </Typography>
    );


    // function ==> 2 ||| return some JSX
    // for display Data Full card info...
    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {
                    // display all items OR products... 
                    // that user add his shopping bag || cart... 
                    userShoppingBag.map(item => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem
                                item={item}
                                handleUpdateCartQty={handleUpdateCartQty}
                                handleRemoveFromCart={handleRemoveFromCart}
                            />
                        </Grid>
                    ))
                }
            </Grid>

            <div className={classes.cardDetails}>

                <Typography variant='h4'>
                    Subtotal : {cart.subtotal.formatted_with_symbol}
                </Typography>

                <div>
                    <Button
                        className={classes.emptyButton}
                        onClick={handleEmptyCart}
                        variant="contained"
                        color='secondary'
                        type="button"
                        size="large"
                    >
                        Empty Cart
                    </Button>


                    <Button
                        className={classes.checkoutButton}
                        variant="contained"
                        color='primary'
                        type="button"
                        size="large"
                        component={Link}
                        to='/checkout'
                    >
                        Checkout
                    </Button>

                </div>
            </div>
        </>
    );


    return (
        <Container>

            {/* This div is responsible for actual amount of height... that NavBar has... */}
            <div className={classes.toolbar} />


            <Typography className={classes.title} variant='h4' gutterBottom>
                Your Shopping Cart
            </Typography>


            {
                // How do we know the cart is empty || user shopping bag is empty...???
                // check the cart object, inside line_items array... 
                // this line_items <== is user shopping bag...
                !userShoppingBag.length //if cart is empty...
                    ? <EmptyCart />
                    : <FilledCart />
            }

        </Container>
    );
}

export default Cart