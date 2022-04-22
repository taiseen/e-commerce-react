import useStyles from './styles';
import { AddShoppingCart } from '@material-ui/icons';
import {
    Card, CardMedia, CardContent, CardActions,
    Typography, IconButton
} from '@material-ui/core';


const Product = ({ onAddToCart, product }) => {

    const { id, name, description, price, image } = product;
    const { formatted_with_symbol } = price;
    const { url } = image;

    // console.log(id, name, description, price, image)
    // console.log(formatted_with_symbol)
    // console.log(url)
    // console.log(product)

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

                <Typography
                    dangerouslySetInnerHTML={{ __html: description }}
                    variant='body1'
                    color='textSecondary' />

            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton
                    arial-label="Add to Cart"
                    onClick={() => onAddToCart(id, 1)}>

                    <AddShoppingCart />

                </IconButton>
            </CardActions>

        </Card>
    )
}

export default Product