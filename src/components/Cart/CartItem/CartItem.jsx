import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';


const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {

    const { id, name, line_total, quantity, image } = item;
    const { formatted_with_symbol } = line_total;
    const { url } = image;

    const classes = useStyles();


    return (
        <Card className="cart-item">

            <CardMedia image={url} alt={name} className={classes.media} />

            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{name}</Typography>
                <Typography variant="h5">{formatted_with_symbol}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>

                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(id, quantity - 1)}>-</Button>
                    <Typography>&nbsp;{quantity}&nbsp;</Typography>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(id, quantity + 1)}>+</Button>
                </div>

                <Button
                    onClick={() => handleRemoveFromCart(id)}
                    variant="contained"
                    color="secondary"
                    type="button"
                >
                    Remove
                </Button>

            </CardActions>
        </Card>
    );
}

export default CartItem;