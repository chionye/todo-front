import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Auth } from "./auth/Auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
