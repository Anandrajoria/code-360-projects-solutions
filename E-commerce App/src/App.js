// import React, { Component } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// const Home = () => <div>Home</div>;
// const Signup = () => <div>Signup</div>;
// const Login = () => <div>Login</div>;
// const CartProducts = () => <div>Cart Products</div>;
// const AddProducts = () => <div>Add Products</div>;
// const Cashout = () => <div>Cashout</div>;
// const NotFound = () => <div>Page not found</div>;

// export class App extends Component {

//     render() {
//         return (
// <Routes>
//             {/* home */ }
//             < Route exact path = '/' />
//                 {/* signup */ }
//                 < Route path = "/signup" />
//                     {/* login */ }
//                     < Route path = "/login" />
//                         {/* cart products */ }
//                         < Route path = "/cartproducts" /> />
// {/* add products */ }
// <Route path="/addproducts" />
// {/* cashout */ }
// <Route path='/cashout' />
// {/*incorrect routes*/ }
// <Route path='*' />
// </Routes>
//         );
//     }
// }

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Global/Auth/ProtectedRoute";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Cart from "./Components/Cart";
import AddProducts from "./Components/AddProducts";
import Cashout from "./Components/Cashout";
import { NotFound } from "./Components/NotFound";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        

        <Route
          path="/cartproducts"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cashout"
          element={
            <ProtectedRoute>
              <Cashout />
            </ProtectedRoute>
          }
        />
<Route
  path="/addproducts"
  element={
    <ProtectedRoute>
      <AddProducts />
    </ProtectedRoute>
  }
/>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
