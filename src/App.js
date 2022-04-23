import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Products, Navbar, Cart, Checkout } from "./components";
import { useEffect, useState } from "react";
import { commerce } from "./lib/commerce";

const App = () => {

  // backend data store here...
  const [products, setProducts] = useState([]);
  // user shopping bag... call cart... 😜
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);


  let totalItem;
  if (cart?.line_items?.length === undefined) {
    totalItem = 0
  } else {
    totalItem = cart.line_items.length
  }


  // call to backend... for data fetching...
  const fetchProducts = async () => {
    // by using commerce Object ==> api calling for products... 
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }

  // run when app load...
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);


  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
      console.log(error)
    }
  };
  console.log(order);




  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);


  return (
    <BrowserRouter>

      <Navbar totalItem={totalItem} handleDrawerToggle={handleDrawerToggle} />

      <Routes>

        <Route path="/" element={
          <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
        } />

        <Route path="/cart" element={
          <Cart
            cart={cart}
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart} />
        } />

        <Route path="/checkout" element={
          <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;