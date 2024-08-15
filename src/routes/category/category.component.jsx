import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../components/contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className="flex flex-col">
      <h2 className="mb-10 text-4xl font-semibold text-center">
        {category.toUpperCase()}
      </h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Category;
