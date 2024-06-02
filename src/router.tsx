import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import RoundRobin from "./pages/RoundRobin";
import PageNotFound from "./pages/PageNotFound";
import RedirectMainPage from "./pages/RedirectMainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <RedirectMainPage /> },
      { path: "ranking", element: <RedirectMainPage /> },
      { path: "round-robin", element: <RoundRobin /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);
