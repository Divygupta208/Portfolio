import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Works from "./pages/Works";
import About from "./pages/About";
import { Contact } from "lucide-react";

// 1. Define the Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // This is the default page (Home)
        element: <HomePage />,
      },
      {
        path: "works",
        element: <Works />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      // Catch-all: Redirect unknown routes to home
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

// 2. The Main App Component
export default function App() {
  return <RouterProvider router={router} />;
}
