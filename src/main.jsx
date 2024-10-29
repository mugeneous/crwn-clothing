import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
// import { CategoriesProvider } from "./components/contexts/categories.context.jsx";
import { CartProvider } from "./components/contexts/cart.context.jsx";

import { store } from "./store/store.js";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <CategoriesProvider> */}
      <CartProvider>
        <App />
      </CartProvider>
      {/* </CategoriesProvider> */}
    </Provider>
  </React.StrictMode>
);
