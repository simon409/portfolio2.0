import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import Hero from "../components/Body/Hero";
import Admin from "../components/admin";
import Contact from "../components/Body/Contact";
import Header from "../components/Header/Header";
import About from "../components/Body/About";
import Work from "../components/Body/Work";
import Dashboard from "../components/admin/dashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import Landing from "../components/Blog/Landing";
import Blog from "../components/blog/Blog";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export const routers = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/work",
        element: <Work />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Landing />,
      },
      {
        path: "/blog/:id",
        element: <Blog />,
      },
      {
        path: "*", // Wildcard route to catch any other paths
        element: <Navigate to="/" />, // Redirect to the 404 page
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes Component={Dashboard} />,
  },
  {
    path: "/ma-admin",
    element: <Admin />,
  },
  {
    path: "/404", // Define a specific path for the 404 page
    element: <Hero />,
  },
]);
