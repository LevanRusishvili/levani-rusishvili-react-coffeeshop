import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { CoffeeProvider } from "./context/CoffeeContext";
import Navbar from "./components/layout/Navbar"; // Make sure this path is correct
import Dashboard from "./pages/Dashboard";

import AddCoffee from "./pages/AddCoffee";
import Ingredients from "./pages/Ingredients";
import EditCoffee from "./pages/EditCoffee";
import CoffeeDetails from "./pages/CoffeeDetails";

import CoffeeMenu from "./pages/client/CoffeeMenu";
import ClientNavbar from "./components/layout/ClientNavbar";
import Cart from "./pages/client/Cart";
import ClientCoffeeDetails from "./pages/client/ClientCoffeeDetails";
import { CartContext, CartContextProvider } from "./context/client/CartContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientNavbar />,
  
         children: [
      { index: true, element: <CoffeeMenu /> },
      {path: "/cart", element: <Cart/>},
      {path: "/details", element: <ClientCoffeeDetails/>},

    ],
  },
  {
    path: "/admin",
    element: (
      <div className="app-container">
        <Navbar />
      </div>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "add-coffee", element: <AddCoffee /> },
      { path: "edit-coffee", element: <EditCoffee /> },
      { path: "coffee-details", element: <CoffeeDetails /> },
      { path: "ingredients", element: <Ingredients /> },
    ],
  },
]);



const App = () => {
  return (
    <CartContextProvider>
    <CoffeeProvider>
      <RouterProvider router={router} />
    </CoffeeProvider>
    </CartContextProvider>
  );
};

export default App;
