import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import RoundRobin from "./pages/RoundRobin";
import PageNotFound from "./pages/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <RoundRobin /> },
      { path: '*', element: <PageNotFound /> },
  ],
  },
]);
