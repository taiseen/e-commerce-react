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
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
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
          <Cart cart={cart} />
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;