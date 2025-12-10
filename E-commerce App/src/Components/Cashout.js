import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import { CartContext } from "../Global/CartContext";

const Cashout = () => {
  const navigate = useNavigate();
  const { cart, totals, clearCart } = useContext(CartContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [cell, setCell] = useState("");
  const [address, setAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cell || !address) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const msg =
      "Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds";
    setSuccessMsg(msg);
    clearCart();

    setTimeout(() => navigate("/"), 5000);
  };

  return (
    <>
      <Navbar />

      <div className="container" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4">Cashout Details</h2>

        {successMsg && (
          <div className="alert alert-success" role="alert">
            {successMsg}
          </div>
        )}

        {/* FORM START */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <label htmlFor="product-name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="product-name"
            className="form-control product-name"
            value={currentUser.name || ""}
            disabled
          />

          <br />

          {/* Email */}
          <label htmlFor="product-email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="product-email"
            className="form-control product-email"
            value={currentUser.email || ""}
            disabled
          />

          <br />

          {/* Cell No */}
          <label htmlFor="product-cell" className="form-label">
            Cell No
          </label>
          <input
            type="number"
            id="product-cell"
            className="form-control product-cell"
            placeholder="eg 03123456789"
            value={cell}
            onChange={(e) => setCell(e.target.value)}
            required
          />

          <br />

          {/* Address */}
          <label htmlFor="product-address" className="form-label">
            Delivery Address
          </label>
          <input
            type="text"
            id="product-address"
            className="form-control product-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <br />

          {/* Price */}
          <label htmlFor="product-price" className="form-label">
            Price To Pay
          </label>
          <input
            type="number"
            id="product-price"
            className="form-control product-price"
            value={totals.totalPrice}
            disabled
          />

          <br />

          {/* Total Quantity */}
          <label htmlFor="product-quantity" className="form-label">
            Total No of Products
          </label>
          <input
            type="number"
            id="product-quantity"
            className="form-control product-quantity"
            value={totals.totalQty}
            disabled
          />

          <br />

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary product-submit">
            SUBMIT
          </button>
        </form>
        {/* FORM END */}
      </div>
    </>
  );
};

export default Cashout;
