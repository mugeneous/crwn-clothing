import { createContext, useState } from "react";

import products_data from "../../shop-data.json";

export const ProductsContext = createContext({
  products: null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(products_data);
  const value = { products, setProducts };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
