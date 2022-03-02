import { useEffect, useState } from "react";
import { Products, Navbar } from "./components/"
import { commerce } from "./lib/commerce"

function App() {

  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  console.log(products);

  // run when app load...
  useEffect(() => {
    fetchProduct();
  }, []);


  return (
    <div >
      <Navbar />
      <Products products={products}/>
    </div>
  );
}

export default App;
