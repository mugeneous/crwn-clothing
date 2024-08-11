import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import { UserProvider } from "./components/contexts/user.context.jsx";
import { CategoriesProvider } from "./components/contexts/categories.context.jsx";
import { CartProvider } from "./components/contexts/cart.context.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CategoriesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CategoriesProvider>
    </UserProvider>
  </React.StrictMode>
);
