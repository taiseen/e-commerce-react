import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const Product = ({ product: { name, description, price: { formatted_with_symbol }, image: { url } } }) => {

    const classes = useStyles();

    return (
        <Card className={classes.root} >

            <CardMedia className={classes.media} image={url} title={name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant='h5'>
                        {formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: description }} variant='body1' color='textSecondary' />

            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton arial-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>

        </Card>
    )
}

export default Product