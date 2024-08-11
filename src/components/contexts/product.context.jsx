import { createContext, useEffect, useState } from "react";

// import SHOP_DATA from "../../shop-data";

import { getCategoriesAndDocuments } from "../../utils/firebase.utils";

export const ProductsContext = createContext({
  products: null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products, setProducts };

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
    };
    getCategoriesMap();
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
