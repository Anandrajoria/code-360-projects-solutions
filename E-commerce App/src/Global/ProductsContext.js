import React, { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

const defaultProducts = [
  {
    id: 1,
    name: "Test Product",
    price: 123,
    image:
      "https://images.unsplash.com/photo-1528701800489-20be9c1eae09?auto=format&fit=crop&w=600&q=60",
  }
];

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    // Prepend so newly added products appear first (helps tests target the latest item)
    setProducts((prev) => [product, ...prev]);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
