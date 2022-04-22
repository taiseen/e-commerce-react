import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/commerce.png';
import useStyles from './styles';


const Navbar = ({ totalItem }) => {

    const classes = useStyles();
    const location = useLocation();


    return (
        <AppBar position='fixed' color='inherit' className={classes.appBar}>

            <Toolbar>

                {/* Header Logo | Brand Logo  || by clicking it go to ==> Products component  */}
                <Typography variant='h6' color='inherit' className={classes.title} component={Link} to='/'>
                    <img src={logo} alt="commerce" height="25px" className={classes.image} />
                    Commerce.js
                </Typography>

                {/* Just for creating empty space */}
                <div className={classes.grow} />

                {/* Shopping Cart Logo || by clicking it go to ==> Cart component */}
                {
                    location.pathname === '/' &&
                    <div className={classes.button}>
                        <IconButton aria-label="show carts items" color='inherit' component={Link} to='/cart'>
                            <Badge badgeContent={totalItem} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                }

            </Toolbar>

        </AppBar>
    );
}

export default Navbar;