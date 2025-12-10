import React, { useContext } from "react";
import { ProductsContext } from "../Global/ProductsContext";
import { CartContext } from "../Global/CartContext";
import { toast } from "react-toastify";

const Products = () => {
  const { products } = useContext(ProductsContext);
  const { cart, addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast.error("this product is already in your cart");
      return;
    }

    addToCart(product);
    toast.success("added to cart!");
  };

  if (!products.length) {
    return (
      <div className="container">
        <h1 className="mb-4">Products</h1>
        <div>slow internet...no products to display</div>
      </div>
    );
  }

  return (
    <div className="container products-container">
      <h1 className="mb-4">Products</h1>
      <div className="row">
        {products.map((product) => (
          <div
            className={`col-md-4 mb-4 product-card product-${product.id}`}
            key={product.id}
          >
            <div className="card h-100">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top product-image"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title product-name">{product.name}</h5>
                <p className="card-text product-price">Rs {product.price}.00</p>

                <button
                  className="btn btn-primary mt-auto add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
