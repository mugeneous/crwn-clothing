import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import CategoriesPreview from "./routes/categories-preview/categories-preview.component";
import Category from "./routes/category/category.component";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "shop",
          element: (
            <>
              <Shop />
              <Outlet />
            </>
          ),
          children: [
            {
              index: true,
              element: <CategoriesPreview />,
            },
            {
              path: ":category",
              element: <Category />,
            },
          ],
        },
        {
          path: "auth",
          element: <Authentication />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
