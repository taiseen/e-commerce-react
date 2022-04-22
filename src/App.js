import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Products, Navbar, Cart } from "./components";
import { useEffect, useState } from "react";
import { commerce } from "./lib/commerce";

const App = () => {

  // backend data store here...
  const [products, setProducts] = useState([]);

  // user shopping bag... call cart... 😜
  const [cart, setCart] = useState({});


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



  return (
    <BrowserRouter>

      <Navbar totalItem={cart.total_items} />

      <Routes>

        <Route path="/" element={
          <Products products={products} onAddToCart={handleAddToCart} />
        } />

        <Route path="/cart" element={
          <Cart
            cart={cart}
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart} />
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;