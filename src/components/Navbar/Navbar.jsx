import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/commerce.png';
import useStyles from './styles';

const Navbar = () => {

    const classes = useStyles();

    return (
        <>
            <AppBar position='fixed' color='inherit' className={classes.appBar}>
                <Toolbar>
                    <Typography variant='h6' color='inherit' className={classes.title}>
                        <img src={logo} alt="commerce" height="25px" className={classes.image} />
                        Commerce.js
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        <IconButton aria-label="show carts items" color='inherit'>
                            <Badge badgeContent={2} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;