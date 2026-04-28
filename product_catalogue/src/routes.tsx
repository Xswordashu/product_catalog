import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import ItemDetail from "./components/ItemDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/item/:id",
    element: <ItemDetail />,
  },
]);