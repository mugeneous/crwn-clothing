import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";

const Shop = () => {
  return <h1>This is Shop</h1>;
};

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
          element: <Shop />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
