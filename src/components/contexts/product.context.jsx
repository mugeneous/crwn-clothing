import { createContext, useEffect, useState } from "react";

import SHOP_DATA from "../../shop-data";

import { addCollectionAndDocuments } from "../../utils/firebase.utils";

export const ProductsContext = createContext({
  products: null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products, setProducts };

  useEffect(() => {
    addCollectionAndDocuments("category", SHOP_DATA);
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
